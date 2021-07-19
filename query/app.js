const express = require("express");
const axios = require("axios");
const cors = require("cors");
const bodyParser = require('body-parser');
const eventBus = require("event-bus-client");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(eventBus.eventBusListener);

const users = [];

app.listen(4002, async () => {
    console.log("Listening on 4002");
    /*
    try {
      const res = await axios.get("http://localhost:4001/events");
  
      for (let event of res.data) {
        console.log("Processing event:", event.type);
  
        handleEvent(event.type, event.data);
      }
    } catch (error) {
      console.log(error.message);
    }
    */
});

eventBus.connect({
  subscriberName: "Query",
  host: "localhost",
  port: 4002
}).then(() => {
  eventBus.subscribe("User Created", (data) => {
    users.push(data);
    console.log("User Stored: ");
    console.log(data);
  });
});