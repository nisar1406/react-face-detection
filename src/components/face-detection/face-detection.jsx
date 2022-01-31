import React, { useEffect, useRef } from 'react';

import "@tensorflow/tfjs-backend-cpu";
import "@tensorflow/tfjs-backend-webgl";
import "@tensorflow/tfjs";
import * as CocoSsd from "@tensorflow-models/coco-ssd";

import Canvas from "../common/canvas";
import { drawBox } from '../../utils/draw';
import StreamVideo from '../common/stream-video/stream-video';

const FaceDetection = () => {
  const videoCanvasRef = useRef(null);

  const runCocoSsd = async () => {
    const cocoModel = await CocoSsd.load();
    console.log("Modal loaded.");
    setInterval(() => {
      getVideoPredictions(cocoModel);
    }, 10);
  };

  const getVideoPredictions = async (cocoModel) => {
    const video = document.getElementById("video");
    // video.onloadeddata = () => {
    //   console.log('loaded');
    // };
    // Gives predictions from the video.
    const predictions = await cocoModel.detect(video);

    // console.log("Predictions: ", predictions);
    videoCanvasRef.current.width = video?.videoWidth;
    videoCanvasRef.current.height = video?.videoHeight;

    // Draw
    const ctx = videoCanvasRef.current.getContext("2d");
    drawBox(predictions, ctx);
  };

  useEffect(() => {
    runCocoSsd();
  });

  return (
    <div className="tensorflow__face-detection_container">
      <h1>Face Detection</h1>
      <StreamVideo />
      <Canvas canvasRef={videoCanvasRef} />
    </div>
  );
};

export default FaceDetection;
