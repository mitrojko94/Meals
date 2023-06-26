import React from "react";
import { Form, redirect, useNavigation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const newsletterUrl = "https://www.course-api.com/cocktails-newsletter";

export const action = async ({ request }) => {
  // console.log(request);
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  // console.log(data);

  try {
    const response = await axios.post(newsletterUrl, data);
    // console.log(response);
    toast.success(response.data.msg);
    return redirect("/");
  } catch (error) {
    // console.log(error);
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const Newsletter = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <Form className="form" method="POST">
      <h4 style={{ textAlign: "center", marginBottom: "2rem" }}>
        Our Newsletter
      </h4>
      {/* name */}
      <div className="form-row">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          type="text"
          className="form-input"
          id="name"
          name="name"
          required
        />
      </div>
      {/* lastName */}
      <div className="form-row">
        <label htmlFor="lastName" className="form-label">
          Last Name
        </label>
        <input
          type="text"
          className="form-input"
          id="lastName"
          name="lastName"
          required
        />
      </div>
      {/* email */}
      <div className="form-row">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          type="text"
          className="form-input"
          id="email"
          name="email"
          defaultValue="test@test.com"
          required
        />
      </div>
      <button
        type="submit"
        className="btn btn-block"
        style={{ marginTop: "0.5rem" }}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting" : "Submit"}
      </button>
    </Form>
  );
};

export default Newsletter;

// Objasnjenje:
// Kad dobijam podatke sa nekog API-ja, uvek moram imati atribut u inputu name, jer mi je on bitan za podatke
// Napravio sam klasicne labele i inpute za formu
// Ako submitujem formu, bez metode, ti podaci ce biti dodati na istu URL adresu, kao query string, a ako stavim action atribut to mi govori gde ce da smesti te podatke
// Kad saljem POST zahtev, dolazi do greske, jer ne mogu da saljem podatke na istu URL adresu. Resenje je da se stavi atribut action, ali radicu neko drugo resenje
// U loaderu rukujemo sa podacima pre nego sto se stranica ucita, a u action rukujem sa form submission
// action f-ja takodje mora da vrati nesto, kao loader f-ja
// Da bih dobio prave podatke, moram da pristupim formData polju, koji vraca niz, a ja moram da ga prebacim u objekat. To radim tako so pozivam Object.fromEntries i prosledim kao parametar formData koji je varijabla koja sadrzi formData polje
// U f-ji action sam stavio request kao objekat, a to je data objekat, koji u sebi ima params i request i ja sam izvukao sta mi treba
// Kad koristim POST metodu, prvi parametar je putanja, a drugi podaci koje saljem ka serveru. Redirect mi upucuje korisnika na stranicu koju sam definisao kao parametar, i uvek se koristi unutar action ili loader f-je
// Kad koristim try/catch blok unutar react-router-doma, moram da imam return i u try i u catch bloku
// Koristim useNavigation da proverim koji mi je state i ako je state jednak submitting, onda stavljam razlicit tekst za dugme submit
