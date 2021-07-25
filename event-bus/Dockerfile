FROM node:16-alpine3.11

# Create work directory
WORKDIR /event-bus

# Copy Source files
COPY ./event-bus .

# Remove dependent modules
RUN rm -rf node_modules

# Reinstall dependent modules
RUN npm install

# Open port 3000
EXPOSE 4001
CMD npm start