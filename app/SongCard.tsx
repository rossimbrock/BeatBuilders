import { FavoriteFilled, ThumbsDownFilled } from "@carbon/icons-react";
import React, { useState, useEffect } from 'react';
import pullCoverArt from "./pullCoverArt";

interface SongCardProps {
    songTitle: string;
    songArtist: string;
}

const SongCard: React.FC<SongCardProps> = ({ songTitle, songArtist }) => {
    const [coverUrl, setCoverUrl] = useState<string>('');

    useEffect(() => {
        const pullCover = async () => {
            const url = await pullCoverArt(songTitle, songArtist);
            if (url) setCoverUrl(url);
        };

        pullCover();
    }, [songTitle, songArtist]); // Dependencies to re-fetch if songTitle or songArtist change
    return (
        <div className="flex-col w-1/2 justify-center items-center max-w-xs mx-auto">
            <div className="border-2 border-purple-300 px-3 py-3 rounded-lg shadow-lg w-full"> 
                <div className="bg-purple-300 flex justify-center items-center w-76 h-76 rounded-md overflow-hidden">
                    {coverUrl && <img src={coverUrl} alt="Album Cover" style={{ maxWidth: '300px', maxHeight: '300px', objectFit: 'cover' }} />}
                </div>
                <p className="text-2xl font-semibold pt-2" style={{ textTransform: 'capitalize' }}>{songTitle}</p>
                <p className="font-extralight font-lg" style={{ textTransform: 'capitalize' }}>{songArtist}</p>

            </div>
            <div className="flex justify-center pt-8">
                <button className="pr-8 hover:scale-125"> 
                    <FavoriteFilled size={32} color="white"/>
                </button>
                <button className="hover:scale-125"> 
                    <ThumbsDownFilled size={32} color="white" /> 
                </button>
            </div>
        </div>
    );
}
export default SongCard;