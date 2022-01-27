import React from 'react';

const Canvas = ({canvasRef}) => {
  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        marginLeft: "auto",
        marginRight: "auto",
        left: 0,
        right: 0,
        textAlign: "center",
        zindex: 8,
        width: 640,
        height: 480,
      }}
    />);
};

export default Canvas;
