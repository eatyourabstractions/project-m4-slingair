"use strict";

// use this package to generate unique ids: https://www.npmjs.com/package/uuid
const { v4: uuidv4, v4 } = require("uuid");

//  Use this data. Changes will persist until the server (backend) restarts.
let { flights, reservations } = require("./data");

const getFlights = (req, res) => {
  res.set('Access-Control-Allow-Origin', '*')
    .status(200)
    .json({ status: 200, data: {flights: Object.keys(flights) }, message: {} });
};

const getFlight = (req, res) => {
  if(flights.hasOwnProperty(`${req.params.number}`)){
      
      res.set('Access-Control-Allow-Origin', '*')
        .status(200)
        .json({ status: 200, data: {seats_info: flights[`${req.params.number}`] }, message: {} });
  } else{
    res.set('Access-Control-Allow-Origin', '*')
      .status(400)
      .json({ status: 400, data: {seats_info: `${req.params.number}` }, message: {} });
  }
};

const getRandomSeatInFlight = (flight) =>{
  const availableSeats = flights[flight].filter(seat => seat.isAvailable );
  if(availableSeats.length > 0){
    const randomSeat = availableSeats[Math.floor(Math.random() * availableSeats.length)];
    const randomSeatIdx = flights[flight].indexOf(randomSeat)
    flights[flight][randomSeatIdx].isAvailable = false
    return randomSeat.id
  } else{
    return "FULL"
  }
  
}

const addReservations = (req, res) => {
  const {name, surname, email, flight, seat} = req.params
  
  const mySeat = flights[flight].filter(s => s.id === seat );
  const mySeatIndex = flights[flight].indexOf(mySeat[0]);
  flights[flight][mySeatIndex].isAvailable = false

      const newReservation = {
        id: v4(),
        flight: flight,
        seat: seat,
        givenName: name,
        surname: surname,
        email: email
      }
      reservations.push(newReservation)
      res.set('Access-Control-Allow-Origin', '*')
        .status(201)
        .json({ status: 201, data: newReservation, message: 'reservation created successfully' });
    
  
};

const getReservations = (req, res) => {
  res.status(200).json({ status: 200, data: reservations, message: {} });
};

const getSingleReservation = (req, res) => {
  let id = req.params.id
  let reservation = reservations.filter( rsrv => rsrv.id === id)
  if(reservation.length > 0){
    res.set('Access-Control-Allow-Origin', '*')
    .status(200).json({ status: 200, data: reservation, message: {} });
   } else {
    res.set('Access-Control-Allow-Origin', '*')
    .status(404).json({ status: 404, data: id, message: {} });
   }
};

const updateReservation = (req, res) => {
  const {flight, seat, key, value} = req.params;
  const myReservation = reservations.filter(resr => resr.flight === flight && resr.seat === seat)
  if(myReservation.length > 0){
    const rindex = reservations.indexOf(myReservation[0])
    reservations[rindex][key] = value
    res.status(200).json({ status: 200, data: {}, message: `reservation update successfully` });
  } else{
    res.status(404).json({ status: 404, data: {flight: flight, seat: seat} , message: `here's no such reservation please check flight or seat` });
  }
};

const deleteReservation = (req, res) => {
  const {flight, seat} = req.params;
  if(flights.hasOwnProperty(`${flight}`)){
    let seatTmp = flights[flight].filter(s => s.id === seat)
    
    if(seatTmp.length > 0){
      const seatIndex = flights[flight].indexOf(seatTmp[0])
      flights[flight][seatIndex].isAvailable = true;
      const toBeDeleted = reservations.filter(res => res.flight === flight && res.seat === seat)
      reservations = reservations.filter(res => res !== toBeDeleted[0])
      res
        .status(200)
        .json({ status: 200, data: {}, message: `reservation deleted succesfully` });

    } else{
      res
        .status(400)
        .json({ status: 400, data: {seat}, message: `there's not such seat` });

    }

  } else{
    res
      .status(400)
      .json({ status: 400, data: flight, message: `there's not such flight` });
  }
};

module.exports = {
  getFlights,
  getFlight,
  getReservations,
  addReservations,
  getSingleReservation,
  deleteReservation,
  updateReservation,
};
