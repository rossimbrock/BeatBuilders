import axios from 'axios';

// Token storage
let cachedToken: { value: string; expiry: number; } | null = null;

const getSpotifyAccessToken = async () => {
    const now = new Date().getTime();
    if (cachedToken && cachedToken.expiry > now) {
        return cachedToken.value;
    }

    const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials');
    params.append('client_id', '0392115c84454df6b0aa1115841830af');
    params.append('client_secret', '05b53f6b81c440a795483a8253b52ea0');

    try {
        const response = await axios.post('https://accounts.spotify.com/api/token', params, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        // Refresh token 5 minutes before expiration
        const expiresIn = response.data.expires_in * 1000;
        cachedToken = {
            value: response.data.access_token,
            expiry: now + expiresIn - 300000, 
        };
        return response.data.access_token;
    } catch (error) {
        console.error('Error fetching Spotify access token:', error);
        return null;
    }
};

const pullSongInfo = async (songTitle: string, songArtist: string) => {
    const title = encodeURIComponent(songTitle);
    const artist = encodeURIComponent(songArtist);
    const accessToken = await getSpotifyAccessToken();

    try {
        const response = await axios.get(`https://api.spotify.com/v1/search?q=track:${title}%20artist:${artist}&type=track`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        const responses = response.data.tracks.items[0];
        const albumImages = responses?.album.images;
        const image640x640 = albumImages?.find((image: { height: number; width: number; }) => image.height === 640 && image.width === 640);
        const trackWithPreview = response.data.tracks.items.find((item: any) => item.preview_url !== null);
        let previewUrl = trackWithPreview?.preview_url;
        let spotifyId = trackWithPreview?.uri;
        // Use Deezer API if Spotify doesn't work
        if (!previewUrl) {
            // URL of your Flask server's endpoint
            const flaskServerUrl = 'http://localhost:8081/flaskProxy';
            const searchQuery = `${title} ${artist}`;
        
            try {
                const response = await axios.post(flaskServerUrl, { search_data: searchQuery }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
        
                if (response.data && response.data.data && response.data.data.length > 0) {
                    const deezerTrack = response.data.data[0];
                    previewUrl = deezerTrack.preview;
                }
            } catch (error) {
                console.error('Error pulling song info:', error);
            }
        }

        return {
            coverUrl: image640x640?.url,
            previewUrl: previewUrl,
            spotifyId: spotifyId
        };

    } catch (error) {
        console.error('Error fetching song info:', error);
        return undefined;
    }
}

export default pullSongInfo;
