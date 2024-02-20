# Node.js version
FROM node:20.11.0

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy to container
COPY . .

# Open port 3000 for application
EXPOSE 3000

# Starts app
CMD ["npm", "run", "dev"]
