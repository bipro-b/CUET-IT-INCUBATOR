# Use official Node.js LTS image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the code
COPY . .

# Expose the app port (default is 3000; change if needed)
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
