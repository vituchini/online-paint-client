import React from "react";
import "../styles/toolbar.scss";
import toolState from "../store/toolState";
import Brush from "../tools/Brush";
import canvasState from "../store/canvasState";

const Toolbar = () => {
  return (
    <div className={"toolbar"}>
      <button
        className={"toolbar__bnt brush"}
        onClick={() => toolState.setTool(new Brush(canvasState.canvas))}
      ></button>
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
