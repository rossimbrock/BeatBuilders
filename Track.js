export default class Track {

    constructor(id, title, artist) {
        this.id = id,
        this.title = title,
        this.artist = artist
    }

    static getTrackListIds = (tracks) => {
        let trackIdList = tracks.map(track => {
            return track.id
        })
        return trackIdList
    }

}