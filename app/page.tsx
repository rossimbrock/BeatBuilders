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

export default function Home({ Component, pageProps }: AppProps) {
  const email = sessionStorage.getItem("email");
  console.log(email);
  const [songQueue, setSongQueue] = useState([
    new Track("spotify:track:623rRTKwGmgjH6sjE9uWLh", "Scatman (ski-ba-bop-ba-dop-bop)", "Scatman John"),
    new Track("spotify:track:67WTwafOMgegV6ABnBQxcE", "Some Nights", "fun."),
    new Track("spotify:track:37ZJ0p5Jm13JPevGcx4SkF", "Livin' On A Prayer", "Bon Jovi"),
    new Track("spotify:track:2HHtWyy5CgaQbC7XSoOb0e", "Eye of the Tiger", "Survivor"),
    new Track("spotify:track:6M14BiCN00nOsba4JaYsHW", "Ocean Man", "Ween"),
    new Track("spotify:track:7yMiX7n9SBvadzox8T5jzT", "Clint Eastwood", "Gorillaz"),
    new Track("spotify:track:3AydAydLzyyZutA0375XIz", "A-Punk", "Vampire Weekend"),
    new Track("spotify:track:4u7vj352S98d9iA7ac1EVG", "Alesis", "Mk.gee"),
  ]
  );

  const [songCardOne, setSongCardOne] = useState(
    new Track("spotify:track:7GCaZax7ExKSNYFv8eQCvL", "The Goofy Goober Song", "Spongebob Squarepants")
  );

  const [songCardTwo, setSongCardTwo] = useState(
    new Track("spotify:track:0Bo5fjMtTfCD8vHGebivqc", "Axel F", "Crazy Frog")
  );

  const [chosenSongList, setChosenSongList] = useState<Track[]>([]);
  const [userQuery, setUserQuery] = useState("");
  console.log(userQuery);
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
    const serializedSelections = localStorage.getItem('userSelections');
    if (serializedSelections) {
        setChosenSongList(JSON.parse(serializedSelections));
    }
  }, []);

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
        <button type="submit" onClick={() => sendSearchQueryData(userQuery)} className=" bg-purple-300 px-6 py-4 rounded-xl text-black font-semibold hover:scale-105"> Submit </button>
      </div> 
      <div className="flex justify-center pb-24"> 
        <div className="w-2/5 flex justify-end pr-4 "> 
              <SongCard track={songCardOne} addSongToList={addSongToChosenList} />
        </div>
        <div className = "w-2/5 flex justify-start pl-4">
              <SongCard track={songCardTwo} addSongToList={addSongToChosenList}/>
          </div>
        </div>
        <GeneratedPlaylist tracks={chosenSongList} setTracks={setChosenSongList}/>
    </section>
    </SessionProvider>
  );
}
