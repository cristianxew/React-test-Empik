import React, { useState } from "react";
import PlusIcon from "../Icons/PlusIcon";
import MinusIcon from "../Icons/MinusIcon";
import "./ProductQuantity.css";

const ProductQuantity = () => {
  const [productQuantity, setProductQuantity] = useState(1);
  return (
    <div className="product-quantity">
      <p>
        Obecnie masz <strong>{productQuantity}</strong> sztuk produktu
      </p>
      <div className="product-quantity__icons">
        <MinusIcon />
        <PlusIcon />
      </div>
    </div>
  );
};

export default ProductQuantity;
