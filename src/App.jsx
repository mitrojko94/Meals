import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  About,
  HomeLayout,
  Landing,
  Cocktail,
  Error,
  Newsletter,
  SinglePageError,
} from "./pages";
import { loader as landingLoader } from "./pages/Landing";
import { loader as singleCocktailLoader } from "./pages/Cocktail";
import { action as newsletterAction } from "./pages/Newsletter";

// React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
        errorElement: <SinglePageError />,
        loader: landingLoader(queryClient),
      },
      {
        path: "cocktail/:id",
        errorElement: <SinglePageError />,
        loader: singleCocktailLoader(queryClient),
        element: <Cocktail />,
      },
      {
        path: "newsletter",
        element: <Newsletter />,
        action: newsletterAction,
      },
      {
        path: "about",
        element: <About />,
        children: [
          {
            path: "company",
            element: <h2>Our Company</h2>,
          },
          {
            path: "person",
            element: <h2>John Doe</h2>,
          },
        ],
      },
    ],
  },
]);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
export default App;

// Objasnjenje:
// Koristim createBrowserRouter da napravim rute koje hocu i stavim u return, u f-ju App da mi vraca RouterProvider koji ima props provider, koji se odnosi na ime varijable koja sadrzi putanje tj. createBrowserRouter
// Napravim stranice koje mi trebaju, u folderu pages i napravim fajl index.js i tu stavim sve stranice koje hocu da koristim u ostalim komponentama i samo ih importujem u koje komponente zelim
// Sve stranice koje ugnjezdim su relativne, tako da se putanja nastavlja na roditeljsku putanju, zato mi ne treba / kod about putanje
// Da bih mogao da vidim sadrzaj svih ugnjezdenih ruta, moram da u element glavne rute stavim Outlet komponentu, jer ce ona da mi prikaze sadrzaj ugnjezdenih ruta
// Uvek moram da imam index na nekoj rutu, jer ce to da mi bude ruta kad ucitam main stranicu. Ako to nemam, onda cu uvek da imam na main stranici ono sto mi se nalazi iznad Outlet komponentu, u fajlu u kom je definisan Outlet
// Error element mogu da stavim u svaku stranicu tj. putanju, ali je bolje staviti u roditelja i onda ce ta deca da imaju
// Koristim loader, koji mi omogucava da dobijem podatke pre nego sto se ucitaju. Na taj nacin izbegavam upotrebu useEffect Hooka
// Mogu da ovde direktno u nekom elementu pisem loader: ime varijable koja sadrzi loader kod, koji je napravljen u nekoj stranici, a mogu i ovde da pisem direktno kod, to zavisi od mene
// Kad pravim loader, on uvek nesto mora da vrati, uvek, nebitno da li je to string, podaci sa mreze i slicno
// Error kog imam u roditelju je global error page, a mogu da napravim i SinglePageError gde cu to da pozovem u putanji tj. elementu u kom hocu
// Stavio sam u pitanju za cocktail, da ima neki parametar, a to je /:id, a to znaci da mogu da primam id, kad ga stavim, da ide na tu stranicu
// Posebnu paznju obratiti na React Query!
// U loaderu ne mogu da koristim Hooks
// Ako hocu da izbacim projekat na Netlify, u public folderu napravim fajl _redirect sa tekstom /* /index.html 200
