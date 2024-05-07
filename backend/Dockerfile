# Use an official Node runtime as a parent image
FROM node:16-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json (if available)
COPY package*.json ./

# Install any necessary dependencies
RUN npm install

# Bundle app source inside the Docker image
COPY . .

# Make port 3001 available to the world outside this container
EXPOSE 3001

# Define environment variables
ENV NODE_ENV=development

# Run the app when the container launches
CMD ["node", "server.js"]
