import { Time } from '../engine/Time';

export class Lava {
  private pulse: number = 0;

  constructor(_canvasHeight: number) {
    // Canvas height not strictly needed for this effect anymore
  }

  public update(time: Time) {
    this.pulse += time.deltaTime;
  }

  public render(ctx: CanvasRenderingContext2D, width: number, height: number, time: Time) {
    const pulseFactor = Math.sin(time.elapsedTime * 2) * 0.1 + 0.9; // 0.8 to 1.0

    const gradient = ctx.createRadialGradient(
      width / 2, height / 2, 0,
      width / 2, height / 2, Math.max(width, height) * pulseFactor
    );
    
    gradient.addColorStop(0, '#ff4d00'); // bright center
    gradient.addColorStop(0.5, '#cc2900');
    gradient.addColorStop(1, '#800000'); // dark edges

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Subtle global heat distortion effect
    ctx.fillStyle = `rgba(255, 150, 0, ${Math.sin(time.elapsedTime * 5) * 0.02 + 0.03})`;
    ctx.fillRect(0, 0, width, height);
  }
  
  // Since lava is everywhere, this always returns true
  public contains(_x: number, _y: number): boolean {
    return true;
  }
}
