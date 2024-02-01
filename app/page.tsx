import SongCard from "./SongCard";
import { FavoriteFilled } from "@carbon/icons-react";
import { ThumbsDownFilled } from "@carbon/icons-react";
export default function Home() {
  return (
    <section className = "px-4 py-6"> 
      <div className="flex justify-between pb-24"> 
        <button className = "bg-purple-300 rounded-md text-black font-semibold px-8 py-2">
              Logo
          </button>
        <button className = "bg-purple-300 rounded-md text-black font-semibold px-8 py-2">
            Log Out
        </button>
      </div>
      <div className = "flex justify-center text-4xl font-bold pb-10 pb-16"> 
        <p> 
          Your Feelings. Your Playlist.
        </p>
      </div>
      <div className = "flex justify-center pb-24">
        <input type="text" id="user-query" placeholder = "Find a song based on mood, genre, artist..." className = "w-9/12 py-6 px-4 rounded-xl text-black"/>
      </div> 
      <div className="flex justify-center"> 
        <div className="w-1/2 flex justify-center "> 
              <SongCard/>
        </div>
        <div className = "w-1/2 flex justify-center">
              <SongCard/> 

          </div>
        </div>
    </section>
  );
}
