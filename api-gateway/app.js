const express = require("express");
const axios = require("axios");
const cors = require("cors");
const proxy = require('express-http-proxy');

const app = express();
app.use(cors());

app.use('/users', proxy('localhost:4002', {
  filter: function(req, res) {
     return req.method == 'GET';
  }
}));

app.use('/users', proxy('localhost:4004', {
  filter: function(req, res) {
     return req.method == 'POST';
  }
}));

app.get("/", (req, res) => res.send("test"));

app.listen(3000, () => {
    console.log("Listening on 3000");
});