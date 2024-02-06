from llama_cpp import Llama
from llama_cpp import LlamaGrammar

model_path = input("Enter the path to the model:\n")
model = Llama(model_path=model_path)

grammar = LlamaGrammar.from_file("./grammars/grammar.gbnf")

prompt = input("Enter a prompt:\n")

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
print("True output:\n")
print(model_output)
print("\nStripped Result:\n")
print(model_output["choices"][0]["text"].strip())
