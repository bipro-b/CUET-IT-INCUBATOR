# Use official Node.js LTS image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the code, including .env
COPY . .

# Expose the app port
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
