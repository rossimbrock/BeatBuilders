import json
import math


# Will update the user preferences to better match the song_data depending on if the user liked the song
#
# user_prefs : JSON file of user song preferences
# song_data : Identically formatted JSON file with the interacted song's data
# liked_song : Whether or not the user liked the song
def update_prefs(user_prefs, song_data, liked_song):
    song_weight = 0.1

    # True=1,False=0, so this remaps liked_song to True=1,False=-1
    negation = (liked_song - 0.5) * 2

    updated_prefs = {}
    for key, value in user_prefs.items():
        distance = (song_data[key] - user_prefs[key]) * song_weight * negation
        new_value = user_prefs[key] + distance
        # Assuming if the original value is <1 then the value should be clamped by 1
        if user_prefs[key] <= 1:
            new_value = min(new_value, 1)
        new_value = max(new_value, 0)
        updated_prefs[key] = new_value

    return json.dumps(updated_prefs)


if __name__ == "__main__":
    with open("./test.json", "r") as f:
        prefs = json.load(f)
    with open("./test_song.json", "r") as f:
        song = json.load(f)

    output = update_prefs(prefs, song, False)
    print(output)
