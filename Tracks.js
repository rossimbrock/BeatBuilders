
export default class Tracks {

    static list = []

    // constructor() {
    //     Tracks.list = []
    // }

    static addTrack = (track) => {
        Tracks.list.push(track);
    }

    static getTrackListIds = () => {
        console.log("TRACK LIST OBJECTS: ", Tracks.list)
        let trackIdList = Tracks.list.map(track => {
            return track.id
        })
        console.log("TRACK LIST ID's: ", trackIdList)
        return trackIdList
    }

    // createPlaylistFromTrackList

}