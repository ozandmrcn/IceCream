import React, { useState } from "react";
import Modal from "../Modal";

const CartButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="sticky top-4 left-1 z-[999] mt-10 -mb-10 w-fit">
      <button className="list-btn" onClick={() => setIsOpen(true)}>
        Cart
        <img
          src="/cart.png"
          alt="cart"
          className="absolute bottom-0 right-1 w-12"
        />
      </button>

      <Modal isOpen={isOpen} close={() => setIsOpen(false)} />
    </div>
  );
};

export default CartButton;
