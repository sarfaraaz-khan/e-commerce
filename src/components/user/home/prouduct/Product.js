import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Rating } from "react-simple-star-rating";
import moment from "moment";
import "./product.css";
function Product() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [date, setDate] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await axios.get(`http://localhost:3000/product/${id}`);
    const data = await response.data;
    setData(data);
    setDate(moment(new Date()).format("DD/MM/YYYY"));
  };
  const addProductToCart = async (e) => {
    e.preventDefault();
    let postdata = {
      id: `${data.id}`,
      title: `${data.title}`,
      price: `${data.price}`,
      description: `${data.description}`,
      category: `${data.category}`,
      image: `${data.image}`,
      rating: `${data.rating}`,
      date: `${date}`,
    };
    const response = await axios.post(
      "http://localhost:3000/userCart",
      postdata
    );
    navigate(`/usercart/${data.id}`);

    console.log(response, "response");
  };

  return (
    <div className="productCard">
      <div className="productImageCont">
        <img src={data.image} />
      </div>
      <div className="productDetailCont">
        <h1>{data.title}</h1>

        <h4>Price: ${data.price}</h4>
        <h3>
          <Rating size={"1.3rem"} initialValue={4} />
        </h3>
        <p>{data.description}</p>
        <div>
          <Link to={`/usercart/${data.id}`}>
            <button id="addToCart" onClick={addProductToCart}>
              Add to Cart
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Product;
