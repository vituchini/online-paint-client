import React, { useEffect, useRef, useState } from "react";
import "../styles/canvas.scss";
import { observer } from "mobx-react-lite";
import canvasState from "../store/canvasState";
import toolState from "../store/toolState";
import Brush from "../tools/Brush";
import { Button, Modal } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Rect from "../tools/Rect";

const Canvas = observer(() => {
  const canvasRef = useRef();
  const [modalIsVisible, setModalIsVisible] = useState(true);
  const params = useParams();

  useEffect(() => {
    canvasState.setCanvas(canvasRef.current);
  }, []);

  useEffect(() => {
    if (canvasState.username) {
      const socket = new WebSocket(`ws://localhost:5000/`);
      canvasState.setSocket(socket);
      canvasState.setSessionId(params.id);
      toolState.setTool(new Brush(canvasRef.current, socket, params.id));
      socket.onopen = () => {
        socket.send(
          JSON.stringify({
            method: "connection",
            id: params.id,
            username: canvasState.username,
          })
        );
      };
      socket.onmessage = (event) => {
        let msg = JSON.parse(event.data);
        switch (msg.method) {
          case "connection": {
            console.log(`User with name ${msg.username} connected`);
            break;
          }
          case "draw": {
            drawHandler(msg);
            break;
          }
        }
        console.log("event", msg);
      };
    }
  }, [canvasState.username]);

  const drawHandler = (msg) => {
    const figure = msg.figure;
    const ctx = canvasState.canvas.getContext("2d");
    switch (figure.type) {
      case "brush": {
        Brush.draw(ctx, figure.x, figure.y);
        break;
      }
      case "rect": {
        Rect.draw(
          ctx,
          figure.x,
          figure.y,
          figure.width,
          figure.height,
          figure.strokeColor,
          figure.fillColor
        );
        break;
      }
      case "finish": {
        ctx.beginPath();
        break;
      }
    }
  };

  const mouseDownHandler = (e) => {
    canvasState.pushToUndo();
  };

  function connectHandler() {
    setModalIsVisible(false);
  }

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
      <Modal
        show={modalIsVisible}
        onHide={() => {}}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>Type Smth PLZ</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Your UserName{" "}
          <input
            type={"text"}
            value={canvasState.username}
            onChange={(e) => canvasState.setUsername(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => connectHandler()}>
            Login
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
});

export default Canvas;
