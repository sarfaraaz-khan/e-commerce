import React, { useState } from "react";
import "./home.css";
import Cart from "./products/Cart";
import SearchIcon from "@mui/icons-material/Search";
function Home() {
  const [query, setQuery] = useState("");

  return (
    <div>
      <div className="bannerContainer"></div>
      <div className="searchContainer">
        <input
          type="text"
          id="search"
          onChange={(e) => setQuery(e.target.value)}
        />
        <SearchIcon />
      </div>

      <div className="cartContainer">
        <Cart query={query} />
      </div>
    </div>
  );
}

export default Home;
