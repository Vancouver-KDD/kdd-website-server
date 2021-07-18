FROM node:16-alpine3.11

# Create work directory
WORKDIR /query

# Copy Source files
COPY . .

# Remove dependent modules
RUN rm -rf node_modules

# Reinstall dependent modules
RUN npm install

# Open port 3000
EXPOSE 4002
CMD npm start