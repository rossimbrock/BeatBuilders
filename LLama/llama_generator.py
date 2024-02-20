from llama_cpp import Llama
from llama_cpp import LlamaGrammar
import argparse


def parse_args():
    parser = argparse.ArgumentParser(
        prog="Song Feel Generator",
        description="Generates a song data JSON file that fits the given prompt",
    )
    parser.add_argument("-m", "--model", help="Path to the LLM model to use")
    parser.add_argument(
        "-g",
        "--grammar",
        help="Path to the grammar file to use",
        default="./grammars/grammar.gbnf",
        type=str,
    )
    return parser.parse_args()


def generate_response(prompt, model, grammar="./grammars/grammar.gbnf"):
    max_tokens = 512
    temperature = 0.3
    top_p = 0.1
    echo = False
    stop = ["Q"]

    ctx_prompt = (
        """
The Spotify database allows searching by Acousticness, Danceability, Energy, Instrumentalness, Liveness, Loudness, Popularity, Speechiness, Time Signature, and Valence. Use these parameters to construct your queries.
I will define each attribute below, you will output a JSON format of all attributes that match the mood of the prompt to an equivalent numeric value.

"accousticness": Probablilty that the prompt is an acoustic song
"danceability": How likely the prompt wants to dance to the music
"energy": How energetic the song is from 0 to 1
"instrumentalness": Predict if the prompted track has no vocals. 0 being completely spoken and 1 being no vocals.
"liveness": How likely the song is performed live
"loudness": Average song loudness in decibels
"popularity": Percentile of popularity of the prompt
"speechiness": How much talking should be in the song described from the prompt, 1 being mostly speech.
"time_signature": The estimated time signature of the prompt
"valence": How happy or sad the song sounds. 0 being extremely sad and 1 being extremely happy

Now, estimate the song statistics of a song following this prompt: "
"""
        + prompt
        + '"'
    )

    model_output = model(
        ctx_prompt,
        max_tokens=max_tokens,
        temperature=temperature,
        top_p=top_p,
        echo=echo,
        stop=stop,
        grammar=grammar,
    )
    return model_output["choices"][0]["text"].strip()


def main():
    args = parse_args()

    model = Llama(model_path=args.model, n_gpu_layers=-1, n_batch=512, n_ctx=512)
    grammar = LlamaGrammar.from_file(args.grammar)
    prompt = input("Enter a prompt:\n")

    json = generate_response(prompt, model, grammar)
    print("Model Output:\n")
    print(json)


if __name__ == "__main__":
    main()
