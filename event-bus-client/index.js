const express = require('express');
const axios = require('axios');

var eventBusListener = express.Router();

const EVENT_BUS_HOST = "event-bus";
const EVENT_BUS_PORT = "4001";

let connection;
const callbacks = [];

const connect = async ({subscriberName, host, port}) => {
    return await axios.get(`http://${EVENT_BUS_HOST}:${EVENT_BUS_PORT}/heartbeat`).then(res => {
        connection = {
            subscriberName,
            host,
            port
        }
    });
}

eventBusListener.post('/events', function(req, res, next) {
    const event = req.body;
    callbacks.forEach(callback => {
        if (event.type !== callback.type)
            return;
        callback.cb(event.data);
    });
    res.send({});
});

exports.publish = async (eventType, data) => {
    if (!connection)
        throw new Error("Connection Failed");

    return await axios.post(`http://${EVENT_BUS_HOST}:${EVENT_BUS_PORT}/events`, {
        type: eventType,
        data: data
    });
}

exports.subscribe = async (eventType, callback) => {
    if (!connection)
        throw new Error("Connection Failed");

    return await axios.post(`http://${EVENT_BUS_HOST}:${EVENT_BUS_PORT}/subscriptions`, {
        type: eventType,
        subscriber: connection.subscriberName,
        host: connection.host,
        port: connection.port
    }).then(res => {
        callbacks.push({
            type: eventType,
            cb: callback
        });
        return res;
    });
}

exports.connect = connect;
exports.eventBusListener = eventBusListener;