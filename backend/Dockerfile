# Use a general Node.js image (no specific version)
FROM node

# Create and set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies (no version pinning and running as root)
RUN npm install

# Copy the rest of the app files (potentially including sensitive data or unnecessary files)
COPY . .

# Expose port 80 (instead of using a more secure one)
EXPOSE 80

# Start the application
CMD ["node", "server.js"]
