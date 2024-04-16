import { CarbonForSalesforce, FavoriteFilled, ThumbsDownFilled } from "@carbon/icons-react";
import React, { useState, useEffect, useRef } from 'react';
import pullSongInfo from "./pullSongInfo";
import Track from "@/Track";
import { saveUserPlaylistSong } from "@/firebase/firestoreUtils";

interface SongCardProps {
    track: Track;
    addSongToList: (track: Track) => void;
    switchSongs: (track: Track) => void; 
}

const SongCard: React.FC<SongCardProps> = ({ track, addSongToList, switchSongs }) => {
    const [coverUrl, setCoverUrl] = useState<string>('');
    const [previewUrl, setPreviewUrl] = useState<string>('');
    const [showUnavailableMessage, setShowUnavailableMessage] = useState<boolean>(false);
    const audioPlayerRef = useRef<HTMLAudioElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationIdRef = useRef<number | null>(null);

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


    const handleVisualizer = () =>{
        const audioContext = new AudioContext();
        const audioElement = audioPlayerRef.current!;
        
        if(audioElement==null) return;
        const audioSource = audioContext.createMediaElementSource(audioElement);
        const analyser = audioContext.createAnalyser();
        audioSource.connect(analyser);
        analyser.connect(audioContext.destination);

        const canvas = canvasRef.current!;
        if(!canvas)return;
        const canvasCtx = canvas.getContext('2d')!;
        
        analyser.fftSize=32;
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        const draw = () => {
            const WIDTH = canvas.width;
            const HEIGHT = canvas.height;

            analyser.getByteFrequencyData(dataArray);

            canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);
            
            const barWidth = (WIDTH / bufferLength);
            let barHeight;
            let x = 0;
            canvasCtx.beginPath();
            for (let i = 0; i < bufferLength; i++) {
                barHeight = dataArray[i] / 2;

                canvasCtx.fillStyle = `rgba(50,50,${barHeight + 50},0.7)`;
                canvasCtx.roundRect(x, HEIGHT - barHeight / 2, barWidth, barHeight,6);
                
                x += barWidth + 1;
                
            }
            canvasCtx.fill();

            animationIdRef.current = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            cancelAnimationFrame(animationIdRef.current!);
        };
    }


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
            handleVisualizer();
        }
    }

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
                <div className="absolute pb-6 px-6">
                    {previewUrl && <canvas ref={canvasRef} style={{width:'100%',height:'20%',cursor: 'pointer',borderRadius:'5px'}} onClick={handlePlayPause}/>}
                </div>
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
            <button className="hover:scale-125" onClick={() => switchSongs(track)}>
                <ThumbsDownFilled size={32} color="white" />
            </button>
        </div>
        {previewUrl && <audio crossOrigin="anonymous" ref={audioPlayerRef} src={previewUrl} controls style={{ display: "none" }} />}

    </div>
    );
};

export default SongCard;