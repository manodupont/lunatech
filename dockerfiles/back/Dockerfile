# Set the base image to node
FROM node:8

# File Author / Maintainer
MAINTAINER Manuel Dupont

ARG MONGODB_HOST

# Expose server port
EXPOSE 3000

# Copy application files
COPY . .

# Install Node.js dependencies
RUN npm install

# Start node app.
CMD ["node", "./src/server/index.js"]
