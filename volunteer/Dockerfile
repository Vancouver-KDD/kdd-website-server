FROM node:16-alpine3.11

# Create work directory
WORKDIR /

# Copy Source files
COPY ./volunteer ./volunteer
COPY ./event-bus-client ./event-bus-client

WORKDIR /volunteer

# Remove dependent modules
RUN rm -rf node_modules

# Reinstall dependent modules
RUN npm install

# Open port 3000
EXPOSE 4003
CMD npm start