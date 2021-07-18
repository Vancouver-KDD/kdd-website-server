const express = require("express");
const axios = require("axios");
const eventBus = require("event-bus-client");

const app = express();
app.use(eventBus.eventBusListener);
/*
eventBus.connect({
    subscriberName: "User",
    host: "http://localhost",
    port: 4004
}).then(() => {
    // TEST
    createUser();
});
*/

app.post("/users", () => {
    // process
    eventBus.publish("User Created", user);
})

const users = [];
const createUser = () => {
    const user = {
        name: 'Test Name',
        age: 10
    };
    users.push(user);
    eventBus.publish("User Created", user);
    // TEST
    console.log("User Create");
    console.log(users);
}

app.listen(4004, () => {
  console.log("Listening on 4004");
});