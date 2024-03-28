'use client';
import SongCard from "./SongCard";
import SongListing from "./SongListing";
import { getAuth, signOut } from "firebase/auth";
import { initFirebase } from "@/firebase/firebase";
import Link from "next/link";
import { useState } from "react";
import {sendSearchQueryData} from "./apiCalls";

export default function Home() {
  const [songCardsData, setSongCardsData] = useState({
      "cardOne": {
        title:  "Paranoid",
        artist: "Black Sabbath", 
      },
      "cardTwo": { 
        title: "Mississippi Queen", 
        artist: "Mountain", 
      }
  });
  const [userQuery, setUserQuery] = useState("");
  console.log(userQuery);
  const app = initFirebase();
  const auth = getAuth() 
  
  const logOut = async() => { 
    signOut(auth).then(() => {
      console.log("Successful log out");
    }).catch((error) => {
      console.log("Error in log out");
    });
  }

  return (
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
              <SongCard songTitle={songCardsData.cardOne.title} songArtist={songCardsData.cardOne.artist}/>
        </div>
        <div className = "w-2/5 flex justify-start pl-4">
              <SongCard songTitle={songCardsData.cardTwo.title} songArtist={songCardsData.cardTwo.artist}/>
          </div>
        </div>
      <div className = "w-1/2 flex justify-center pr-14">
        <p className="text-3xl font-extralight pb-10"> Your generated playlist </p>
      </div>
      <div className="flex justify-center">
        <table className="table-fixed w-3/4 text-center border-spacing-4 pl-4 border-separate">
          <thead className="pb-8">
            <tr className="">
              <th className="">
                #
              </th>
              <th>
                Title 
              </th>
              <th>
                Artist 
              </th>
              <th>
                Date Added
              </th>
              <th>

              </th>
            </tr>
          </thead>
          <tbody>
            <SongListing  title = "The Palisades" number = "1" artist = "Childish Gambino" dateAdded="Feb 2, 2024"/>
            <SongListing number = "2" title = "Landslide" artist = "Fleetwood Mac" dateAdded="Feb 1, 2024"/>
          </tbody>
        </table>
      </div>
    </section>
  );
}
