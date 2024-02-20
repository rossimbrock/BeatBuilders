# Python version
FROM python:3.9

# Working Directory
WORKDIR /usr/src/app

# Copy the current directory
COPY . .

# Install requirements.txt
RUN pip install -r requirements.txt

# Run program
CMD ["python3", "spotify_test.py"]
