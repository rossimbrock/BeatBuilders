// 'use client';
import SongListing from "./SongListing";
import Track from "./../Track.js"
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react";
import SpotifyButton from "./SpotifyButton";
import { useSession } from "next-auth/react";
import SpotifyUserAPI from "@/SpotifyUserAPI";


interface GeneratedPlaylistProps {
    tracks: Track[];
    setTracks: Dispatch<SetStateAction<Track[]>>;
}

const GeneratedPlaylist: React.FC<GeneratedPlaylistProps> = ({ tracks, setTracks }) => {

    const { data: session } = useSession();
    const [createPlaylistClicked, setCreatePlaylistClicked] = useState(false);
    const [playlistTitle, setPlaylistTitle] = useState("");
    const [textBoxError, setTextBoxError] = useState(false);

    const handleCreatePlaylistClick = () => {
        if (session){
            if (playlistTitle == ""){
                setTextBoxError(true);
                return
            }
            // initialize API, set token
            let SpotifyUserApi = new SpotifyUserAPI(session.user.access_token);
            SpotifyUserAPI.createPlaylistFromSongList(Track.getTrackListIds(tracks), playlistTitle);
            localStorage.clear();
            setTracks([]);
            setPlaylistTitle("");
            setCreatePlaylistClicked(false);
        }
    }

    const onTextBoxChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (textBoxError && e.target.value != ""){
            setTextBoxError(false);
        }
        setPlaylistTitle(e.target.value);
    }

    return (
        <>
            <div className={createPlaylistClicked ? "modal-backdrop" : ""}>
                {createPlaylistClicked &&
                    <>
                    <div className="modal-backdrop" onClick={() => setCreatePlaylistClicked(false)} style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 9 }}></div>
                    <div className="modal-content flex flex-col justify-center items-center mx-auto" style={{ position: 'absolute', top: '170%', left: '50%', transform: 'translate(-50%, -50%)', width: '525px', zIndex: 1000 }}>
                        <div className="border-2 border-purple-300 rounded-lg shadow-lg relative" style={{ padding: '10px', backgroundColor: '#1a1a1a', width: '525px', height: 'auto', margin: 'auto' }}>
                            <div className="flex justify-center items-center" style={{ width: '500px', height: '70px', margin: '0 auto' }}>
                                <p className="text-2xl font-semibold" style={{ textTransform: 'capitalize', margin: '0 10px 0 0' }}>Playlist Name:</p>
                                <div className="pr-4"></div>
                                <input className={`w-3/5 py-2 px-4 rounded-xl text-black ${textBoxError ? "border-4 border-red-500" : ""}`} style={{ margin: '0', height: 'auto' }} onChange={(e) => onTextBoxChange(e)}/>
                            </div>
                            <div className="flex justify-center mt-4">
                                <button type="submit" onClick={handleCreatePlaylistClick} className="bg-purple-300 px-6 py-4 rounded-xl text-black font-semibold hover:scale-105">Create Playlist</button>
                            </div>
                        </div>
                    </div>
                    </>
                }
            </div>
            <div className={`content ${createPlaylistClicked ? "blur" : ""}`}>
            <div className="flex justify-center pr-14">
            <div className="flex justify-between items-center w-3/5 pb-10">
                <p className="text-3xl font-extralight">Your generated playlist</p>
                <SpotifyButton setCreatePlaylistClicked={setCreatePlaylistClicked} />
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
                            <SongListing number={i+1} track={track} setTracks={setTracks}></SongListing>
                        )
                    })}
                </tbody>
                </table>
            </div>
            </div>
        </>
    )
}

export default GeneratedPlaylist