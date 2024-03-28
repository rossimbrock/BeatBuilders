'use client';

import { useState } from "react";
import SongCard from "./SongCard";
import Track from "./../Track.js";

export default function SongCards() {

    let tracks = [
        new Track("spotify:track:7GCaZax7ExKSNYFv8eQCvL", "The Goofy Goober Song", "Spongebob Squarepants"),
        new Track("spotify:track:67awxiNHNyjMXhVgsHuIrs", "Turn Down For What", "DJ Whatever")
    ]
    const [songCardsData, setSongCardsData] = useState({
        "cardOne": new Track("spotify:track:7GCaZax7ExKSNYFv8eQCvL", "The Goofy Goober Song", "Spongebob Squarepants"),
        "cardTwo": new Track("spotify:track:67awxiNHNyjMXhVgsHuIrs", "Turn Down For What", "DJ Whatever")
    });

    return (
        <div className="flex justify-center pb-24"> 
            <div className="w-1/2 flex justify-center "> 
                <SongCard track={songCardsData.cardOne}/>
            </div>
            <div className = "w-1/2 flex justify-center">
                <SongCard track={songCardsData.cardTwo}/>
            </div>
        </div>
    )
}