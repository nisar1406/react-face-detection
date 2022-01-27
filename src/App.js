import React, { useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";

import "@tensorflow/tfjs-backend-cpu";
import "@tensorflow/tfjs-backend-webgl";
import "@tensorflow/tfjs";
import * as cocoSsd from "@tensorflow-models/coco-ssd";

import "./App.css";
import { draw } from "./draw";
import Canvas from "./canvas";

const App = () => {
  //const [uploadedImage, setUploadedImage] = useState();

  const videoCanvasRef = useRef(null);
  //const imageCanvasRef = useRef(null);

  const setupCamera = () => {
    const video = document.getElementById("video");
    navigator.mediaDevices
      .getUserMedia({
        video: { width: 700, height: 550 },
        audio: false,
      })
      .then((stream) => {
        video.srcObject = stream;
      })
      .catch(() => {
        alert("Please enable your camera");
      });
  };

  const runCocoSsd = async () => {
    const cocoModel = await cocoSsd.load();
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
    draw(predictions, ctx);
  };

  useEffect(() => {
    runCocoSsd();
    setupCamera();
  });

  // useEffect(() => {
  //   if(uploadedImage) getImagePredictions(imageCanvasRef);
  // }, [uploadedImage]);

  // const getImagePredictions = async (canvasRef) => {
  //   const image = document.getElementById("image");

  //   const model = await mobileNet.load();

  //   // Classify the image.
  //   const predictions = await model.classify(image);

  //   console.log("Predictions: ", predictions);
  //   canvasRef.current.width = 600;
  //   canvasRef.current.height = 600;

  //   // Draw
  //   const ctx = canvasRef.current.getContext("2d");
  //   draw(predictions, ctx);
  // }


  // const onDrop = useCallback((acceptedFiles) => {
  //   const newImage = {};
  //   acceptedFiles.forEach((file) => {
  //     Object.assign(newImage, {
  //       imagePath: URL.createObjectURL(file),
  //     });
  //   });
  //   // Do something with the files
  //   setUploadedImage(newImage);
  // }, []);

  // const { getRootProps, getInputProps } = useDropzone({
  //   accept: "image/jpeg, image/png",
  //   // onDrop,
  // });

  return (
    <div className="App">
      <h1>Face Detection</h1>
      <video id="video" autoPlay />
      <Canvas canvasRef={videoCanvasRef} />
      {/* {uploadedImage ? (
        <>
          <img src={uploadedImage?.imagePath} alt="prediction" id="image" />
          <Canvas canvasRef={imageCanvasRef} />
        </>
      ) : (
        <div className="drag-drop-image" {...getRootProps()}>
          <p>DRAG & DROP OR UPLOAD IMAGES</p>
          <button type="button">
            <input type="file" {...getInputProps()} />
            Browse
          </button>
        </div>
      )} */}
    </div>
  );
};

export default App;
