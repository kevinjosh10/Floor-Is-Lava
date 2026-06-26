import { Input } from '../engine/Input';
import { Time } from '../engine/Time';

export type CursorState = 'safe' | 'warning' | 'danger' | 'dead';

export class Cursor {
  public state: CursorState = 'safe';
  public radius: number = 8;
  
  // Trail history for motion blur / particle trail
  private trail: { x: number, y: number, age: number }[] = [];

  public update(input: Input, time: Time) {
    if (this.state === 'dead') return;

    // Add current position to trail
    this.trail.unshift({ x: input.x, y: input.y, age: 0 });
    
    // Update trail age and remove old ones
    const maxTrailLength = 20;
    this.trail = this.trail.slice(0, maxTrailLength).map(p => ({
      ...p,
      age: p.age + time.deltaTime
    }));
  }

  public reset() {
    this.state = 'safe';
    this.trail = [];
  }

  public render(ctx: CanvasRenderingContext2D, input: Input) {
    // Render Trail
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    if (this.trail.length > 1) {
      ctx.beginPath();
      ctx.moveTo(this.trail[0].x, this.trail[0].y);
      for (let i = 1; i < this.trail.length; i++) {
        const p = this.trail[i];
        ctx.lineTo(p.x, p.y);
      }
      
      // State-based trail color
      const rgb = this.state === 'danger' ? '255, 42, 0' : 
                  this.state === 'warning' ? '255, 204, 0' : 
                  '0, 255, 102';
      
      ctx.strokeStyle = `rgba(${rgb}, 0.4)`;
      ctx.lineWidth = this.radius * 2;
      ctx.stroke();
    }

    // Render Core
    ctx.beginPath();
    ctx.arc(input.x, input.y, this.radius, 0, Math.PI * 2);
    
    // Glow effect
    ctx.shadowBlur = 15;
    ctx.shadowColor = this.state === 'danger' ? '#ff2a00' : '#ffffff';
    
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    
    // Reset shadow
    ctx.shadowBlur = 0;
  }
}
