const express = require("express");
const { v4: uuid } = require('uuid');
const bodyParser = require('body-parser');
const eventBus = require("../event-bus-client");

const app = express();
app.use(bodyParser.json());
app.use(eventBus.eventBusListener);

const photos = [];

app.post('/photos', (req, res) => {
  const body = req.body;
  const photo = {
    id: uuid(),
    image_url: body.image_url,
    description: body.description,
    uploader_name: body.uploader_name,
    create_at: body.create_at
  }
  photos.push(photo);

  /**
   * Public 'photo Created' event
   */
  eventBus.publish('photo Created', photo);

  res.send(photo);
});


app.listen(4004, () => {
  console.log("Listening on 4004");
});