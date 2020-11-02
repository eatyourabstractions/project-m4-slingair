"use strict";

// import the needed node_modules.
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const {getFlights, 
      getFlight, 
      getReservations,
      getSingleReservation,
      addReservations,
      deleteReservation,
      updateReservation} = require('./handlers')

express()
  // Below are methods that are included in express(). We chain them for convenience.
  // --------------------------------------------------------------------------------

  // This will give us will log more info to the console. see https://www.npmjs.com/package/morgan
  .use(morgan("tiny"))
  .use(bodyParser.json())

  // Any requests for static files will go into the public folder
  .use(express.static("public"))

  // Nothing to modify above this line
  // ---------------------------------
  // add new endpoints here 👇
  
  // get flights (flight numbers)
  .get('/allFlights', getFlights)

  // get flight seating info
  .get('/flightInfo/:number', getFlight)

  // get all reservations
  .get('/allReservations', getReservations)

  // get single reservation using email
  .get('/getReservation/:id', getSingleReservation)

  // create reservation
  .post('/addReservation/:name/:surname/:email/:flight/:seat', addReservations)

  // update reservation
  .put('/updateReservation/:flight/:seat/:key/:value', updateReservation)

  // delete reservation
  .delete('/deleteReservation/:flight/:seat/', deleteReservation)

  // add new endpoints here ☝️
  // ---------------------------------
  // Nothing to modify below this line

  // this is our catch all endpoint.
  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is obviously not what you are looking for.",
    });
  })

  // Node spins up our server and sets it to listen on port 8000.
  .listen(8000, () => console.log(`Listening on port 8000`));
