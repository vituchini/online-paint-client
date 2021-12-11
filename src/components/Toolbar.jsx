import React from "react";
import "../styles/toolbar.scss";
import toolState from "../store/toolState";
import Brush from "../tools/Brush";
import Rect from "../tools/Rect";
import canvasState from "../store/canvasState";

const Toolbar = () => {
  return (
    <div className={"toolbar"}>
      <button
        className={"toolbar__bnt brush"}
        onClick={() => toolState.setTool(new Brush(canvasState.canvas))}
      ></button>
      <button
        className={"toolbar__bnt rect"}
        onClick={() => toolState.setTool(new Rect(canvasState.canvas))}
      ></button>
      <button className={"toolbar__bnt circle"}></button>
      <button className={"toolbar__bnt eraser"}></button>
      <button
        style={{ marginLeft: "10px" }}
        onClick={() =>
          canvasState.canvas
            .getContext("2d")
            .clearRect(
              0,
              0,
              canvasState.canvas.width,
              canvasState.canvas.height
            )
        }
      >
        Clear
      </button>
      <input type="color" style={{ marginLeft: "10px" }} />
      <div>{Math.random()}</div>
      <button className={"toolbar__bnt undo"}></button>
      <button className={"toolbar__bnt redo"}></button>
      <button className={"toolbar__bnt save"}></button>
    </div>
  );
};

export default Toolbar;
