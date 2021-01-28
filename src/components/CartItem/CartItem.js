import React from "react";
import ProductQuantity from "../ProductQuantity/ProductQuantity";

const CartItem = (props) => {
  const { product } = props;
  const { name, price } = product;

  return (
    <li className="cart-list__row">
      <div className="cart-list__row__product-desc">
        {name} | <span>{`Cena: ${price}zł`}</span>
      </div>
      <ProductQuantity
        subtractFromTotal={props.subtractFromTotal}
        addToTotal={props.addToTotal}
        {...product}
      />
    </li>
  );
};

export default CartItem;
