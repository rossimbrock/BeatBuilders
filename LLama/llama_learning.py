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
    max_tokens = 250
    temperature = 0.3
    top_p = 0.1
    echo = False
    stop = ["Q"]

    model_output = model(
        prompt,
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

    model = Llama(model_path=args.model)
    grammar = LlamaGrammar.from_file(args.grammar)
    prompt = input("Enter a prompt:\n")

    json = generate_response(prompt, model, grammar)
    print("Model Output:\n")
    print(json)


if __name__ == "___main__":
    main()
