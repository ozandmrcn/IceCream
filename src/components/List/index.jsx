import React, { useEffect, useState } from "react";
import api from "../../utils/api";
import Loader from "./../Loader";
import Error from "./../Error";
import Card from "../Card";

const List = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    setIsLoading(true);

    api
      .get("/ice-creams")
      .then((res) => setData(res.data))
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="my-[30px]">
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Error info={error} />
      ) : (
        data && (
          <div className="grid mt-[30px] gap-[15px] lg:gap-[30px] lg:grid-cols-2">
            {data.map((item) => (
              <Card key={item.id} item={item} />
            ))}
          </div>
        )
      )}
    </div>
  );
};

export default List;
