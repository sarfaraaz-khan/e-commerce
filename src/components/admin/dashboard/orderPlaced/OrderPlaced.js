import React, { useEffect, useState } from "react";
import axios from "axios";
function OrderPlaced() {
  const [data, setData] = useState([]);
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const response = await axios.get("http://localhost:3000/purchasedProducts");
    const data = await response.data;
    setData(data, "data");
  };

  return (
    <div>
      <h2>Order List</h2>
      <table>
        <tr>
          <th>Id</th>
          <th>Products</th>
          <th>Payment</th>
          <th>Date</th>
        </tr>

        {data?.map((item) => {
          return (
            <tr>
              <td>{item.id}</td>
              <td id="proTd">
                <img src={item.image} />
                {item.title}
              </td>
              <td>{"Done"}</td>
              <td id="quantityItem">{item.date}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}

export default OrderPlaced;
