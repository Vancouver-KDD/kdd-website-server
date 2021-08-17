const express = require("express");
const axios = require("axios");
const cors = require("cors");
const bodyParser = require('body-parser');
const eventBus = require("../event-bus-client");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(eventBus.eventBusListener);

const volunteers = [];
const photos = [];

app.get("/volunteers", (req, res) => {
    res.send(volunteers);
});

app.get("/volunteer/:volunteerId", (req, res) => {
    const { volunteerId } = req.params;
    let data;
    volunteers.forEach(v => {
        if(v.id === volunteerId)
            data = v;
    });
    res.send(data);
});

eventBus.subscribe('Volunteer Created', data => {
    volunteers.push(data);
});

//Photo API get method
app.get("/photos", (req, res) => {
    res.send(volunteers);
});

app.get("/photo/:photoId", (req, res) => {
    const { photoId } = req.params;
    const data = photos.find(photo => photoId.id === photoId)
    res.send(data);
});

eventBus.subscribe('Photo Created', data => {
    volunteers.push(data);
});


axios.get("/events").then(res => {
    const body = res.body;
    if (body.type === "Voluteer Created")
        volunteers.push(body.data);
    else if (body.type === "Photo Created")
        photos.push(body.data)
    else if (body.type === "Volunteer Removed") {
        let idx;
        volunteers.forEach((v, vIdx) => {
            if (v.id === body.data.id)
                idx = vIdx;
        });
        volunteers.splice(idx, 1);
    }
});

app.listen(4002, async () => {
    console.log("Listening on 4002");
});