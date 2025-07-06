import React from "react";
import { useDispatch } from "react-redux";
import { clearCart } from "../../redux/slices/cartSlice";
import { toast } from "react-toastify";

const CartInfo = ({ cart, close }) => {
  const dispatch = useDispatch();

  const subTotal = cart.reduce(
    (total, item) => total + item.price * item.amount,
    0
  );

  const shipping = subTotal >= 100 || subTotal === 0 ? 0 : 20;

  const total = subTotal + shipping;

  const handleClick = () => {
    close();
    dispatch(clearCart());
    toast.success("Success! We're getting your order ready for shipment.");
  };
  return (
    <div className="fs-5 py-5 text-lg">
      {shipping !== 0 && (
        <p className="flex justify-between">
          <span className="font-semibold text-gray-500">Subtotal</span>
          <span className="font-semibold text-gray-700">{`${subTotal}$`}</span>
        </p>
      )}

      {shipping !== 0 && (
        <p className="flex justify-between py-2">
          <span className="font-semibold text-gray-500">Shipping Fee</span>
          <span className="font-semibold text-gray-700">{shipping}$</span>
        </p>
      )}

      {total > 0 && (
        <p className="flex justify-between">
          <span className="font-semibold text-gray-700">Total</span>
          <span className="text-2xl font-semibold text-gray-700">{`${total}$`}</span>
        </p>
      )}

      <button
        onClick={handleClick}
        className="hover:bg-red-600 disabled:bg-red-300 p-2 mt-4 w-full text-white bg-red-500 rounded-md transition cursor-pointer"
      >
        Checkout
      </button>
    </div>
  );
};

export default CartInfo;
