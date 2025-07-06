import React from "react";
import { useDispatch } from "react-redux";
import { addToCart, deleteFromCart } from "../../redux/slices/cartSlice";
import { BiMinus, BiPlus } from "react-icons/bi";

const AmountPicker = ({ item }) => {
  const dispatch = useDispatch();

  return (
    <div className="w-fit sm:gap-3 sm:px-3 sm:py-2 flex gap-2 items-center px-2 py-1 bg-white rounded-xl border border-gray-200 shadow-sm">
      <button
        data-testid="minusBtn"
        onClick={() =>
          dispatch(deleteFromCart({ item, selectedType: item.type }))
        }
        className="hover:bg-gray-200 sm:w-10 sm:h-10 sm:text-xl flex justify-center items-center w-8 h-8 text-lg font-bold text-black bg-gray-100 rounded-full border border-gray-300 shadow transition"
        style={{ lineHeight: 1 }}
      >
        <BiMinus />
      </button>
      <span className="min-w-8 px-3 py-1 sm:px-4 sm:py-1.5 text-base sm:text-lg font-semibold text-center text-gray-800 bg-gray-50 rounded-md border border-gray-200 shadow-inner">
        {item.amount}
      </span>
      <button
        data-testid="plusBtn"
        onClick={() => dispatch(addToCart({ item, selectedType: item.type }))}
        className="hover:bg-gray-200 sm:w-10 sm:h-10 sm:text-xl flex justify-center items-center w-8 h-8 text-lg font-bold text-black bg-gray-100 rounded-full border border-gray-300 shadow transition"
        style={{ lineHeight: 1 }}
      >
        <BiPlus />
      </button>
    </div>
  );
};

export default AmountPicker;
