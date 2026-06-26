export class Time {
  public deltaTime: number = 0;
  public elapsedTime: number = 0;
  public survivalTime: number = 0;
  public gameSpeed: number = 1;
  public difficultyMultiplier: number = 1;
  public isPaused: boolean = false;
  
  private lastTime: number = 0;

  public update(currentTime: number) {
    if (this.lastTime === 0) {
      this.lastTime = currentTime;
    }
    
    // Calculate delta in seconds
    this.deltaTime = (currentTime - this.lastTime) / 1000;
    
    // Cap delta time to prevent massive jumps (e.g. tab backgrounded)
    if (this.deltaTime > 0.1) {
      this.deltaTime = 0.1;
    }

    this.lastTime = currentTime;
    
    if (!this.isPaused) {
      const scaledDelta = this.deltaTime * this.gameSpeed;
      this.elapsedTime += scaledDelta;
      this.survivalTime += scaledDelta;
    }
  }

  public reset() {
    this.deltaTime = 0;
    this.elapsedTime = 0;
    this.survivalTime = 0;
    this.lastTime = 0;
    this.gameSpeed = 1;
    this.difficultyMultiplier = 1;
    this.isPaused = false;
  }
}
