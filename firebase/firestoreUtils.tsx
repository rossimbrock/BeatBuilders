import Track from "@/Track";
import {doc, setDoc, deleteDoc} from "firebase/firestore/lite";
import { db } from "./firebase";

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
export async function saveUserPlaylistSong(song: Track, email: string | null) { 
    // write spotify id, song title, artist, and date added to database 
    const currentDate = new Date(); 
    const month = months[currentDate.getMonth()];
    const day = currentDate.getDate();
    const year = currentDate.getFullYear();
    await setDoc(doc(db, `/users/${email}/songs`, song.id),{
        "spotify_id": song.id,
        "song_title": song.title, 
        "song_artists": song.artist,
        "date_added": `${month} ${day}, ${year}`
    },{ merge: true })

} 

export async function deleteUserPlaylistSong (song: Track) { 
    
}

export async function addToUsersCollection(email: string, username: string) { 
    await setDoc(doc(db, "users", email), {
        "username": username
    }, { merge: true });
}