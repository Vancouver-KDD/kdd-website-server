var express = require('express');
var eventBusListener = express.Router();
const axios = require('axios');

const EVENT_BUS_HOST = 'http;//localhost';
const EVENT_BUS_PORT = '4001';

let connection;
const callbacks = [];

const connect = async ({subscriberName, host, port}) => {
    return await axios.get(`${EVENT_BUS_HOST}:${EVENT_BUS_PORT}/heartbeat`).then(res => {
        connection = {
            subscriberName,
            host,
            port
        }
    });
}

eventBusListener.post('/events', function(req, res, next) {
    callbacks.forEach(callback => {
        if (req.type !== callback.type)
            return;
        callback.cb(req.data);
    });
    res.send({});
});

exports.publish = async (eventType, data) => {
    if (!connection)
        throw new Error("Connection Failed");

    return await axios.post(`${EVENT_BUS_HOST}:${EVENT_BUS_PORT}/events`, {
        type: eventType,
        data: data
    });
}

exports.subscribe = async (eventType, callback) => {
    if (!connection)
        throw new Error("Connection Failed");

    return await axios.post(`${EVENT_BUS_HOST}:${EVENT_BUS_PORT}/subscriptions`, {
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