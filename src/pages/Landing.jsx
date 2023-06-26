import axios from "axios";
import React from "react";
import { useLoaderData } from "react-router-dom";
import CocktailList from "../components/CocktailList";
import SearchFrom from "../components/SearchForm";
import { useQuery } from "@tanstack/react-query";

const cocktailSearchUrl =
  "https://www.themealdb.com/api/json/v1/1/search.php?s=";

const searchCocktailsQuery = (searchTerm) => {
  return {
    queryKey: ["search", searchTerm || "all"],
    queryFn: async () => {
      const response = await axios.get(`${cocktailSearchUrl}${searchTerm}`);
      return response.data.meals;
    },
  };
};

export const loader =
  (queryClient) =>
  async ({ request }) => {
    // console.log(request);
    const url = new URL(request.url);

    const searchTerm = url.searchParams.get("search") || "";
    await queryClient.ensureQueryData(searchCocktailsQuery(searchTerm));

    // const response = await axios.get(`${cocktailSearchUrl}${searchTerm}`);
    // console.log(response);

    // return { meals: response.data.meals, searchTerm };
    return { searchTerm };
  };

const Landing = () => {
  const { searchTerm } = useLoaderData();
  // console.log(meals);
  const { data: meals } = useQuery(searchCocktailsQuery(searchTerm));

  return (
    <>
      <SearchFrom searchTerm={searchTerm} />
      <CocktailList meals={meals} />
    </>
  );
};

export default Landing;

// loader f-ja uvek mora nesto da vrati, nebitno sta
// U samoj komponenti koristim useLoaderData da dobijem podatke, pre nego sto se stranica ucita
// Koristim biblioteku axios da dobijem podatke i izvucem iz nje sta mi treba, a to je niz meals sa svom hranom i searchTerm zbog React Query-ja mi to treba
// Iz useLoaderData takodje izvlacim sta mi treba, razbijam taj objekat na potrebna polja
// Ako stavim u searchTerm neko nepostojece ime nece biti greske, jer ce se to smatrati kao null. Jedino gresku ce da izazove tipa ako je server ugasen, tipa omasena je URL adresa i slicno
// Pravim novu URL adresu tako sto pristupim url polju request objekta i onda u searchTerm trazim preko searchParams.get ime koje sam stavio za name u Formu, za input polje. Ako ima, to mi vrati, a ako nema, vrati "" tj. sve vrati
