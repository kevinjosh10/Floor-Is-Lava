import { Time } from './Time';
import { Input } from './Input';

export class GameLoop {
  private requestRef: number = 0;
  private running: boolean = false;
  
  public time: Time;
  public input: Input;
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    const context = canvas.getContext('2d', { alpha: false });
    if (!context) throw new Error("Could not get 2D context");
    this.ctx = context;
    
    this.time = new Time();
    this.input = new Input();
  }

  public start() {
    if (this.running) return;
    
    this.running = true;
    this.input.attach(this.canvas);
    this.time.reset();
    
    this.requestRef = requestAnimationFrame(this.loop);
  }

  public stop() {
    this.running = false;
    this.input.detach();
    cancelAnimationFrame(this.requestRef);
  }

  private loop = (currentTime: number) => {
    if (!this.running) return;

    // 1. Update Delta Time
    this.time.update(currentTime);
    
    // 2. Update Input
    this.input.update(this.time.deltaTime);

    // 3. Render
    this.render();

    // 4. Next Frame
    this.requestRef = requestAnimationFrame(this.loop);
  }

  private render() {
    const { width, height } = this.canvas;
    
    // Clear background
    this.ctx.fillStyle = '#121212'; // charcoal-900
    this.ctx.fillRect(0, 0, width, height);

    // Temp: Render custom cursor core
    this.ctx.fillStyle = '#ff2a00';
    this.ctx.beginPath();
    this.ctx.arc(this.input.x, this.input.y, 8, 0, Math.PI * 2);
    this.ctx.fill();
    
    // Temp: Draw cursor trail effect
    this.ctx.strokeStyle = 'rgba(255, 102, 0, 0.5)';
    this.ctx.lineWidth = 4;
    this.ctx.beginPath();
    this.ctx.moveTo(this.input.previousX, this.input.previousY);
    this.ctx.lineTo(this.input.x, this.input.y);
    this.ctx.stroke();
  }
}
