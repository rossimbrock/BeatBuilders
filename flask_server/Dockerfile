# Python version
FROM python:3.9

# Working Directory
WORKDIR /usr/src/app

# Copy the current directory
COPY . .

# Install requirements.txt
RUN pip install -r requirements.txt

EXPOSE 8080

ENV FLASK_APP=api_endpoints.py

# Run program
CMD ["flask", "run", "--host", "0.0.0.0", "--port=8080"]
