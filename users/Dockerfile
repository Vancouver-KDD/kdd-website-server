FROM node:16-alpine3.11

# Create work directory
WORKDIR /users

# Copy Source files
COPY . .

# Remove dependent modules
RUN rm -rf node_modules

# Reinstall dependent modules
RUN npm install

# Open port 3000
EXPOSE 4004
CMD npm start