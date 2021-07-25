const express = require("express");
const axios = require("axios");
const bodyParser = require('body-parser');
const eventBus = require("../event-bus-client");

const app = express();
app.use(bodyParser.json());

app.use(eventBus.eventBusListener);

app.post("/users", (req, res) => {
  const data = req.body;
  database.save(data);
  res.send({ data }, 200);
})

const users = [];

app.listen(4004, () => {
  console.log("Listening on 4004");
});

/**
 * GET /events
 * POST /events
 * GET /event/{id}
 * PUT /event/{id}
 * PATCH /event/{id}
 * DELETE /event/{id}
 */

const sponsorDB = [];

/**
 * /events?name=john&age=23
 * /events?sory_by=name
 */
app.get('/users', (req, res) => {
  const userCpy = [...sponsorDB];
  const params = req.params; // { name: john, age: 23 }
  Object.entries(parmas).forEach(entry => {
    const [key,value] = entry;
    if (userCpy[0][key] !== undefined)
      userCpy = userCpy.filter(user => user[key] === [value]);
  });
  if (parmas.sort_by !== undefined)
    userCpy = userCpy.sort(user => user.params.sort_by);
  res.send(userCpy);
});

/**
 * name: string
 * registerd_at: Date,
 * logo: Blob | File
 */
app.post('/users', (req, res) => {
  const data = req.body;
  sponsorDB.push({
    sponsorName:data.name,
    registered_at: data.registered_at,
    logo: data.logo
  });
  res.send({
    message: 'ok',
    data: data
  });
})

app.get('/user/:id', function(req, res){
  const sponsorId = req.params.id
  if(!sponsorId){      
      return res.status(400).json({
          message: 'Missing sponsor Id'
      })
  }
  const sponsorData = sponsors[sponsorId]
  if(!sponsorData){
      return res.status(400).json({
          message: 'Missing sponsor data'
      })
  }
  res.status(200).json(sponsorData);
});