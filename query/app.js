const express = require("express");
const axios = require("axios");
const cors = require("cors");
const bodyParser = require('body-parser');
const eventBus = require("../event-bus-client");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(eventBus.eventBusListener);

const users = [];
const events = [];

const onUserCreated = (data) => {
    console.log(`Saved the newly created user info's: ${data}`);
    users.push(data);
} 

eventBus.connect({ subscriberName: 'Query Service', host: 'query', port: 4002 }).then(() => {
    eventBus.subscribe({ eventType: 'User Created', cb: onUserCreated });
});

app.listen(4002, async () => {
    console.log("Listening on 4002");
});