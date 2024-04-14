const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const currentDate = new Date(); 
const month = months[currentDate.getMonth()];
const day = currentDate.getDate();
const year = currentDate.getFullYear();
export default class Track {
    
    constructor(id, title, artist, imageLink, previewLink, dateAdded = `${month} ${day}, ${year}`) {
        this.id = id,
        this.title = title,
        this.artist = artist,
        this.imageLink = imageLink,
        this.previewLink = previewLink
        this.dateAdded = dateAdded
    }

    static getTrackListIds = (tracks) => {
        let trackIdList = tracks.map(track => {
            return track.id
        })
        return trackIdList
    }

}