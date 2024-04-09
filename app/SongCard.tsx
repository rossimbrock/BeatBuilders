import { FavoriteFilled, ThumbsDownFilled } from "@carbon/icons-react";
import React, { useState, useEffect, useRef } from 'react';
import pullSongInfo from "./pullSongInfo";
import Track from "@/Track";
import { saveUserPlaylistSong } from "@/firebase/firestoreUtils";

interface SongCardProps {
    track: Track;
    addSongToList: (track: Track) => void;
}

const SongCard: React.FC<SongCardProps> = ({ track, addSongToList }) => {
    const [coverUrl, setCoverUrl] = useState<string>('');
    const [previewUrl, setPreviewUrl] = useState<string>('');
    const [showUnavailableMessage, setShowUnavailableMessage] = useState<boolean>(false);
    const audioPlayerRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        const pullInfo = async () => {
            const result = await pullSongInfo(track.title, track.artist);
            if (result) {
                setCoverUrl(result.coverUrl || '');
                setPreviewUrl(result.previewUrl || '');
            }
        };

        pullInfo();
    }, [track.title, track.artist]);

    const handlePlayPause = () => {
        // If there's no preview URL, show the unavailable message and return
        if (!previewUrl) {
            setShowUnavailableMessage(true);
            // Wait 3 seconds until removing unavailable messgae
            setTimeout(() => {
                setShowUnavailableMessage(false);
            }, 3000);
            return;
        }
        
        // If there's a preview URL, toggle play/pause
        document.querySelectorAll('audio').forEach((el) => {
            if (el !== audioPlayerRef.current) {
                el.pause();
            }
        });

        if (audioPlayerRef.current) {
            if (audioPlayerRef.current.paused) {
                audioPlayerRef.current.play();
            } else {
                audioPlayerRef.current.pause();
            }
        }
    };

    return (
    <div className="flex-col justify-center items-center mx-auto" style={{ width: '325px' }}>
        <div className="border-2 border-purple-300 rounded-lg shadow-lg relative" style={{ padding: '10px', backgroundColor: 'transparent', width: '325px', margin: 'auto' }}>
            <div className="flex justify-center items-center rounded-md overflow-hidden relative" style={{ width: '300px', height: '300px', margin: '0 auto' }}>
                <img src={coverUrl} alt="Album Cover" style={{ width: '100%', height: '100%', objectFit: 'cover', cursor: 'pointer', borderRadius: '8px' }} onClick={handlePlayPause} />
                {showUnavailableMessage && (
                    <div className='songUnavailable'>
                        Song Preview Unavailable
                    </div>
                )}
            </div>
            <div style={{ textAlign: 'left', paddingTop: '0' }}>
                <p className="text-2xl font-semibold" style={{ textTransform: 'capitalize', margin: '10px 0 0' }}>{track.title}</p>
                <p className="font-extralight font-lg" style={{ textTransform: 'capitalize', margin: '0' }}>{track.artist}</p>
            </div>
        </div>
        <div className="flex justify-center pt-8">
            <button className="pr-8 hover:scale-125" onClick={() =>  {
                addSongToList(track);
                console.log(sessionStorage.getItem("email"));
                saveUserPlaylistSong(track, sessionStorage.getItem("email"));
            }}>
                <FavoriteFilled size={32} color="white" />
            </button>
            <button className="hover:scale-125">
                <ThumbsDownFilled size={32} color="white" />
            </button>
        </div>
        {previewUrl && <audio ref={audioPlayerRef} src={previewUrl} controls style={{ display: "none" }} />}
    </div>
    );
};

export default SongCard;