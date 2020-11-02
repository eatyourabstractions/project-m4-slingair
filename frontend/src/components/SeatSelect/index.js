import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import FlightSelect from "./FlightSelect";
import Form from "./Form";

const initialState = { seat: "", givenName: "", surname: "", email: "" };

const SeatSelect = ({ updateUserReservation }) => {
  const history = useHistory();
  const [flightNumber, setFlightNumber] = useState('Select flight');
  const [formData, setFormData] = useState(initialState);
  const [disabled, setDisabled] = useState(true);
  const [subStatus, setSubStatus] = useState("idle");
  const [onSubmit , setOnSubmit] = useState(false);

  useEffect(() => {
    // This hook is listening to state changes and verifying whether or not all
    // of the form data is filled out.
    Object.values(formData).includes("") || flightNumber === ""
      ? setDisabled(true)
      : setDisabled(false);
  }, [flightNumber, formData, setDisabled]);

  
  const handleFlightSelect = (ev) => {
    localStorage.setItem('flightNumber', ev.target.value)
    setFlightNumber(ev.target.value);
  };

  const handleSeatSelect = (seatId) => {
    setFormData({ ...formData, seat: seatId });
  };

  const handleChange = (val, item) => {
    setFormData({ ...formData, [item]: val });
  };

  const validateEmail = () => {
    const emailParts = formData.email.split("@");
    return (
      emailParts.length === 2 &&
      emailParts[0].length > 0 &&
      emailParts[1].length > 0
    );
  };

  useEffect(() => {
    // TODO: check localStorage for an id
    // if yes, get data from server and add it to state
    let name = formData.givenName;
    let surname = formData.surname;
    let email = formData.email;
    let flightNumber = localStorage.getItem('flightNumber')
    let seat = formData.seat

    const addIt = () =>{
      let addReservationUrl = `http://localhost:8000/addReservation/${name}/${surname}/${email}/${flightNumber}/${seat}`
      fetch(addReservationUrl,{method: 'POST'})
        .then(res => res.json())
        .then(response => {
          localStorage.setItem('reservationID', response.data.id)
          updateUserReservation(x => !x)
          history.push('/confirmed')
        })

    }
    if(name.length > 0){
      addIt()
    }
  }, [onSubmit]);

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (validateEmail()) {
      // TODO: Send data to the server for validation/submission
      // TODO: if 201, add reservation id (received from server) to localStorage
      // TODO: if 201, redirect to /confirmed (push)
      // TODO: if error from server, show error to user (stretch goal)
      setOnSubmit(y => !y)
      //history.push('/confirmed')
    }
  };

  return (
    <>
      <FlightSelect
        flightNumber={flightNumber}
        handleFlightSelect={handleFlightSelect}
      />
      <h2>Select your seat and Provide your information!</h2>
      <Form
        flightNumber={flightNumber}
        formData={formData}
        handleChange={handleChange}
        handleSeatSelect={handleSeatSelect}
        handleSubmit={handleSubmit}
        disabled={disabled}
        subStatus={subStatus}
      />
    </>
  );
};

export default SeatSelect;
