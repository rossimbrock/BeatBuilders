import { Subtract } from "@carbon/icons-react";
import Track from '@/Track.js';
import { integer } from "@elastic/elasticsearch/lib/api/types";
import { Dispatch, SetStateAction } from "react";

interface SongListingProps {
    number: integer;
    track: Track;
    setTracks: Dispatch<SetStateAction<Track[]>>    
}

const SongListing: React.FC<SongListingProps> = ({number, track, setTracks}) => { 

    const removeTrack = () => {
        setTracks((tracks) => {
            let newTracks = tracks.filter(trk => trk !== track);
            const serializedSelection = JSON.stringify(newTracks);
            localStorage.setItem('userSelections', serializedSelection);
            return newTracks;
        }
        );
    }

    return (
        <tr className="">
            <td> {number}  </td>
            <td> {track.title} </td>
            <td> {track.artist} </td>
            <td> {"TODO"}</td>
            <td className="pl-14 hover:scale-125">
                 <Subtract size={24} color = "rgb(216 180 254)" onClick={removeTrack}/>
            </td>
        </tr>
    );
}

export default SongListing