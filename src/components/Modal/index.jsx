import React from "react";
import { IoClose } from "react-icons/io5";
import { useSelector } from "react-redux";
import CartItem from "./CartItem";
import CartInfo from "./CartInfo";

const Modal = ({ isOpen, close }) => {
  const { cart } = useSelector((store) => store.cart);

  return (
    isOpen && (
      <div
        data-testid="modal"
        className="bg-black/30 fixed inset-0 backdrop-blur-sm grid place-items-center z-[99999]"
      >
        <div className="bg-white p-5 rounded-lg w-[90%] md:max-w-[600px] text-black">
          <div className="max-md:text-lg fs-5 flex justify-between pb-3 border-b border-gray-400">
            <h1 className="font-semibold">Order</h1>

            <button
              onClick={close}
              data-testid="close"
              className="hover:bg-gray-300/50 p-2 rounded-md border border-gray-400 transition"
            >
              <IoClose />
            </button>
          </div>

          {/*Products from Cart */}
          <div className="py-5">
            {cart.length === 0 ? (
              <p className="text-lg font-semibold text-center text-gray-600">
                There is no products added to cart
              </p>
            ) : (
              cart.map((item) => <CartItem key={item.id} item={item} />)
            )}
          </div>

          {/*Total Price */}
          <CartInfo cart={cart} close={close} />
          <div></div>
        </div>
      </div>
    )
  );
};

export default Modal;
