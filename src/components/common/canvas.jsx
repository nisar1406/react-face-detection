import React from 'react';

const Canvas = ({ canvasRef }) => {
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
        width: 700,
        height: 550,
        top: 165
      }}
    />);
};

export default Canvas;
