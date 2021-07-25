const express = require("express");
const axios = require("axios");
const bodyParser = require('body-parser');
const eventBus = require("event-bus-client");

const app = express();
app.use(bodyParser.json());

app.use(eventBus.eventBusListener);

app.post("/users", () => {
    // process
    eventBus.publish("User Created", user);
})

const users = [];

app.listen(4004, () => {
  console.log("Listening on 4004");
});

eventBus.connect({
    subscriberName: "Users",
    host: "localhost",
    port: 4004
}).then(() => {
    const user = {
        name: 'Test Name',
        age: 10
    };
    users.push(user);
    eventBus.publish("User Created", user);
    // TEST
    console.log("User Create");
    console.log(users);
});