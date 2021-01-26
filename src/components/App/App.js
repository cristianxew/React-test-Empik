import React, { useEffect, useState } from "react";
import CartItem from "../CartItem/CartItem";
import "./App.css";

const App = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3030/api/cart")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      });
  }, []);

  return (
    <div className="container">
      <h1>Lista produktów</h1>
      <ul className="cart-list">
        {products &&
          products.map((product) => {
            return <CartItem key={product.pid} product={product} />;
          })}
      </ul>
    </div>
  );
};

export { App };
