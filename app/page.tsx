'use client';
import SongCard from "./SongCard";
import { getAuth, signOut } from "firebase/auth";
import { initFirebase } from "@/firebase/firebase";
import Link from "next/link";
import { useState, useEffect } from "react";
import {sendSearchQueryData} from "./apiCalls";
import GeneratedPlaylist from "./GeneratedPlaylist";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from 'next/app';
import Track from "@/Track";
import { retrieveUserPlaylist } from "@/firebase/firestoreUtils";

export default function Home({ Component, pageProps }: AppProps) {

  const [songQueue, setSongQueue] = useState([]);

  const [songCardOne, setSongCardOne] = useState();

  const [songCardTwo, setSongCardTwo] = useState();

  const [chosenSongList, setChosenSongList] = useState<Track[]>([]);
  const [userQuery, setUserQuery] = useState("");
  const app = initFirebase();
  const auth = getAuth() 
  
  const logOut = async() => { 
    signOut(auth).then(() => {
      localStorage.clear();
      console.log("Successful log out");
    }).catch((error) => {
      console.log("Error in log out");
    });
  }

  const addSongToChosenList = (track: Track) => {
    setChosenSongList(prevChosenSongList => {
      saveSelectionToLocal([...prevChosenSongList, track]);
      return [...prevChosenSongList, track]}
    )
    switchTrackOut(track);
  }

 const switchTrackOut = (track: Track) =>  {
    if (track === songCardOne){
      setSongCardOne(songQueue[0])
    } else {
      setSongCardTwo(songQueue[0])
    }
    setSongQueue(prevQueue => prevQueue.slice(1));
  }

  const saveSelectionToLocal = (tracks: Track[]) => {
    const serializedSelection = JSON.stringify(tracks);
    localStorage.setItem('userSelections', serializedSelection);
  };

  useEffect(() => {
    const fetchData = async () => {
        const playlist = await retrieveUserPlaylist(sessionStorage.getItem("email"));
        setChosenSongList(playlist);
    };

    fetchData();

    const serializedSelections = localStorage.getItem('userSelections');
    if (serializedSelections) {
        setChosenSongList(JSON.parse(serializedSelections));
    }
  }, []);

  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [songsFound, setSongsFound] = useState(0);
  return (
    <SessionProvider session={pageProps?.session}>
    <section className = "px-4 py-6"> 
      <div className="flex justify-between pb-24"> 
        <div className="flex items-center">
          <img src = "img/BeatBuilderLogo.png" width="50" height="50" className=""/>
          <p className="pl-4 text-lg font-semibold"> BeatBuilders</p>
        </div>
        <Link href = "/login">
          <button className = "bg-purple-300 rounded-md text-black font-semibold px-8 py-2 hover:scale-110" onClick={logOut}>
              Log Out
          </button>
        </Link>
      </div>
      <div className = "flex justify-center text-4xl font-bold pb-10"> 
        <p> 
          Your Feelings. Your Playlist.
        </p>
      </div>
      <div className = "flex justify-center pb-24">
        <input type="text" value = {userQuery} onChange = {(e) => setUserQuery(e.target.value)} placeholder = "Find a song based on mood, genre, artist..." className = "w-2/3 py-6 px-4 rounded-xl text-black pr-6"/>
        <div className = "pr-4"></div>
        <button type="submit" onClick={() => {
          setSongQueue([]);
          setSongsFound(0);
          sendSearchQueryData(userQuery, setSongQueue, setSongsFound);
          setHasSubmitted(true);
        }} className="bg-purple-300 px-6 py-4 rounded-xl text-black font-semibold hover:scale-105">Submit</button>
      </div>
      {hasSubmitted && songQueue.length === 0 && (
      <div className="text-center py-4 flex justify-center items-center">
        <div className="loader mr-2"></div>
        <p className="text-lg font-semibold">Generating Songs...<br />{songsFound} Songs Found.</p>        
      </div>
      )}
      <div className="flex justify-center pb-24"> 
        {hasSubmitted && (
          <>
            <div className="w-2/5 flex justify-end pr-4">
              {songQueue[0] && <SongCard track={songQueue[0]} addSongToList={addSongToChosenList} switchSongs={switchTrackOut}/>}
            </div>
            <div className="w-2/5 flex justify-start pl-4">
              {songQueue[1] && <SongCard track={songQueue[1]} addSongToList={addSongToChosenList} switchSongs={switchTrackOut} />}
            </div>
          </>
        )}
      </div>
      {hasSubmitted && <GeneratedPlaylist tracks={chosenSongList} setTracks={setChosenSongList} />}
    </section>
    </SessionProvider>
  );
}
