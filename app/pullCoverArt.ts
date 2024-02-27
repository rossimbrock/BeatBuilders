import axios from 'axios';

const pullCoverArt = async (songTitle: string, songArtist: string): Promise<string | undefined> => {
    // Change this to the automated access token Tom made later
    const accessToken = '';
    const title = songTitle.replace(/ /g, "%20");
    const artist = songArtist.replace(/ /g, "%20");

    try {
        /* Working code for pulling album art, but commented out until new spotify api access tokens can be generated by our code */

        // const response = await axios.get(`https://api.spotify.com/v1/search?q=track:${title}%20artist:${artist}&type=track`, {
        //     headers: {
        //         'Authorization': `Bearer ${accessToken}`
        //     }
        // });

        // const albumImages = response.data.tracks.items[0]?.album.images;
        // const image640x640 = albumImages?.find((image: { height: number; width: number; }) => image.height === 640 && image.width === 640);
        // console.log(image640x640?.url)
        // return image640x640?.url;
        
        return "https://i.scdn.co/image/ab67616d0000b2737acee948ecac8380c1b6ce30"

    } catch (error) {
        console.error('Error fetching album cover:', error);
        return undefined;
    }
}

export default pullCoverArt;
