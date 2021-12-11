import { makeAutoObservable } from "mobx";

class ToolState {
  tool = null;
  strokeColor = "#000000";
  fillColor = "#000000";

  constructor() {
    makeAutoObservable(this);
  }

  setTool(tool) {
    this.tool = tool;
  }

  setFillColor(color) {
    this.fillColor = color;
    this.tool.fillColor = color;
  }

  setStrokeColor(color) {
    this.strokeColor = color;
    this.tool.strokeColor = color;
  }

  setLineWidth(width) {
    this.tool.lineWidth = width;
  }
}

export default new ToolState();
