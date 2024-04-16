# Python version
FROM python:3.9

# Working Directory
WORKDIR /usr/src/app

# Install requirements.txt
COPY ./proxy_server/requirements.txt .
RUN pip install -r requirements.txt

# Copy the current directory content of flask_server and the llama directory
COPY ./proxy_server/ .
COPY ./LLama/ ./LLama/

EXPOSE 8081

ENV FLASK_APP=flask_proxy.py

# Run program
CMD ["flask", "run", "--host", "0.0.0.0", "--port=8081"]
