import pullSongInfo from "./pullSongInfo";
import Track from "@/Track";

export async function sendSearchQueryData(searchData, setSongQueue, updateSongsFound) {
    fetch("http://localhost:8080/searchQuery", {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({search_data: searchData})
    })
    .then(response => response.json())
    .then(async data => {
        if (!Array.isArray(data.songs_returned)) {
            console.error("Expected data.songs_returned to be an array, got:", data.songs_returned);
            return;
          }
        const tracks = [];
        for (const song of data.songs_returned) {
            const result = await pullSongInfo(song.track_name, song.artist_name);
            if (result) {
                if (result.spotifyId){
                    const track = new Track(
                        result.spotifyId,
                        song.track_name,
                        song.artist_name,
                        result.coverUrl,
                        result.previewUrl
                    );
                    tracks.push(track);
                    updateSongsFound(tracks.length);
                }
            }
        }
        setSongQueue(tracks);
    })
    .catch(error => console.error("Error fetching data:", error));
}
