from langchain_community.llms import LlamaCpp
from langchain.callbacks.manager import CallbackManager
from langchain.callbacks.streaming_stdout import StreamingStdOutCallbackHandler
from langchain.chains import LLMChain
from langchain.prompts import PromptTemplate
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


def generate_response(prompt, model_path, grammar_path="./grammars/grammar.gbnf"):

    callback_manager = CallbackManager([StreamingStdOutCallbackHandler()])
    max_tokens = 512
    n_gpu_layers = 4
    n_batch = 512
    ctx_size = 4096
    temperature = 0.3
    top_p = 0.8
    echo = False
    stop = ["Q"]

    ctx_prompt = """
The Spotify database allows searching by Acousticness, Danceability, Energy, Instrumentalness, Liveness, Loudness, Popularity, Speechiness, Time Signature, and Valence. Use these parameters to construct your queries.
I will define each attribute below, you will output a JSON format of all attributes that match the mood of the prompt to an equivalent numeric value.

"accousticness": Probablilty that the prompt is an acoustic song
"danceability": How likely the prompt wants to dance to the music
"energy": How energetic the song is from 0 to 1
"instrumentalness": Predict if the prompted track has no vocals. 0 being completely spoken and 1 being no vocals.
"liveness": How likely the song is performed live
"loudness": How loud the song the prompt is describing is in decibels
"popularity": Percentile of popularity of the prompt
"speechiness": How much talking should be in the song described from the prompt, 1 being mostly speech.
"time_signature": The estimated time signature of the prompt
"valence": How happy or sad the song sounds. 0 being extremely sad and 1 being extremely happy

don't include an attribute in the responce ONLY if you are unsure about what value an attribute should be based on the prompt.

Now, estimate the song statistics of a song following this prompt: {question}"
"""

    template = PromptTemplate.from_template(ctx_prompt)

    llm = LlamaCpp(
        model_path=model_path,
        max_tokens=max_tokens,
        temperature=temperature,
        top_p=top_p,
        echo=echo,
        f16_kv=True,
        stop=stop,
        grammar_path=grammar_path,
        verbose=True,
        callback_manager=callback_manager,
        n_ctx=ctx_size,
        n_gpu_layers=n_gpu_layers,
        n_batch=n_batch,
    )

    llm_chain = LLMChain(prompt=template, llm=llm)

    model_output = llm_chain.invoke(prompt)
    return model_output["text"].strip()


def main():
    args = parse_args()

    prompt = input("Enter a prompt:\n")

    json = generate_response(prompt, args.model, args.grammar)
    print("Model Output:\n")
    print(json)


if __name__ == "__main__":
    main()
