import React from "react";
import "./dashboard.css";
import ProductsTable from "./produtcs/ProductsTable";
import OrderPlaced from "./orderPlaced/OrderPlaced";

function Dashboard() {
  return (
    <div className="dashBoard">
      <div className="tablesContainer">
        <ProductsTable />
        <OrderPlaced />
      </div>
    </div>
  );
}

export default Dashboard;
