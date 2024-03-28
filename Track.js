export default class Track {

    constructor(id, title, artist) {
        this.id = id,
        this.title = title,
        this.artist = artist
    }

    static getTrackListIds = (tracks) => {
        // console.log("TRACK LIST OBJECTS: ", Tracks.list)
        let trackIdList = tracks.map(track => {
            return track.id
        })
        // console.log("TRACK LIST ID's: ", trackIdList)
        return trackIdList
    }

}