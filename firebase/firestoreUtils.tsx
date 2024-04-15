import Track from "@/Track";
import {doc, setDoc, deleteDoc, getDocs, collection} from "firebase/firestore/lite";
import { db } from "./firebase";

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
export async function saveUserPlaylistSong(song: Track, email: string | null) { 
    // write spotify id, song title, artist, and date added to database 
    const currentDate = new Date(); 
    const month = months[currentDate.getMonth()];
    const day = currentDate.getDate();
    const year = currentDate.getFullYear();
    console.log(email)
    console.log(song.title);
    await setDoc(doc(db, `/users/${email}/songs`, song.id),{
        "spotify_id": song.id,
        "song_title": song.title, 
        "song_artists": song.artist,
        "image_link": song.imageLink,
        "preview_link": song.previewLink, 
        "date_added": `${month} ${day}, ${year}`
    },{ merge: true })

} 

export async function deleteUserPlaylistSong (song: Track, email: string | null) {
    console.log(email)
    console.log(song.title) 
    await deleteDoc(doc(db, `/users/${email}/songs`, song.id));
}

export async function retrieveUserPlaylist (email: string | null) {
    let songList: Track[] = []
    const songs = await getDocs(collection(db, `/users/${email}/songs`));
    songs.forEach((song: any) => {
        let songData = song.data()
        console.log(songData.date_added);
        songList.push(new Track(songData.spotify_id, songData.song_title, songData.song_artists, songData.image_link, songData.preview_link, songData.date_added));
    })

    return songList;
}

export async function addToUsersCollection(email: string, username: string) { 
    await setDoc(doc(db, "users", email), {
        "username": username
    }, { merge: true });
}