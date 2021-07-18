const express = require("express");
const axios = require("axios");
const eventBus = require("event-bus-client");

const app = express();
app.use(eventBus.eventBusListener);
/*
eventBus.connect({
    subscriberName: "Query",
    host: "http://localhost",
    port: 4002
}).then(() => {
  // TEST
  eventBus.subscribe("User Created", (data) => {
      users.push(data);
      console.log("User Stored");
      console.log(data);
  });
});
*/

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