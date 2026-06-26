import { Scene } from './Scene';
import { Time } from './Time';
import { Input } from './Input';
import { Lava } from '../entities/Lava';
import { Platform } from '../entities/Platform';
import { Collision } from './Collision';
import { GameDirector } from './GameDirector';
import { ParticleSystem } from './Particles';
import { Audio } from './Audio';
import { Cursor } from '../entities/Cursor';

export class GameplayScene extends Scene {
  private lava: Lava;
  private platforms: Platform[] = [];
  private director: GameDirector;
  private particles: ParticleSystem;
  
  private width: number;
  private height: number;

  constructor(width: number, height: number) {
    super();
    this.width = width;
    this.height = height;
    
    this.lava = new Lava(height);
    this.director = new GameDirector();
    this.particles = new ParticleSystem();
  }

  public init(): void {
    // Spawn initial platforms
    for (let i = 0; i < 5; i++) {
      this.spawnPlatform();
    }
    Audio.play('music');
  }

  private spawnPlatform() {
    const x = Math.random() * this.width;
    const y = Math.random() * (this.height * 0.8);
    const radius = 30 + Math.random() * 40;
    
    const platform = new Platform(x, y, radius);
    platform.vx = (Math.random() - 0.5) * 50;
    this.platforms.push(platform);
  }

  public update(time: Time, input: Input, cursor: Cursor): void {
    if (time.isPaused) return;

    this.director.update(time);
    this.lava.update(time);
    this.particles.update(time);
    
    // Manage platforms
    for (const p of this.platforms) {
      p.update(time);
    }
    
    // Filter destroyed platforms and spawn new ones
    this.platforms = this.platforms.filter(p => p.state !== 'destroyed');
    if (this.platforms.length < 5) {
      this.spawnPlatform();
    }

    // Collision Detection
    let isSafe = false;
    for (const p of this.platforms) {
      if (Collision.circleIntersect(input.x, input.y, cursor.radius, p.x, p.y, p.radius)) {
        isSafe = true;
        if (p.state === 'safe') {
          // Touching a safe platform starts breaking it
          p.state = 'breaking';
          Audio.play('hover');
        }
        break;
      }
    }

    // Check lava death if not on a safe platform
    if (!isSafe && this.lava.contains(input.x, input.y)) {
      if (cursor.state !== 'dead') {
        cursor.state = 'dead';
        this.die(input);
      }
    } else {
      // Not in lava, but off platform
      if (!isSafe) {
        cursor.state = 'danger';
        // Near death detection could be here
      } else {
        cursor.state = 'safe';
      }
    }
  }

  private die(input: Input) {
    Audio.stop('music');
    Audio.play('death');
    this.particles.emit(input.x, input.y, 50, '#ff2a00', 300);
    this.director.gameOver();
  }

  public render(ctx: CanvasRenderingContext2D, input: Input, time: Time): void {
    this.lava.render(ctx, this.width, this.height, time);
    
    for (const p of this.platforms) {
      p.render(ctx);
    }
    
    this.particles.render(ctx);

    // Render score overlay in canvas for performance
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.font = 'bold 24px sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(Math.floor(this.director.score).toString(), this.width - 20, 40);
  }

  public destroy(): void {
    Audio.stop('music');
  }
}
