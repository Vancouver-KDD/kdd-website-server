const express = require("express");
const axios = require("axios");
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

/**
 * Subscription Format
 * json
 * {
 *    type: string,
 *    subscriber: string,
 *    host: string
 *    port: number
 * }
*/
const subscribers = [];
/**
 * Add a subscriber who will consume any events of given event type
 */
app.post("/subscriptions", (req, res) => {
  const subscription = req.body;
  subscribers.push(subscription);

  console.log("New Subscriber: ");
  console.log(subscription);

  res.send({ status: "OK" });
});

app.get("/subscriptions", (req, res) => {
  res.send(subscribers);
});

/**
 * Event Format
 * json
 * {
 *    type: string,
 *    data: number | string | object | array
 * }
 */
const eventStore = [];

/**
 * Publish a new event and save it to the event store
 */
app.post("/events", (req, res) => {
  const event = req.body;

  subscribers.forEach(subscriber => {
    if (subscriber.type !== event.type)
      return;

    axios.post(`http://${subscriber.host}:${subscriber.port}/events`, {
      type: event.type,
      data: event.data
    });
  });

  console.log("New Event: " + event.type);

  eventStore.push(event);
  res.send({ status: "OK" });
});

/**
 * Get all saved events
 */
app.get("/events", (req, res) => {
  res.send(eventStore);
});


app.get("/heartbeat", (req, res) => {
  console.log(`[200] Heatbeat Requested`);
  res.send({ status: 'ok' });
})

app.listen(4001, () => {
  console.log("Listening on 4001");
});