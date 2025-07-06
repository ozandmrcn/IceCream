import React from "react";
import AmountPicker from "./AmountPicker";

const CartItem = ({ item }) => {
  console.log(item);
  return (
    <div className="flex justify-between items-center py-5 border-b border-gray-400">
      <div className="flex gap-1 items-center">
        <img src={item.image} className="w-[60px] sm:w-[80px] md:w-[100px]" />

        <div>
          <h1 className="sm:text-lg md:text-xl text-base font-semibold">
            {item.name}
          </h1>

          <p>{item.type === "cup" ? "In Cup" : "In Cone"}</p>
        </div>
      </div>

      <div className="xs:flex-row xs:gap-3 xs:items-center xs:mt-0 flex flex-col gap-2 items-end mt-2">
        <AmountPicker item={item} />
        <p className="text-base sm:text-lg md:text-xl text-end min-w-[56px] sm:min-w-[70px] font-semibold text-gray-500">
          {item.price * item.amount}$
        </p>
      </div>
    </div>
  );
};

export default CartItem;
