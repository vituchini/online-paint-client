import React from "react";
import "../styles/toolbar.scss";
import toolState from "../store/toolState";

const SettingBar = () => {
  return (
    <div className={"setting-bar"}>
      <label htmlFor="line-width" style={{ margin: "0 10px" }}>
        Line Width
      </label>
      <input
        onChange={(e) => toolState.setLineWidth(e.target.value)}
        style={{ margin: "0 10px" }}
        id={"line-width"}
        type="number"
        defaultValue={1}
        min={1}
        max={50}
      />
      <label htmlFor="stroke-color" style={{ margin: "0 10px" }}>
        Stroke color
      </label>
      <input
        id={"stroke-color"}
        type="color"
        onChange={(e) => toolState.setStrokeColor(e.target.value)}
        value={toolState.strokeColor}
      />
    </div>
  );
};

export default SettingBar;
