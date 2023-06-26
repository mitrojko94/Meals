import React from "react";
import Wrapper from "../assets/wrappers/ErrorPage";
import { Link, useRouteError } from "react-router-dom";
import img from "../assets/not-found.svg";

const Error = () => {
  const error = useRouteError();
  // console.log(error);

  if (error.status === 404) {
    return (
      <Wrapper>
        <div>
          <img src={img} alt="not found" />
          <h3>Ohh!</h3>
          <p>We can't seem to find page you are looking for</p>
          <Link to="/">Back Home</Link>
        </div>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <div>
        <h3>Something went wrong</h3>
      </div>
    </Wrapper>
  );
};

export default Error;

// Objasnjenje:
// Koristim useRouteError Hook da proverim koja mi je greske tj. dobijam objekat sa svim podacima
// Ovo mi je slika samo kad mi je status greske 404, zato to i proveravam. Kad je neki drugi status, bice druga slika
// Ako je greska 404 bice prikazan kod za to, a ako nije, bice prikaza drugi return, sa tekstom "Something went wrong"
