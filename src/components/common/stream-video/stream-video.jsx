import React, { useEffect } from 'react';

const StreamVideo = () => {
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

  useEffect(() => {
    setupCamera();
  }, []);

  return <video id="video" autoPlay />;
};

export default StreamVideo;
