import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import SeatSelect from "./SeatSelect";
import Confirmation from "./Confirmation";
import GlobalStyles, { themeVars } from "./GlobalStyles";


const App = () => {
  const [userReservation, setUserReservation] = useState({});
  const [updateUser, updateUserReservation] = useState(false);
  const didMount = useRef(false);

  
  useEffect(() => {
    // TODO: check localStorage for an id
    // if yes, get data from server and add it to state
    if(didMount.current) {
        let reservationID = localStorage.getItem('reservationID')
        console.log(reservationID)
        let getReservationUrl = `http://localhost:8000/getReservation/${reservationID}`
        fetch(getReservationUrl)
          .then(res => res.json())
          .then(response => {
            console.log(response)
            localStorage.setItem('currentUserInfo', JSON.stringify(response.data[0]) )
            setUserReservation({ ...userReservation, ...response.data[0] })})
        }
        didMount.current = true;
  }, [updateUser]);

  return (
    <BrowserRouter>
      <GlobalStyles />
      <Header />
      <Main>
        <Switch>
          <Route exact path="/">
            <SeatSelect updateUserReservation={updateUserReservation}/>
          </Route>
          <Route exact path="/confirmed">
            <Confirmation />
          </Route>
          <Route path="">404: Oops!</Route>
        </Switch>
        <Footer />
      </Main>
    </BrowserRouter>
  );
};

const Main = styled.div`
  background: ${themeVars.background};
  display: flex;
  flex-direction: column;
  height: calc(100vh - 110px);
`;

export default App;
