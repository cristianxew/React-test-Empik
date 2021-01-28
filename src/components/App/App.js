import React, { useEffect, useState } from "react";
import CartItem from "../CartItem/CartItem";
import "./App.css";

const App = () => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);

  //This functions will handle adding and subtracting from the total value and will be passed down to the ProductQuantity component as a props
  const addToTotal = (value) => {
    setTotal(parseFloat(total) + value);
  };
  const subtractFromTotal = (value) => {
    setTotal(parseFloat(total) - value);
  };

  const url = window.location.href;

  //after component mount fetch products from /api/cart and set product's state
  useEffect(() => {
    fetch(`${url}api/cart`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);

        //setting up the total value for the initial list of products
        const total = data.reduce(
          (accum, item) => accum + parseFloat(item.price),
          0
        );
        setTotal(total);
      });
  }, []);

  return (
    <div className="container">
      <h1>Lista produktów</h1>
      <ul className="cart-list">
        {products &&
          products.map((product) => {
            return (
              <CartItem
                key={product.pid}
                addToTotal={addToTotal}
                subtractFromTotal={subtractFromTotal}
                product={product}
              />
            );
          })}
      </ul>
      <h2 className="total">{`Total: ${total.toFixed(2)}zł`}</h2>
    </div>
  );
};

export { App };
