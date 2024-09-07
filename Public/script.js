// Shape Definitions and Checkboxes Creation
const shapes = ["circle", "rectangle", "triangle", "square", "heart", "bow"];
const shapeCheckboxesContainer = document.getElementById("shapeCheckboxes");

// Create checkboxes for shape selection
shapes.forEach((shape, index) => {
  const label = document.createElement("label");
  const checkbox = document.createElement("input");

  checkbox.type = "checkbox";
  checkbox.id = `shapesInput${index}`;
  checkbox.value = shape;

  label.htmlFor = checkbox.id;
  label.textContent = ` ${shape.charAt(0).toUpperCase() + shape.slice(1)}`;

  label.append(checkbox);
  shapeCheckboxesContainer.append(label, document.createElement("br"));
});

// Utility to get a random color
const getRandomColor = () =>
  `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, "0")}`;

// Main Script
const canvas = document.getElementById("canvas");
const generateImageButton = document.getElementById("generateImageButton");
const saveImageButton = document.getElementById("saveImageButton");
const goodImageButton = document.getElementById("goodImageButton");
const totalShapesInput = document.getElementById("totalShapesInput");
const batchSizeInput = document.getElementById("batchSizeInput");

// Set up event listeners
generateImageButton.addEventListener("click", generateImage);
saveImageButton.addEventListener("click", saveImage);
goodImageButton.addEventListener("click", () => console.log("Good Image"));

// Function to generate and draw images
function generateImage() {
  if (!totalShapesInput.value) {
    alert("Please enter number of shapes to generate");
    return;
  }
  if (!batchSizeInput.value) {
    alert("Please enter total shapes and batch size");
    return;
  }
  generateImageButton.disabled = true;
  const ctx = canvas.getContext("2d");
  const { clientWidth: width, clientHeight: height } = canvas;

  const totalShapes =
    parseInt(document.getElementById("totalShapesInput").value) || 1;
  const batchSize =
    parseInt(document.getElementById("batchSizeInput").value) || 1;

  canvas.width = width;
  canvas.height = height;

  ctx.clearRect(0, 0, width, height);
  ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
  ctx.shadowBlur = 10;
  ctx.shadowOffsetX = 5;
  ctx.shadowOffsetY = 5;

  const selectedShapes = Array.from(
    document.querySelectorAll("#shapeCheckboxes input:checked")
  ).map((input) => input.value);

  // Draw shape based on the type
  function drawShape(x, y, shapeType) {
    ctx.fillStyle = getRandomColor();
    ctx.beginPath();
    switch (shapeType) {
      case "circle":
        ctx.arc(x, y, 30, 0, Math.PI * 2);
        break;
      case "rectangle":
        ctx.rect(x, y, 60, 40);
        break;
      case "triangle":
        ctx.moveTo(x, y);
        ctx.lineTo(x + 50, y + 50);
        ctx.lineTo(x - 50, y + 50);
        ctx.closePath();
        break;
      case "square":
        ctx.rect(x, y, 50, 50);
        break;
      case "heart":
        drawHeart(x, y);
        break;
      case "bow":
        drawBow(x, y);
        break;
    }
    ctx.fill();
    ctx.closePath();
  }

  // Draw a heart shape
  function drawHeart(x, y) {
    ctx.moveTo(x, y + 20);
    ctx.bezierCurveTo(x - 25, y - 10, x - 15, y - 40, x, y - 10);
    ctx.bezierCurveTo(x + 15, y - 40, x + 25, y - 10, x, y + 20);
  }

  // Draw a bow shape
  function drawBow(x, y) {
    ctx.moveTo(x, y);
    ctx.bezierCurveTo(x - 25, y - 25, x - 25, y + 25, x, y + 2);
    ctx.bezierCurveTo(x + 25, y + 25, x + 25, y - 25, x, y);
  }

  // Function to draw shapes in batches
  function drawBatch(currentShape) {
    const shapesToDraw = Math.min(batchSize, totalShapes - currentShape);

    for (let i = 0; i < shapesToDraw; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const shapeType =
        selectedShapes[Math.floor(Math.random() * selectedShapes.length)];

      if (shapeType) drawShape(x, y, shapeType);
    }

    currentShape += shapesToDraw;

    if (currentShape < totalShapes) {
      requestAnimationFrame(() => drawBatch(currentShape));
    } else {
      console.log(
        "Shapes generated and saved as image data:",
        canvas.toDataURL("image/png")
      );
    }
  }

  drawBatch(0); // Start drawing shapes

  generateImageButton.disabled = false;
}

// Function to save the image
function saveImage() {
  fetch("/save-image", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ image: canvas.toDataURL("image/png") }),
  })
    .then((response) => response.text())
    .then((data) => console.log(data))
    .catch((error) => console.error("Error saving image:", error));
}
