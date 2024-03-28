// 'use client';
// import SongListing from "./SongListing";
// import { getAuth, signOut } from "firebase/auth";
import { initFirebase } from "@/firebase/firebase";
import Link from "next/link";
import { useState } from "react";
// import UserButton from "@/components/user-button";
import SongCards from "./SongCards";
import Search from "./Search";
import {sendSearchQueryData} from "./apiCalls";
import GeneratedPlaylist from "./GeneratedPlaylist";

import { GetServerSideProps } from 'next';
import { auth } from "auth"
import { Session } from "next-auth";
import Track from "./../Track.js";
import Tracks from "./../Tracks.js";

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   // Simulating a session fetch. Replace this with your actual session fetching logic.
//   const session = await auth();

//   return {
//     props: {
//       // Make sure session is already resolved here
//       session: session || null,
//     },
//     // session: session || null
//   };
// };

export default function Home() {

  // Tracks.addTrack(new Track("spotify:track:7GCaZax7ExKSNYFv8eQCvL", "Goofy Goover", "Spunch"))
  // return (
  //   <UserButton />
  // )
  // const [songCardsData, setSongCardsData] = useState({
  //     "cardOne": {
  //       title:  "Song Title",
  //       artist: "Song Artist", 
  //       image: "", 
  //     },
  //     "cardTwo": { 
  //       title: "Song Title", 
  //       artist: "Song Artist", 
  //       image: ""
  //     }
  // });
  // const [userQuery, setUserQuery] = useState("");
  // console.log(userQuery);
  // const app = initFirebase();
  // const auth = getAuth() 
  // const logOut = async() => { 
  //   signOut(auth).then(() => {
  //     console.log("Successful log out");
  //   }).catch((error) => {
  //     console.log("Error in log out");
  //   });
  // }
  return (
    <section className = "px-4 py-6"> 
      <div className="flex justify-between pb-24"> 
        <div className="flex items-center">
          <img src = "img/BeatBuilderLogo.png" width="50" height="50" className=""/>
          <p className="pl-4 text-lg font-semibold"> BeatBuilders</p>
        </div>
        {/* <UserButton /> */}
        <Link href = "/login">
          <button className = "bg-purple-300 rounded-md text-black font-semibold px-8 py-2 hover:scale-110">
              Log Out
          </button>
        </Link>
      </div>
      <div className = "flex justify-center text-4xl font-bold pb-10"> 
        <p> 
          Your Feelings. Your Playlist.
        </p>
      </div>
      {/* <div className = "flex justify-center pb-24">
        <input type="text" value = {userQuery} onChange = {(e) => setUserQuery(e.target.value)} placeholder = "Find a song based on mood, genre, artist..." className = "w-2/3 py-6 px-4 rounded-xl text-black pr-6"/>
        <div className = "pr-4"></div>
        <button type="submit" onClick={() => sendSearchQueryData(userQuery)} className=" bg-purple-300 px-6 py-4 rounded-xl text-black font-semibold hover:scale-105"> Submit </button>
      </div>  */}
      <Search />
      <SongCards />
      <GeneratedPlaylist />
    </section>
  );
}
