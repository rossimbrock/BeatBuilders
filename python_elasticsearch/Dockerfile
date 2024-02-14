# Python version
FROM python:3.9

# Working Directory
WORKDIR /usr/src/app

# Copy the current directory
COPY . .

# Install requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Use dockerize to wait for Elasticsearch to be ready before running the script
CMD ["python3", "spotify_test.py"]