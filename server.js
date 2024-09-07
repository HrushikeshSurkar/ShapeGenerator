const fs = require("fs");
const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// Check and create uploads folder if it doesn't exist
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Serve static files
app.use(express.static("public"));
app.use(express.json({ limit: "10mb" })); // Increase limit if needed

// Endpoint to save image
app.post("/save-image", (req, res) => {
  const base64Data = req.body.image.replace(/^data:image\/png;base64,/, ""); // Strip out the base64 prefix
  const filePath = path.join(uploadDir, `generated-image-${Date.now()}.png`);

  fs.writeFile(filePath, base64Data, "base64", (err) => {
    if (err) {
      console.error("Error saving image:", err);
      return res.status(500).send("Error saving image");
    }
    res.send("Image saved successfully!");
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
