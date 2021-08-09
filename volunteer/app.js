const express = require("express");
const { v4: uuid } = require('uuid');
const bodyParser = require('body-parser');
const eventBus = require("../event-bus-client");

const app = express();
app.use(bodyParser.json());
app.use(eventBus.eventBusListener);

const volunteers = [];

app.post('/volunteers', (req, res) => {
  const body = req.body;
  const volunteer = {
    id: uuid(),
    name: body.name,
    occupation: body.occupation,
    company: body.company,
    profile_url: body.profile_url,
    social_list: body.social_list
  }
  volunteers.push(volunteer);

  /**
   * Public 'Volunteer Created' event
   */
  eventBus.publish('Volunteer Created', volunteer);

  res.send(volunteer);
});

app.listen(4003, () => {
  console.log("Listening on 4003");
});