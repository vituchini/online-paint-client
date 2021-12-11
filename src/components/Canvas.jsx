import React, { useEffect, useRef } from "react";
import "../styles/canvas.scss";
import { observer } from "mobx-react-lite";
import canvasState from "../store/canvasState";
import toolState from "../store/toolState";
import Brush from "../tools/Brush";

const Canvas = observer(() => {
  const canvasRef = useRef();

  useEffect(() => {
    canvasState.setCanvas(canvasRef.current);
    toolState.setTool(new Brush(canvasRef.current));
  }, []);

  const mouseDownHandler = (e) => {
    canvasState.pushToUndo();
  };

  return (
    <div className={"canvas"}>
      <canvas
        onMouseDown={() => {
          mouseDownHandler();
        }}
        ref={canvasRef}
        width={700}
        height={600}
      />
    </div>
  );
});

export default Canvas;
