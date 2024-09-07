# AI Shape Generator

## Description

AI Shape Generator is a web-based application that allows users to create and visualize various shapes, including circles, rectangles, triangles, squares, hearts, and bowties, on an HTML5 canvas. Users can select the number of shapes to generate and customize their appearance with random colors.

## Features

- Select from multiple shapes to generate.
- Set the total number of shapes and batch size for generation.
- Random colors for each shape.
- Responsive canvas that adjusts to the window size.
- Save generated shapes as images.

## Technologies Used

- HTML
- CSS
- JavaScript
- Node.js (for server-side operations)

## Folder Structure

```bash
ai-gen-1
├── package.json
├── package-lock.json
├── public
│   ├── index.html
│   ├── script.js
│   └── style.css
├── server.js
└── views
```

## Installation

1. Clone the repository:

```bash
   git clone <repository-url>
```

2. Navigate to the project directory:

```bash
   cd ai-gen-1
```

3. Install the necessary dependencies:

```bash
   npm install
```

4. Start the server:

```bash
   node server.js
```

5. Open your browser and navigate to `http://localhost:3000` to view the application.

## Usage

1. Select the shapes you want to generate by checking the corresponding checkboxes.
2. Enter the total number of shapes and the batch size.
3. Click the "Generate" button to create the shapes on the canvas.
4. Optionally, save the generated shapes as an image.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
