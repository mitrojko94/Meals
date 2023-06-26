import React from "react";
import { NavLink } from "react-router-dom";
import Wrapper from "../assets/wrappers/Navbar";

const Navbar = () => {
  return (
    <Wrapper>
      <div className="nav-center">
        <span className="logo">MixMaster</span>
        <div className="nav-links">
          <NavLink to="/" className="nav-link">
            Home
          </NavLink>
          <NavLink to="/about" className="nav-link">
            About
          </NavLink>
          <NavLink to="/newsletter" className="nav-link">
            Newsletter
          </NavLink>
        </div>
      </div>
    </Wrapper>
  );
};

export default Navbar;

// Objasnjenje:
// Da bih stilizovao najbolje da koristim styled components, gde na ime styled stavim sta hocu da stilizujem, tipa dugme, element i slicno
// Automatski taj stilizovani element ce da ima neku random klasu
// Svaku klasu koju sam ovde definisao stilizujem pomocu styled componenti, tako sto pristupim elementu koji hocu da stilizujem, tipa nav i tu pisem sve CSS za klase koje ima nav i samo ubacim Wrapper umesto nav taga
// Kad pisem kodove za CSS pomocu styled components, samo ne mogu da koristim globalne klase, a sve druge klase mogu
