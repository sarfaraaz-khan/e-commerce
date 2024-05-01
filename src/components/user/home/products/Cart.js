import React, { useEffect, useState } from "react";
import axios from "axios";
import "./cart.css";
import { Link } from "react-router-dom";

function Cart({ query }) {
  const [data, setData] = useState([]);
  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    searchHandler();
  }, [query]);
  const getData = async () => {
    const response = await axios.get("http://localhost:3000/product");
    const data = await response.data;
    setData(data);
  };

  const searchHandler = async () => {
    const response = await axios.get(
      `http://localhost:3000/product?q=${query}`
    );
    const data = await response.data;
    setData(data);
  };
  return (
    <>
      {data.map((product) => {
        return (
          <Link to={`/product/${product.id}`}>
            <div className="card">
              <div className="cardHead">
                <img src={product.image} />
              </div>
              <div className="cardBody">
                <h3>{product.title}</h3>
                <span>Price: ${product.price}</span>
              </div>
            </div>
          </Link>
        );
      })}
    </>
  );
}

export default Cart;
