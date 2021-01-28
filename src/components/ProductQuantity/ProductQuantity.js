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

  //Using custom hook to debounce the value of ProductQuantity
  const debouncedProductQuantity = useDebounce(productQuantity, 500);

  //Asking to the endpoint api/product/check if the quantity is valid
  const checkQuantity = async (quantity, id) => {
    //getting the root url dynamically
    const rootUrl = window.location.href;
    const settings = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pid: id,
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
        //if there is an error set the PoductQuantity to min and reset the total value to how it was before
        setProductQuantity(min);
        subtractFromTotal(parseFloat(price) * (productQuantity - 1));
        //Show error to client
        setError(`Dostępnych jest tylko ${max} produktów`);
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  //Fire the checkQuantity function after each time ProductQuantity change but with a debounce of 500 milliseconds
  useEffect(() => {
    if (productQuantity > 1) {
      checkQuantity(debouncedProductQuantity, pid);
    }
  }, [debouncedProductQuantity]);

  //handler for onClick plus button
  const handleAddOne = () => {
    setError("");
    setProductQuantity(productQuantity + 1);
    addToTotal(parseFloat(price));
  };

  //handler for onClick minus button
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
        {/* if isBlocked onClick function will be null and button disabled */}
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
      {/* Show error to client if there is one */}
      {error !== "" && <span className="product-quantity__error">{error}</span>}
    </div>
  );
};

export default ProductQuantity;
