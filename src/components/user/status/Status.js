import React from "react";
import "./status.css";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
function Status() {
  return (
    <div className="status">
      <CheckCircleIcon />
      <h1>Great!🎊</h1>
      <p>Your order hasbeen proceed 🎉</p>
    </div>
  );
}

export default Status;
