export default class Track {

    constructor(id, title, artist, date_added) {
        this.id = id,
        this.title = title,
        this.artist = artist,
        this.date_added = date_added
    }

    static getTrackListIds = (tracks) => {
        let trackIdList = tracks.map(track => {
            return track.id
        })
        return trackIdList
    }

}