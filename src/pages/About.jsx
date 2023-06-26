import React from "react";
import Wrapper from "../assets/wrappers/AboutPage";

const About = () => {
  return (
    <Wrapper>
      <h3>About Us</h3>
      <p>
        Introducing "MixMaster," the ultimate party sidekick app that fetches
        cocktails from the hilarious Cocktails DB API. With a flick of your
        finger, you'll unlock a treasure trove of enchanting drink recipes
        that'll make your taste buds dance and your friends jump with joy. Get
        ready to shake up your mixology game, one fantastical mocktail at a
        time, and let the laughter and giggles flow!
      </p>
    </Wrapper>
  );
};

export default About;

// Objasnjenje:
// Link komponenta sluzi samo za precivanje sa jedne komponente na drugu, ali u okviru projekta. Ako zelim da stavim neki link na neki spoljni element, koristim a tag
