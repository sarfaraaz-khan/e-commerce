import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CancelIcon from "@mui/icons-material/Cancel";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import "./userCart.css";
import axios from "axios";

function UserCart() {
  const [userCartData, setUserCartData] = useState();
  const [total, setTotal] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    getUserCart();
  }, []);
  const handleItemRemove = async (id) => {
    const response = axios.delete(`http://localhost:3000/userCart/${id}`);
  };
  const getUserCart = async () => {
    const response = await axios.get("http://localhost:3000/userCart");
    const data = response.data;
    setUserCartData(data);

    setTotal(
      data.reduce((accumulator, currentItem) => {
        const itemPrice = parseFloat(currentItem.price);
        return accumulator + itemPrice;
      }, 0)
    );
  };

  const handlePay = async (e) => {
    e.preventDefault();

    const response = await axios.get("http://localhost:3000/userCart");
    const data = response.data;

    if (data && data.length > 0) {
      const responsePost = await axios.post(
        "http://localhost:3000/purchasedProducts",
        JSON.stringify(userCartData)
      );
      if (responsePost.status === 201) {
        navigate(`/status/${1}`);
      }
    } else {
      console.error("No data available to post");
    }
  };

  return (
    <div className="userCart">
      <div className="cart">
        <h2>Your cart</h2>
        <table className="userCartTable">
          <tr>
            <th>Products</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Sub-Total</th>
          </tr>

          {userCartData?.map((item) => {
            return (
              <tr>
                <td id="proTd">
                  <CancelIcon onClick={() => handleItemRemove(item.id)} />
                  <img src={item.image} />
                  {item.title}
                </td>
                <td>Price: ${item.price}</td>
                <td id="quantityItem">{1}</td>
                <td>${item.price * 1}.0.0</td>
              </tr>
            );
          })}
        </table>
        <div id="returnBtn">
          <Link to="/home">
            <button>
              <KeyboardBackspaceIcon />
              Return to Shop
            </button>
          </Link>
        </div>
      </div>
      <div className="bill">
        <div className="cardTotals">
          <h3>Card Totals</h3>
          <div id="subTotal">
            <span>Sub-total</span>
            <span>${total}</span>
          </div>

          <div id="subTotal">
            <span>Tax</span>
            <span>${20}</span>
          </div>
          <div className="mainTotal">
            <span>Total</span>
            <span>${total + 20}</span>
          </div>
        </div>
        <div className="couponCode">
          <h2>Lets Make Payment</h2>
          <form>
            <label form="nameOnCard">Name on card</label>
            <input type="text" placeholder="Enter Name" />
            <label form="nameOnCard">Card number</label>
            <input type="text" placeholder="Enter Card No" />
            <div className="cardDetailsCont">
              <div>
                <label>Expirataion</label>
                <input type="text" id="expiry" placeholder="mm/yy" />
              </div>
              <div>
                <label>CVC</label>
                <input type="text" placeholder="CVC" />
              </div>
            </div>

            <button onClick={handlePay}>Pay</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UserCart;
