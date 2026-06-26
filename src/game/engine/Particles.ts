import { Time } from './Time';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
}

export class ParticleSystem {
  private particles: Particle[] = [];

  public emit(x: number, y: number, amount: number, color: string, speed: number = 100) {
    for (let i = 0; i < amount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const v = Math.random() * speed;
      this.particles.push({
        x,
        y,
        vx: Math.cos(angle) * v,
        vy: Math.sin(angle) * v,
        life: 0,
        maxLife: 0.5 + Math.random() * 1.5,
        color,
        size: 2 + Math.random() * 4,
      });
    }
  }

  public update(time: Time) {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx * time.deltaTime;
      p.y += p.vy * time.deltaTime;
      p.life += time.deltaTime;
      
      // Gravity / Drag effect
      p.vy += 200 * time.deltaTime; // gravity
      
      if (p.life >= p.maxLife) {
        this.particles.splice(i, 1);
      }
    }
  }

  public render(ctx: CanvasRenderingContext2D) {
    for (const p of this.particles) {
      const opacity = 1 - (p.life / p.maxLife);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = opacity;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * opacity, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }
}
