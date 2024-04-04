# Python version
FROM python:3.9

# Working Directory
WORKDIR /usr/src/app

# Install requirements.txt
COPY ./flask_server/requirements.txt .
RUN pip install -r requirements.txt

# Copy the current directory content of flask_server and the llama directory
COPY ./flask_server/ .
COPY ./LLama/ ./LLama/

EXPOSE 8080

ENV FLASK_APP=api_endpoints.py

# Run program
CMD ["flask", "run", "--host", "0.0.0.0", "--port=8080"]
