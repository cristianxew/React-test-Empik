import React, { useState, useEffect } from "react";
import PlusIcon from "../Icons/PlusIcon";
import MinusIcon from "../Icons/MinusIcon";
import useDebounce from "../Hooks/useDebounce";
import "./ProductQuantity.css";

const ProductQuantity = ({
  price,
  min,
  max,
  isBlocked,
  pid,
  addToTotal,
  subtractFromTotal,
}) => {
  const [productQuantity, setProductQuantity] = useState(1);
  const [error, setError] = useState("");

  const debouncedProductQuantity = useDebounce(productQuantity, 500);

  const checkQuantity = async (quantity) => {
    const rootUrl = window.location.href;
    const settings = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pid: pid,
        quantity: quantity,
      }),
    };
    try {
      const fetchResponse = await fetch(
        `${rootUrl}api/product/check`,
        settings
      );
      const data = await fetchResponse.json();
      if (data.isError) {
        setProductQuantity(min);
        subtractFromTotal(parseFloat(price) * (productQuantity - 1));
        setError(`Dostępnych jest tylko ${max} produktów`);
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (productQuantity > 1) {
      checkQuantity(debouncedProductQuantity);
    }
  }, [debouncedProductQuantity]);

  const handleAddOne = () => {
    setError("");
    setProductQuantity(productQuantity + 1);
    addToTotal(parseFloat(price));
  };

  const handleRemoveOne = () => {
    setError("");
    if (productQuantity > min) {
      setProductQuantity(productQuantity - 1);
      subtractFromTotal(parseFloat(price));
    }
  };

  return (
    <div className="product-quantity">
      <p>
        Obecnie masz <strong>{productQuantity}</strong> sztuk produktu
      </p>
      <div className="product-quantity__buttons">
        <button
          onClick={isBlocked ? null : handleRemoveOne}
          className={`btn ${isBlocked ? "btn-disabled" : ""}`}
        >
          <MinusIcon />
        </button>
        <button
          onClick={isBlocked ? null : handleAddOne}
          className={`btn ${isBlocked ? "btn-disabled" : ""}`}
        >
          <PlusIcon />
        </button>
      </div>
      {error !== "" && <span className="product-quantity__error">{error}</span>}
    </div>
  );
};

export default ProductQuantity;
