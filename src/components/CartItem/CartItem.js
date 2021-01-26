import React from "react";
import ProductQuantity from "../ProductQuantity/ProductQuantity";

const CartItem = (props) => {
  const { name, price, max, min } = props.product;

  return (
    <li className="cart-list__row">
      <div>
        {name} | <span>{`Cena: ${price}zł`}</span>
      </div>
      <ProductQuantity />
    </li>
  );
};

export default CartItem;
