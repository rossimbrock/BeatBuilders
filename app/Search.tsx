'use client';
import { useState } from "react";

export default function Search() {
    const [userQuery, setUserQuery] = useState("");
  // console.log(userQuery);

  return (
    <div className = "flex justify-center pb-24">
        <input type="text" value = {userQuery} onChange = {(e) => setUserQuery(e.target.value)} placeholder = "Find a song based on mood, genre, artist..." className = "w-9/12 py-6 px-4 rounded-xl text-black"/>
    </div> 
  )
}