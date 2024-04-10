export default class Track {

    constructor(id, title, artist, imageLink, previewLink) {
        this.id = id,
        this.title = title,
        this.artist = artist,
        this.imageLink = imageLink
        this.previewLink = previewLink
    }

    static getTrackListIds = (tracks) => {
        let trackIdList = tracks.map(track => {
            return track.id
        })
        return trackIdList
    }

}