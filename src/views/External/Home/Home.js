import React from "react";

import Header from "views/External/Header";
import Footer from "views/External/Footer";

import Hero from "./Hero/Hero";
import Features from "./Features/Features";
import Team from "./Team/Team";
import Pricing from "./Pricing/Pricing";
import Contact from "./Contact/Contact";

function Home() {
  return (
    <div>
      <Header />
      <Hero />
      <Features />
      <Team />
      <Pricing />
      <Contact />
      <Footer />
    </div>
  );
}

export default Home;
