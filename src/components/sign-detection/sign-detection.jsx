import React, { useEffect, useState, useRef } from "react";
import "@tensorflow/tfjs";
import * as HandPose from "@tensorflow-models/handpose";
import * as FingerPose from "fingerpose";

import Canvas from "../common/canvas";
import StreamVideo from "../common/stream-video/stream-video";

import { drawHand } from "../../utils/draw";

import thumbsUp from "../../assets/images/thumbs_up.png";
import victory from "../../assets/images/victory.png";

const predictionIcons = {
  thumbs_up: thumbsUp,
  victory: victory,
};

const SignDetection = () => {
  const videoCanvasRef = useRef(null);

  const [emoji, setEmoji] = useState(null);
  // const images = { thumbs_up: thumbs_up, victory: victory };

  const runHandPose = async () => {
    const handPoseModal = await HandPose.load();
    console.log("handPoseModal model loaded.");

    setInterval(() => {
      getHandPosePredictions(handPoseModal);
    }, 10);
  };

  const getHandPosePredictions = async (handPoseModal) => {
    const video = document.getElementById("video");
    const ctx = videoCanvasRef.current.getContext("2d");

    const predictions = await handPoseModal.estimateHands(video);

    if (predictions.length > 0) {
      videoCanvasRef.current.width = video?.videoWidth;
      videoCanvasRef.current.height = video?.videoHeight;

      const GE = new FingerPose.GestureEstimator([
        FingerPose.Gestures.VictoryGesture,
        FingerPose.Gestures.ThumbsUpGesture,
      ]);
      const gesture = await GE.estimate(predictions[0].landmarks, 4);
      if (gesture.gestures !== undefined && gesture.gestures.length > 0) {
        // console.log(gesture.gestures);

        const confidence = gesture?.gestures.map(({ score }) => score);
        const maxConfidence = confidence.indexOf(
          Math.max.apply(null, confidence)
        );
        // console.log(gesture.gestures[maxConfidence].name);
        setEmoji(gesture.gestures[maxConfidence].name);
        console.log(maxConfidence, gesture.gestures[maxConfidence]);
      }
      drawHand(predictions, ctx);
    } else {
      ctx.clearRect(0, 0, video?.videoWidth, video?.videoHeight);
      setEmoji(null);
    }
  };

  useEffect(() => {
    runHandPose();
  });

  return (
    <div className="tensorflow__sign-detection_container">
      <h1>Sign Detection</h1>
      <StreamVideo />
      <Canvas canvasRef={videoCanvasRef} />
      {emoji !== null && (
        <img
          alt="emoji"
          src={predictionIcons[emoji]}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 400,
            right: 0,
            textAlign: "center",
            height: 100,
          }}
        />
      )}
    </div>
  );
};

export default SignDetection;
