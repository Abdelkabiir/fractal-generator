# Fractal Generator

An interactive fractal generator built with TypeScript that allows users to explore different types of fractals with customizable parameters.

## Features

- Multiple fractal types:
    - Mandelbrot Set
    - Julia Set
    - Fractal Tree
- Interactive controls:
    - Adjustable iteration count
    - Zoom control
    - Click-to-zoom functionality
- Real-time rendering
- Color visualization for complex fractals
- Reset functionality

## Demo

The generator allows you to:
- Choose between different fractal types
- Adjust parameters in real-time
- Zoom into interesting areas (for Mandelbrot and Julia sets)
- Generate beautiful fractal patterns

## Getting Started

### Prerequisites

- Node.js and npm installed
- TypeScript compiler (`npm install -g typescript`)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Abdelkabiir/fractal-generator.git
cd fractal-generator
```

2. Install dependencies:
```bash
npm install
```

3. Compile TypeScript:
```bash
tsc fractal.ts --target ES2015
```

4. Open `index.html` in your browser

## Usage

1. Select a fractal type from the dropdown menu
2. Adjust the iterations slider to control detail level
3. Use the zoom slider to change the view scale
4. Click the "Generate" button to create the fractal
5. Click on the canvas to zoom in at that point (for Mandelbrot/Julia sets)
6. Use "Reset" to return to default settings

## Project Structure

```
fractal-generator/
├── index.html        # Main HTML file
├── src/
│   └── fractal.ts    # TypeScript source code
├── dist/
│   └── fractal.js    # Compiled JavaScript
├── README.md         # This file
└── tsconfig.json     # TypeScript configuration
```

## Technical Implementation

### Fractal Types

1. **Mandelbrot Set**
    - Uses iterative function: z = z² + c
    - Color based on escape-time algorithm

2. **Julia Set**
    - Similar to Mandelbrot but with fixed c value
    - Interactive exploration of the complex plane

3. **Fractal Tree**
    - Recursive branching pattern
    - Controlled by iteration depth

### Performance Considerations

- Uses Canvas API for efficient rendering
- Optimized color calculations
- Efficient pixel manipulation using ImageData

## Further Development

Potential improvements and additions:
- Additional fractal types (Sierpinski Triangle, Koch Snowflake)
- Color scheme customization
- Save/export functionality
- Pan/drag navigation
- Touch screen support
- Animation capabilities

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Based on the mathematics of Benoit Mandelbrot
- Inspired by various fractal visualization techniques
- Built with TypeScript and HTML Canvas