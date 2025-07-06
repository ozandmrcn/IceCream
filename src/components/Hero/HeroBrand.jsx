import React from "react";

const HeroBrand = () => {
  return (
    <div className="max-w-[660px] flex flex-col gap-[25px]">
      <h1 className="fs-1 font-semibold">Black Mulberry Ice Cream</h1>

      <p>
        Black Mulberry Ice Cream offers a unique dessert experience inspired by
        nature's freshest flavors. Carefully selected black mulberries create a
        refreshing sensation in every bite with their rich and invigorating
        aroma.
      </p>

      <div className="flex gap-[40px]">
        <button className="hero-btn">Order</button>
        <button className="hero-btn bg-white/15 border-0">Reservation</button>
      </div>
    </div>
  );
};

export default HeroBrand;
