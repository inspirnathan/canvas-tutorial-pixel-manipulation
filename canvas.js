/*
wheatfields.jpeg image obtained from Unsplash: https://unsplash.com/photos/XvniRqem_jQ
Credit: Dave Beasley (https://unsplash.com/@malibu_lagoon)
*/

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const hoveredColor = document.getElementById('hovered-color');
const selectedColor = document.getElementById('selected-color');

const image = new Image();
image.src = 'wheatfields.jpeg';

image.onload = () => {
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
  image.style.display = 'none';
  // invert();
  // grayscale();
  // sepia();
  // convertWheatToGrass();
};

const pick = (event, destination) => {
  const x = event.layerX;
  const y = event.layerY;
  const pixel = ctx.getImageData(x, y, 1, 1);
  const data = pixel.data;

  const rgba = `rgba(${data[0]}, ${data[1]}, ${data[2]}, ${data[3]})`;
  destination.style.background = rgba;
  destination.textContent = rgba;

  return rgba;
};

canvas.addEventListener('mousemove', (event) => {
  pick(event, hoveredColor);
});

canvas.addEventListener('click', (event) => {
  pick(event, selectedColor);
});

const invert = () => {
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    data[i] = 255 - data[i]; // red
    data[i + 1] = 255 - data[i + 1]; // green
    data[i + 2] = 255 - data[i + 2]; // blue
  }
  ctx.putImageData(imageData, 0, 0);
};

const grayscale = () => {
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
    data[i] = avg; // red
    data[i + 1] = avg; // green
    data[i + 2] = avg; // blue
  }
  ctx.putImageData(imageData, 0, 0);
};

const sepia = () => {
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    const red = data[i];
    const green = data[i + 1];
    const blue = data[i + 2];

    data[i] = Math.min(
      Math.round(0.393 * red + 0.769 * green + 0.189 * blue),
      255
    );
    data[i + 1] = Math.min(
      Math.round(0.349 * red + 0.686 * green + 0.168 * blue),
      255
    );
    data[i + 2] = Math.min(
      Math.round(0.272 * red + 0.534 * green + 0.131 * blue),
      255
    );
  }
  ctx.putImageData(imageData, 0, 0);
};

const convertWheatToGrass = () => {
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    if (data[i + 2] < 240) {
      data[i] = 0; // remove red color from wheat to make it look like grass
    }
  }
  ctx.putImageData(imageData, 0, 0);
};
