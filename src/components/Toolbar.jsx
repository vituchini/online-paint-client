import React from "react";
import "../styles/toolbar.scss";
import toolState from "../store/toolState";
import Brush from "../tools/Brush";
import Rect from "../tools/Rect";
import canvasState from "../store/canvasState";
import Circle from "../tools/Circle";
import Line from "../tools/Line";
import { observer } from "mobx-react-lite";
import Erase from "../tools/Erase";

const Toolbar = observer(() => {
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
      <button
        className={"toolbar__bnt circle"}
        onClick={() => toolState.setTool(new Circle(canvasState.canvas))}
      ></button>
      <button
        className={"toolbar__bnt line"}
        onClick={() => toolState.setTool(new Line(canvasState.canvas))}
      ></button>
      <button
        className={"toolbar__bnt eraser"}
        onClick={() => {
          toolState.setTool(new Erase(canvasState.canvas));
        }}
      ></button>
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
      <input
        onChange={(e) => {
          toolState.setFillColor(e.target.value);
        }}
        value={toolState.fillColor}
        type="color"
        style={{ marginLeft: "10px" }}
      />
      <div>{Math.random()}</div>
      <button
        className={"toolbar__bnt undo"}
        onClick={() => {
          canvasState.undo();
        }}
      ></button>
      <button
        className={"toolbar__bnt redo"}
        onClick={() => {
          canvasState.redo();
        }}
      ></button>
      <button className={"toolbar__bnt save"}></button>
    </div>
  );
});

export default Toolbar;
