import React from "react";
import { useLoaderData, Link, Navigate } from "react-router-dom";
import axios from "axios";
import Wrapper from "../assets/wrappers/CocktailPage";
import { useQuery } from "@tanstack/react-query";

const singleMealUrl = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=";

const singleCocktailQuery = (id) => {
  return {
    queryKey: ["cocktail", id],
    queryFn: async () => {
      const { data } = await axios.get(`${singleMealUrl}${id}`);
      return data;
    },
  };
};

export const loader =
  (queryClient) =>
  async ({ params }) => {
    // console.log(data);
    const { id } = params;
    await queryClient.ensureQueryData(singleCocktailQuery(id));
    // const { data } = await axios.get(`${singleMealUrl}${id}`);
    // console.log(response);
    // return { id, data };
    return { id };
  };

const Cocktail = () => {
  const { id } = useLoaderData();
  const { data } = useQuery(singleCocktailQuery(id));

  // Ako podaci tj. data ne postoje, ove dve linije koda mogu da ispisu gresku(prva linija koda) ili da vrate na sve podatke(druga linija koda)
  // if (!data) return <h2>Something went wrong...</h2>;
  if (!data) return <Navigate to="/" />;

  const singleMeal = data.meals[0];
  // console.log(singleMeal);
  const {
    strMeal: name,
    strMealThumb: image,
    strCategory: category,
    strArea: location,
    strInstructions: instructions,
    strYoutube: youtube,
  } = singleMeal;

  // Ingredients
  const validIngredients = Object.keys(singleMeal)
    .filter((key) => key.startsWith("strIngredient") && singleMeal[key] !== "")
    .map((key) => singleMeal[key]);
  // console.log(validIngredients);

  return (
    <Wrapper>
      <header>
        <Link to="/" className="btn">
          Back Home
        </Link>
        <h3>{name}</h3>
      </header>
      <div className="drink">
        <img src={image} alt={name} className="img" />
        <div className="drink-info">
          <p>
            <span className="drink-data">Name:</span> {name}
          </p>
          <p>
            <span className="drink-data">Location:</span> {location}
          </p>
          <p>
            <span className="drink-data">Category:</span> {category}
          </p>
          <p>
            <span className="drink-data">Ingredients:</span>{" "}
            {validIngredients.map((item, index) => {
              return (
                <span className="ing" key={item}>
                  {item}
                  {index < validIngredients.length - 1 ? "," : ""}
                </span>
              );
            })}
          </p>
          <p>
            <span className="drink-data">Youtube:</span>
            <a href={youtube} target="_blank">
              {youtube}
            </a>
          </p>
          <p>
            <span className="drink-data">Instructions:</span> {instructions}
          </p>
        </div>
      </div>
    </Wrapper>
  );
};

export default Cocktail;

// Objasnjenje:
// U loader f-ji uvek moram nesto da vratim
// U loader kao parametar stavljam data, a on mi sadrzi params, request i slicne polja koja su mi potrebna
// params sam stavio u objekat props, jer sam razbio data, odatle imam params
// Ako URL adresa nece da mi uradi, to je jer nisam stavio https://
// Iz response izvucem sta mi treba, a to je niz data i vratim sta hocu da koristim. I da bih pristupio podacima, moram da koristim useLoaderData, iz koga izvlacim ono sto sam vratio iz axios.get f-je, a to je data i id
// Morao sam da stavim index [0], jer imam samo jedan element u nizu, a da bih ga izvukao i pristupio njegovim poljima, moram da stavim [0]
// Izvucem sta mi treba i podesim kako hocu da mi izgleda stranica
// Koristim Object.keys da dobijem sve kljuceve nekog objekta koji sam prosledio kao parametar i izvlacim odatle sve reci koje mi pocinju pomocu strIngredients, pomocu filder metode
// Pomocu filder metode dobijam sve reci koje pocinju sa strIngredients i dobijam nazad sve elemente koji su razliciti od null i onda pomocu map metode dobijam nazad prave podatke
// Obratiti paznju na pravljenje Ingredientsa!
