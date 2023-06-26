import React from "react";
import Wrapper from "../assets/wrappers/CocktailList";
import CocktailCard from "./CocktailCard";

const CocktailList = ({ meals }) => {
  if (!meals) {
    return <h4 style={{ textAlign: "center" }}>No matching meals found...</h4>;
  }

  const formattedMeals = meals.map((item) => {
    // console.log(item);
    const {
      idMeal,
      strMeal,
      strMealThumb,
      strInstructions,
      strArea,
      strCategory,
    } = item;
    return {
      id: idMeal,
      name: strMeal,
      image: strMealThumb,
      info: strInstructions,
      location: strArea,
      category: strCategory,
    };
  });

  return (
    <Wrapper>
      {formattedMeals.map((item) => {
        return <CocktailCard key={item.id} {...item} />;
      })}
    </Wrapper>
  );
};

export default CocktailList;

// Koristim map metodu i idem kroz niz meals koji sam prosledio komponentu i Landing.jsx, gde sam je napravio
// Izvucem iz meals sta mi treba i to ubacim u kod
// Prosledio sam komponenti CocktailCard razbijen objekat {...item}, tako da tamo u samoj komponenti odmah kroz props izvucem koja polja mi trebaju
// Da sam prosledio objekat tipa item={item}, u samoj komponenti bih kroz props dobio item
