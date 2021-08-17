const express = require("express");
const { v4: uuid } = require('uuid');
const bodyParser = require('body-parser');
const eventBus = require("../event-bus-client");

const app = express();
app.use(bodyParser.json());
app.use(eventBus.eventBusListener);

const photos = [];
// git test
app.post('/photos', (req, res) => {
  const photo = {
    id: uuid(),
    image_url: req.body.image_url,
    description: req.body.description,
    uploader_name: req.body.uploader_name,
    create_at: req.body.create_at
  }
  photos.push(photo);

  /**
   * A photo posting function
   * @param {string} image_url url of image
   * @param {string} description a berief description about the picture (location, people, and purpose) 
   * @param {string} uploader_name name of uploader (not the taker)
   * @param {date}, date of upload
   */
  eventBus.publish('photo Created', photo);

  res.send(photo);
});

app.listen(4004, () => {
  console.log("Listening on 4004");
});