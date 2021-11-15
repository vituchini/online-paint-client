import React from "react";
import "../styles/toolbar.scss";

const Toolbar = () => {
  return (
    <div className={"toolbar"}>
      <button className={"toolbar__bnt brush"}></button>
      <button className={"toolbar__bnt rect"}></button>
      <button className={"toolbar__bnt circle"}></button>
      <button className={"toolbar__bnt eraser"}></button>
      <input type="color" style={{ marginLeft: "10px" }} />
      <button className={"toolbar__bnt undo"}></button>
      <button className={"toolbar__bnt redo"}></button>
      <button className={"toolbar__bnt save"}></button>
    </div>
  );
};

export default Toolbar;
