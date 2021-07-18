const express = require("express");
const axios = require("axios");

const app = express();

const events = [];

/**
{
    name: string,
    description: string,
    hosts: string[],
    host_at: Date, 
}
 */

// Exmaple
app.post('/event', () => {

});

app.listen(4003, () => {
  console.log("Listening on 4003");
});