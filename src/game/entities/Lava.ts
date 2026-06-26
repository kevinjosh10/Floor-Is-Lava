import { Time } from '../engine/Time';

export class Lava {
  public coverage: number = 0; // 0 to 1
  public speed: number = 0.05; // growth per second
  private yPosition: number;
  private height: number;

  constructor(canvasHeight: number) {
    this.height = canvasHeight;
    this.yPosition = canvasHeight; // starts offscreen at bottom
  }

  public update(time: Time) {
    // Lava slowly rises (coverage increases)
    this.coverage += this.speed * time.deltaTime * time.difficultyMultiplier;
    if (this.coverage > 1) this.coverage = 1;
    
    // Convert coverage to y position
    this.yPosition = this.height * (1 - this.coverage);
  }

  public render(ctx: CanvasRenderingContext2D, width: number, height: number, time: Time) {
    if (this.coverage <= 0) return;

    // Draw base lava
    ctx.fillStyle = '#ff2a00';
    ctx.fillRect(0, this.yPosition, width, height - this.yPosition);
    
    // Draw animated wave effect at the edge
    ctx.beginPath();
    ctx.moveTo(0, this.yPosition);
    for (let x = 0; x <= width; x += 20) {
      const wave = Math.sin((x + time.elapsedTime * 100) * 0.05) * 10;
      ctx.lineTo(x, this.yPosition + wave);
    }
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    
    // Gradient for the wave top
    const gradient = ctx.createLinearGradient(0, this.yPosition - 20, 0, this.yPosition + 20);
    gradient.addColorStop(0, 'rgba(255, 204, 0, 0)'); // yellow glow
    gradient.addColorStop(0.5, '#ff6600'); // orange
    gradient.addColorStop(1, '#ff2a00'); // red
    
    ctx.fillStyle = gradient;
    ctx.fill();

    // Heat glow effect
    ctx.shadowBlur = 30;
    ctx.shadowColor = '#ff2a00';
    ctx.strokeStyle = '#ffcc00';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Reset shadow
    ctx.shadowBlur = 0;
  }
  
  // Check if a point is in lava
  public contains(x: number, y: number): boolean {
    return y > this.yPosition;
  }
}
