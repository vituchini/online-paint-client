import Tool from "./Tool";
import canvasState from "../store/canvasState";

export default class Brush extends Tool {
  constructor(canvas) {
    super(canvas);
    this.listen();
  }

  listen() {
    this.canvas.onmouseup = this.mouseUpHandler.bind(this);
    this.canvas.onmousedown = this.mouseDownHandler.bind(this);
    this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
  }

  mouseUpHandler(e) {
    this.mouseDown = false;
    this.socket.send(
      JSON.stringify({
        method: "draw",
        id: this.id,
        figure: {
          type: "finish",
        },
      })
    );
  }
  mouseDownHandler(e) {
    this.mouseDown = true;
    this.ctx.beginPath();
    this.ctx.moveTo(
      e.pageX - e.target.offsetLeft - 2,
      e.pageY - e.target.offsetTop - 3
    );
  }
  mouseMoveHandler(e) {
    if (this.mouseDown) {
      // this.draw(
      //   e.pageX - e.target.offsetLeft - 2,
      //   e.pageY - e.target.offsetTop - 3
      // );
      this.socket.send(
        JSON.stringify({
          method: "draw",
          id: this.id,
          figure: {
            type: "brush",
            x: e.pageX - e.target.offsetLeft - 2,
            y: e.pageY - e.target.offsetTop - 3,
          },
        })
      );
    }
  }
  static draw(ctx, x, y) {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}
