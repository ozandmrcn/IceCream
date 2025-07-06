import React from "react";

const Selector = ({ selectedType, handleType }) => {
  return (
    <div>
      <p>Order Type</p>

      <div className="flex gap-5 mt-3">
        <button
          onClick={() => handleType("cornet")}
          className={`select-btn ${
            selectedType === "cornet" && "bg-white text-black"
          }`}
        >
          Cornet
        </button>
        <button
          onClick={() => handleType("cup")}
          className={`select-btn ${
            selectedType === "cup" && "bg-white text-black"
          }`}
        >
          Cup
        </button>
      </div>
    </div>
  );
};

export default Selector;
