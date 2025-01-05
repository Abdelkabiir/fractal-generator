class FractalGenerator {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private maxIterations: number = 50;
    private zoom: number = 200;
    private fractalType: string = 'mandelbrot';

    constructor() {
        this.canvas = document.getElementById('fractalCanvas') as HTMLCanvasElement;
        this.ctx = this.canvas.getContext('2d')!;
        this.setupEventListeners();
        this.draw();
    }

    private setupEventListeners(): void {
        const fractalSelect = document.getElementById('fractalType') as HTMLSelectElement;
        const iterationsInput = document.getElementById('iterations') as HTMLInputElement;
        const zoomInput = document.getElementById('zoom') as HTMLInputElement;
        const generateBtn = document.getElementById('generate') as HTMLButtonElement;
        const resetBtn = document.getElementById('reset') as HTMLButtonElement;

        fractalSelect.addEventListener('change', (e) => {
            this.fractalType = (e.target as HTMLSelectElement).value;
        });

        iterationsInput.addEventListener('input', (e) => {
            this.maxIterations = parseInt((e.target as HTMLInputElement).value);
            document.getElementById('iterationValue')!.textContent = this.maxIterations.toString();
        });

        zoomInput.addEventListener('input', (e) => {
            this.zoom = parseInt((e.target as HTMLInputElement).value);
            document.getElementById('zoomValue')!.textContent = this.zoom.toString();
        });

        generateBtn.addEventListener('click', () => this.draw());
        resetBtn.addEventListener('click', () => this.reset());

        // Add mouse handling for interactive zooming
        this.canvas.addEventListener('click', (e) => this.handleClick(e));
    }

    private mandelbrotSet(x0: number, y0: number): number {
        let x = 0;
        let y = 0;
        let iteration = 0;

        while (x * x + y * y <= 4 && iteration < this.maxIterations) {
            const xTemp = x * x - y * y + x0;
            y = 2 * x * y + y0;
            x = xTemp;
            iteration++;
        }

        return iteration;
    }

    private juliaSet(x: number, y: number): number {
        let iteration = 0;
        const c = { x: -0.4, y: 0.6 }; // Julia set constant

        while (x * x + y * y <= 4 && iteration < this.maxIterations) {
            const xTemp = x * x - y * y + c.x;
            y = 2 * x * y + c.y;
            x = xTemp;
            iteration++;
        }

        return iteration;
    }

    private drawFractalTree(x: number, y: number, length: number, angle: number, depth: number): void {
        if (depth === 0) return;

        const endX = x + length * Math.cos(angle);
        const endY = y + length * Math.sin(angle);

        this.ctx.beginPath();
        this.ctx.moveTo(x, y);
        this.ctx.lineTo(endX, endY);
        this.ctx.stroke();

        this.drawFractalTree(endX, endY, length * 0.7, angle - Math.PI / 4, depth - 1);
        this.drawFractalTree(endX, endY, length * 0.7, angle + Math.PI / 4, depth - 1);
    }

    private getColor(iteration: number): string {
        if (iteration === this.maxIterations) return '#000';

        const hue = (iteration / this.maxIterations) * 360;
        return `hsl(${hue}, 100%, 50%)`;
    }

    private draw(): void {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        if (this.fractalType === 'tree') {
            this.ctx.strokeStyle = '#2c3e50';
            this.drawFractalTree(
                this.canvas.width / 2,
                this.canvas.height,
                this.canvas.height / 4,
                -Math.PI / 2,
                Math.floor(this.maxIterations / 10)
            );
            return;
        }

        const imageData = this.ctx.createImageData(this.canvas.width, this.canvas.height);
        const data = imageData.data;

        for (let x = 0; x < this.canvas.width; x++) {
            for (let y = 0; y < this.canvas.height; y++) {
                const x0 = (x - this.canvas.width / 2) / this.zoom;
                const y0 = (y - this.canvas.height / 2) / this.zoom;

                const iteration = this.fractalType === 'mandelbrot'
                    ? this.mandelbrotSet(x0, y0)
                    : this.juliaSet(x0, y0);

                const color = this.getColor(iteration);
                const rgb = this.hexToRgb(color);

                const pixelIndex = (y * this.canvas.width + x) * 4;
                data[pixelIndex] = rgb.r;
                data[pixelIndex + 1] = rgb.g;
                data[pixelIndex + 2] = rgb.b;
                data[pixelIndex + 3] = 255;
            }
        }

        this.ctx.putImageData(imageData, 0, 0);
    }

    private hexToRgb(color: string): { r: number, g: number, b: number } {
        // Handle HSL colors
        if (color.startsWith('hsl')) {
            const temp = document.createElement('div');
            temp.style.color = color;
            document.body.appendChild(temp);
            const style = getComputedStyle(temp);
            const rgb = style.color.match(/\d+/g)!;
            document.body.removeChild(temp);
            return {
                r: parseInt(rgb[0]),
                g: parseInt(rgb[1]),
                b: parseInt(rgb[2])
            };
        }

        // Handle hex colors
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : { r: 0, g: 0, b: 0 };
    }

    private handleClick(event: MouseEvent): void {
        if (this.fractalType === 'tree') return;

        const rect = this.canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        // Increase zoom at clicked point
        this.zoom *= 1.5;
        (document.getElementById('zoom') as HTMLInputElement).value = this.zoom.toString();
        (document.getElementById('zoomValue') as HTMLElement).textContent = this.zoom.toString();

        this.draw();
    }

    private reset(): void {
        this.zoom = 200;
        this.maxIterations = 50;

        const zoomInput = document.getElementById('zoom') as HTMLInputElement;
        const iterationsInput = document.getElementById('iterations') as HTMLInputElement;
        const zoomValueSpan = document.getElementById('zoomValue') as HTMLElement;
        const iterationValueSpan = document.getElementById('iterationValue') as HTMLElement;

        zoomInput.value = '200';
        iterationsInput.value = '50';

        zoomValueSpan.textContent = '200';
        iterationValueSpan.textContent = '50';

        this.draw();
    }
}

// Initialize when the document is loaded
document.addEventListener('DOMContentLoaded', () => {
    new FractalGenerator();
});