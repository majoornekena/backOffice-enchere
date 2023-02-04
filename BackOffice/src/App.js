import React, { Component } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Arrange from './components/arrange/Arrange';
import Login from './components/authentification/Login';
import SingUp from './components/authentification/SingUp';
import AvionDesc from './components/avion/AvionDesc';
import AvionListe from './components/avion/AvionListe';
import ListeRecharge from './components/recharge/ListeRecharge';
import TPurchase from './components/ticket_purchase/TPurchase';
import VolListe from './components/vol/VolListe';

export default class App extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="preloader">
          <div className="lds-ripple">
              <div className="lds-pos"></div>
              <div className="lds-pos"></div>
          </div>
        </div>  
          <BrowserRouter>
              <Routes>
                  <Route path="/avion/:id"  element={<AvionDesc  />} />
                  <Route path="/avion"  element={<AvionListe  />} />
                  <Route path="/vol"  element={<VolListe  />} />
                  <Route path="/listerecharge"  element={<ListeRecharge  />} />
                  <Route path="/"  element={<Login  />} />
                  <Route path="/signupad"  element={<SingUp  />} />
                  <Route path="/ticket_purchase/:id"  element={<TPurchase  />} />
                  <Route path="/arrange/:volid/:id"  element={<Arrange  />} />
              </Routes>
          </BrowserRouter>
      </React.Fragment>
    );
  }
}
