import React from "react";
import Hero from "../../components/Hero";
import TrendButton from "../../components/Button/TrendButton";
import CartButton from "../../components/Button/CartButton";
import List from "../../components/List";

const Home = () => {
  return (
    <div>
      <Hero />

      <CartButton />

      <TrendButton />

      <List />
    </div>
  );
};

export default Home;
