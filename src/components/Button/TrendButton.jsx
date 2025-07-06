import React from "react";

const TrendButton = () => {
  return (
    <div className="flex justify-end">
      <button className="list-btn">
        Trends
        <img
          src="fire.png"
          alt="trends"
          className="w-12 absolute right-1 bottom-0"
        />
      </button>
    </div>
  );
};

export default TrendButton;
