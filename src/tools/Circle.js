import Tool from "./Tool";

export default class Circle extends Tool {
  constructor(canvas) {
    super(canvas);
    this.listen();
  }

  listen() {
    this.canvas.onmouseup = this.mouseUpHandler.bind(this);
    this.canvas.onmousedown = this.mouseDownHandler.bind(this);
    this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
  }

  mouseUpHandler() {
    this.mouseDown = false;
  }
  mouseDownHandler(e) {
    this.mouseDown = true;
    this.ctx.beginPath();
    this.startX = e.pageX - e.target.offsetLeft - 2;
    this.startY = e.pageY - e.target.offsetTop - 3;
    this.saved = this.canvas.toDataURL();
  }
  mouseMoveHandler(e) {
    if (this.mouseDown) {
      let currentX = e.pageX - (e.target.offsetLeft + 2);
      let currentY = e.pageY - (e.target.offsetTop + 3);
      let a = currentX - this.startX;
      let b = currentY - this.startY;
      const radius = Math.sqrt(a * a + b * b);
      this.draw(this.startX, this.startY, radius);
    }
  }
  draw(x, y, r) {
    const img = new Image();
    img.src = this.saved;
    img.onload = () => {
      console.log("onload");
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
      this.ctx.beginPath();
      this.ctx.arc(x, y, r, 0, 2 * Math.PI);
      this.ctx.fill();
      this.ctx.stroke();
    };
  }
}
