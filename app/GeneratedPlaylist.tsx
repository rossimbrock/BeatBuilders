'use client';
import SongListing from "./SongListing";
import UserButton from "@/components/user-button";
import { Session } from "next-auth";
import Tracks from "./../Tracks.js"
import Track from "./../Track.js"
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

// const GeneratedPlaylist: React.FC<> = () => {
export default function GeneratedPlaylist() {

    // let tracks = new Tracks()
    // Tracks.addTrack(new Track("spotify:track:7GCaZax7ExKSNYFv8eQCvL", "Goofy Goover", "Spunch"))
    const [tracks, setTracks] = useState(Tracks.list);

    useEffect(() => {
        setTracks(Tracks.list);
    }, [Tracks.list])

    return (
        <>
        <div className="flex justify-center pr-14">
        <div className="flex justify-between items-center w-3/5 pb-10">
            <p className="text-3xl font-extralight">Your generated playlist</p>
            {/* <UserButton session={session} tracks={tracks}/> */}
            <UserButton tracks={Tracks.list}/>
        </div>
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
                {tracks.map((track, i) => {
                    return (
                        <SongListing number={i+1} title={track.title} artist={track.artist} dateAdded={track.dateAdded}></SongListing>
                    )
                })}
            </tbody>
            </table>
        </div>
        </>
    )
}

// export default GeneratedPlaylist