export const draw = (detections, ctx) => {
  // Loop through each prediction
  detections.forEach(prediction => {

    // Extract boxes and classes
    const [x, y, width, height] = prediction?.bbox;
    const { class: name, score } = prediction;
    const text = `${name} with ${Math.round(score * 100)}% accuracy`

    // Set styling
    const color = Math.floor(Math.random() * 16777215).toString(16);
    ctx.strokeStyle = '#' + color
    ctx.font = 'small-caps 500 20px Arial';

    // Draw rectangles and text
    ctx.beginPath();
    ctx.fillStyle = '#' + color
    ctx.fillText(text, x, y);
    ctx.strokeStyle = "#FF0000";
    ctx.strokeRect(x, y, width, height);
    ctx.rect(x, y, width, height);
    ctx.fillStyle = "rgba(0, 255, 0, 0.25)";
    ctx.fill();
    ctx.stroke();
  });
}
