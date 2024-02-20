import { Add } from "@carbon/icons-react";
export default function SongListing({number, title, artist, dateAdded}: {number:any, artist:any, title:any, dateAdded:any}) { 
    return (
        <tr className="">
            <td> {number}  </td>
            <td> {title} </td>
            <td> {artist} </td>
            <td> {dateAdded}</td>
            <td className="pl-14 hover:scale-125">
                 <Add size={24} color = "rgb(216 180 254)" />
            </td>
        </tr>
    );
}