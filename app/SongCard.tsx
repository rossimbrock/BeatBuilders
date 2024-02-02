import { FavoriteFilled } from "@carbon/icons-react";
import { ThumbsDownFilled } from "@carbon/icons-react";

export default function SongCard() {
    return (
        <div className="flex-col w-1/2 justify-center justify-items-center">
            <div className="border-2 border-purple-300 px-3 py-3 rounded-lg shadow-lg w-full"> 
                <div className = "bg-purple-300 flex grow h-48 rounded-md">
                    {/* <p> Image</p> */}
                </div>
                <p className = "text-2xl font-semibold pt-2"> Song Title </p>
                <p className = "font-extralight font-lg"> Artist </p>
            </div>
            <div className="flex justify-center pt-8">
                <button className = "pr-8 hover:scale-125"> 
                    <FavoriteFilled size = {32} color = "white"/>
                </button>
                <button className="hover:scale-125"> 
                    <ThumbsDownFilled size = {32} color = "white" /> 
                </button>
            </div>
    
        </div>
    );
            
}