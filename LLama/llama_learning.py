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


def generate_response(prompt, model, grammar):
    max_tokens = 512
    temperature = 0.3
    top_p = 0.1
    echo = False
    stop = ["Q"]

    ctx_prompt = (
        """
The Spotify database allows searching by Acousticness, Danceability, Energy, Instrumentalness, Liveness, Loudness, Popularity, Speechiness, Time Signature, and Valence. Use these parameters to construct your queries.
Do NOT add any text outside of the JSON format shown in the examples.

Example 1: "Give me an unpopular song that was played live"
{
"accousticness":0.8,
"danceability":0.2,
"energy":0.3,
"instrumentalness":0.7,
"liveness":1,
"loudness":10,
"popularity":0.1,
"speechiness":0.8,
"time_signature":0.8,
"valence":0.2
}

Example 2: "I need a track for a quiet evening."
{
"accousticness":0.5,
"danceability":0.1,
"energy":0.2,
"instrumentalness":0.8,
"liveness":.4,
"loudness":5,
"popularity":0.7,
"speechiness":0.5,
"time_signature":0.4,
"valence":0.6
}

Now, your turn: "
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
