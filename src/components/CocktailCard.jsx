import React from "react";
import { Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/CocktailCard";

const CocktailCard = ({ image, name, id, info, location, category }) => {
  return (
    <Wrapper>
      <div className="img-container">
        <img src={image} alt={name} className="img" />
      </div>
      <div className="footer">
        <h4>{name}</h4>
        <h5>{location}</h5>
        <p>{category}</p>
        <Link to={`/cocktail/${id}`} className="btn">
          Details
        </Link>
      </div>
    </Wrapper>
  );
};

export default CocktailCard;

// Objasnjenje:
// Uvezem kroz props sta mi treba sve od podataka
// Da bih imao vise informacija o samoj hrani, koristim Link komponentu i pomocu `` pravim da ide ka tom elementu, na koji sam kliknuo, zato sam i stavio ${id}
