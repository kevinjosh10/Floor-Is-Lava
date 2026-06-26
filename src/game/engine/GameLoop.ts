import { Time } from './Time';
import { Input } from './Input';
import { Cursor } from '../entities/Cursor';
import { Scene } from './Scene';

export class GameLoop {
  private requestRef: number = 0;
  private running: boolean = false;
  
  public time: Time;
  public input: Input;
  public cursor: Cursor;
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private currentScene: Scene | null = null;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    const context = canvas.getContext('2d', { alpha: false });
    if (!context) throw new Error("Could not get 2D context");
    this.ctx = context;
    
    this.time = new Time();
    this.input = new Input();
    this.cursor = new Cursor();
  }

  public setScene(scene: Scene) {
    if (this.currentScene) {
      this.currentScene.destroy();
    }
    this.currentScene = scene;
    this.currentScene.init();
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
    if (this.currentScene) {
      this.currentScene.destroy();
    }
  }

  private loop = (currentTime: number) => {
    if (!this.running) return;

    // 1. Update Delta Time
    this.time.update(currentTime);
    
    // 2. Update Input
    this.input.update(this.time.deltaTime);

    // 3. Update Entities & Scene
    this.cursor.update(this.input, this.time);
    if (this.currentScene) {
      this.currentScene.update(this.time, this.input, this.cursor);
    }

    // 4. Render
    this.render();

    // 5. Next Frame
    this.requestRef = requestAnimationFrame(this.loop);
  }

  private render() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    // Clear background
    this.ctx.fillStyle = '#121212'; // charcoal-900
    this.ctx.fillRect(0, 0, width, height);

    // Render Scene
    if (this.currentScene) {
      this.currentScene.render(this.ctx, this.input, this.time);
    }

    // Render Cursor on top
    this.cursor.render(this.ctx, this.input);
  }
}

