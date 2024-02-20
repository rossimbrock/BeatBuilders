'use client';

import { useState } from "react";
import SongCard from "./SongCard";

export default function SongCards() {
    const [songCardsData, setSongCardsData] = useState({
        "cardOne": {
          title:  "Song Title",
          artist: "Song Artist", 
          image: "", 
        },
        "cardTwo": { 
          title: "Song Title", 
          artist: "Song Artist", 
          image: ""
        }
    });

    return (
        <div className="flex justify-center pb-24"> 
            <div className="w-1/2 flex justify-center "> 
                <SongCard songTitle={songCardsData.cardOne.title} songArtist={songCardsData.cardOne.artist}/>
            </div>
            <div className = "w-1/2 flex justify-center">
                <SongCard songTitle={songCardsData.cardTwo.title} songArtist={songCardsData.cardTwo.artist}/>
            </div>
        </div>
    )
}