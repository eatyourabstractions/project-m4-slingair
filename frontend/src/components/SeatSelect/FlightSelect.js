import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { themeVars } from "../GlobalStyles";

const FlightSelect = ({flightNumber, handleFlightSelect }) => {
  const [flights, setFlights] = useState([]);
  

  useEffect(() => {
    // TODO: fetch the flight numbers
     fetch('http://localhost:8000/allFlights')
      .then(res => res.json())
      .then(response => setFlights(response.data.flights))
      
  }, []);

  


  const listOfFlights = flights.map((flight) =>
    <option key={flight}>{flight}</option>
  );

  
  return (
    <Wrapper>
      <label htmlFor="flight">Flight Number :</label>
      {/* TODO: Create a dropdown from the flight numbers */}
      <Dropdown id="items" value={flightNumber} onChange={handleFlightSelect}>
      <option key={'select1'}>Select flight</option>
          {listOfFlights}
      </Dropdown>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background: ${themeVars.cadmiumRed};
  height: 80px;
  display: flex;
  align-items: center;
  padding: ${themeVars.pagePadding};
  margin-bottom: ${themeVars.pagePadding};
`;

const Dropdown = styled.select`
  margin: 20px;
  padding: 5px 30px 5px 30px;
  border-radius: 5px;
`;

export default FlightSelect;
