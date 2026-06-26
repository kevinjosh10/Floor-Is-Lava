import { Time } from '../engine/Time';

export class Platform {
  public x: number;
  public y: number;
  public radius: number;
  public vx: number = 0;
  public vy: number = 0;
  
  public state: 'safe' | 'breaking' | 'destroyed' = 'safe';
  public life: number = 100; // time before breaking

  constructor(x: number, y: number, radius: number) {
    this.x = x;
    this.y = y;
    this.radius = radius;
  }

  public update(time: Time, width: number, height: number) {
    this.x += this.vx * time.deltaTime;
    this.y += this.vy * time.deltaTime;

    // Bounce off walls
    if (this.x - this.radius < 0) {
      this.x = this.radius;
      this.vx *= -1;
    } else if (this.x + this.radius > width) {
      this.x = width - this.radius;
      this.vx *= -1;
    }

    if (this.y - this.radius < 0) {
      this.y = this.radius;
      this.vy *= -1;
    } else if (this.y + this.radius > height) {
      this.y = height - this.radius;
      this.vy *= -1;
    }
    
    if (this.state === 'breaking') {
      this.life -= time.deltaTime * 50;
      if (this.life <= 0) {
        this.state = 'destroyed';
      }
    }
  }

  public render(ctx: CanvasRenderingContext2D) {
    if (this.state === 'destroyed') return;
    
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    
    if (this.state === 'safe') {
      ctx.fillStyle = 'rgba(0, 255, 102, 0.2)'; // transparent green
      ctx.strokeStyle = '#00ff66';
      ctx.lineWidth = 3;
      ctx.shadowBlur = 20;
      ctx.shadowColor = '#00ff66';
    } else if (this.state === 'breaking') {
      ctx.fillStyle = `rgba(255, 204, 0, ${this.life / 100})`;
      ctx.strokeStyle = '#ffcc00';
      ctx.lineWidth = 2;
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#ffcc00';
      // Shrink effect
      this.radius *= 0.99;
    }
    
    ctx.fill();
    ctx.stroke();
    ctx.shadowBlur = 0; // reset
  }
}
