import React, { useState } from "react";
import Selector from "./Selector";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/slices/cartSlice";

const Card = ({ item }) => {
  const dispatch = useDispatch();

  const [selectedType, setSelectedType] = useState(null);

  const handleType = (type) => {
    setSelectedType(type === selectedType ? null : type);
  };

  const handleBasket = (item) => {
    // Send to store
    dispatch(addToCart({ item, selectedType }));

    // Clear selection
    setSelectedType(null);
  };

  return (
    <div className="p-10 border bg-black/20 border-white/50 rounded-[24px] pl-[10px] pr-[20px] py-[30px] gap-[15px] flex lg:gap-[30px]">
      <div className="flex items-center">
        <img
          src={item.image}
          alt={item.name}
          className="w-[100px] md:w-[150px] drop-shadow-2xl"
        />
      </div>

      <div className="flex-1">
        <h1 className="text-[24px] font-medium">{item.name}</h1>
        <Selector selectedType={selectedType} handleType={handleType} />

        <div className="flex justify-between mt-5">
          <p>{item.price}$ per scoop</p>

          <button
            onClick={() => handleBasket(item, selectedType)}
            className={`hover:bg-white/30 px-3 py-1 rounded-md border border-gray-400 transition ${
              !selectedType && "invisible"
            }`}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
