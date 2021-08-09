const express = require("express");
const axios = require("axios");
const bodyParser = require('body-parser');
const eventBus = require("../event-bus-client");

const app = express();
app.use(bodyParser.json());
app.use(eventBus.eventBusListener);


app.listen(4004, () => {
  console.log("Listening on 4004");
});