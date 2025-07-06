import React from "react";

const Error = ({ info }) => {
  return (
    <div data-testid="error" className="my-40 text-center">
      <p>We are sorry, an error acquired:</p>

      <p className="my-10">{info}</p>
    </div>
  );
};

export default Error;
