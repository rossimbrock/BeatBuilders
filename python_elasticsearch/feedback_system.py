import json


# Will update the user preferences to better match the song_data depending on if the user liked the song
#
# user_prefs : JSON file of user song preferences
# song_data : Identically formatted JSON file with the interacted song's data
# liked_song : Whether or not the user liked the song
# user_prefs, song_data, liked_song
def update_prefs(user_prefs, song_data, liked_song):
    song_weight = 0.1
    print("Original preferences: ")
    print(user_prefs)

    # True=1,False=0, so this remaps liked_song to True=1,False=-1
    negation = (liked_song - 0.5) * 2

    print(song_data)
    updated_prefs = {}
    for key, value in user_prefs.items():
        distance = (song_data[key] - user_prefs[key]) * song_weight * negation
        updated_prefs[key] = user_prefs[key] + distance

    return json.dumps(updated_prefs)


if __name__ == "__main__":
    with open("./test.json", "r") as f:
        prefs = json.load(f)
    with open("./test_song.json", "r") as f:
        song = json.load(f)

    output = update_prefs(prefs, song, False)
    print(output)
