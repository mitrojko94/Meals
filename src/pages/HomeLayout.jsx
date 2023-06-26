import React from "react";
import { Outlet, useNavigation } from "react-router-dom";
import Navbar from "../components/Navbar";

const HomeLayout = () => {
  const navigation = useNavigation();
  // console.log(navigation);
  const isPageLoading = navigation.state === "loading";

  return (
    <div>
      <Navbar />
      <section className="page">
        {isPageLoading ? <div className="loading" /> : <Outlet />}
      </section>
    </div>
  );
};

export default HomeLayout;

// Objasnjenje:
// Da bi mi sve stranice imale isti CSS, samo odem u komponentu gde sam definisao Outlet, stavim Outlet u neku section i toj section dodelim neku klasu
// useNavigation() mi daje podatke o stateu i kad ga logujem vidim sta on sve ima
// Ako je navigation.state jednak loading onda pravim da ako je to true da mi se prikaze spinner na ekranu, a ako nije, onda odmah podaci
// Ako hocu da pristupim nekom objektu u svim komponentama, prosledim taj objekat u Outlet komponentu i onda u tipa komponenti CocktailCard pomocu useOutletContext dobijam taj objekat koji sam prosledio
