# Use official Node.js image
FROM node:18

# Set working directory in container
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app
COPY . .

# Expose port 5000 for the server
EXPOSE 5000

# Start the app
CMD ["node", "src/server.js"]
