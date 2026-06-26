export class Input {
  public x: number = 0;
  public y: number = 0;
  public previousX: number = 0;
  public previousY: number = 0;
  public velocityX: number = 0;
  public velocityY: number = 0;
  public speed: number = 0;
  public maxSpeed: number = 0;
  public totalDistance: number = 0;
  
  private isTracking: boolean = false;

  public attach(_canvas: HTMLCanvasElement) {
    this.isTracking = true;
    window.addEventListener('mousemove', this.handleMouseMove);
  }

  public detach() {
    this.isTracking = false;
    window.removeEventListener('mousemove', this.handleMouseMove);
  }

  private handleMouseMove = (e: MouseEvent) => {
    if (!this.isTracking) return;
    
    // We update current positions directly on mouse move.
    // The GameLoop will calculate velocity/distance per frame.
    this.x = e.clientX;
    this.y = e.clientY;
  }

  public update(deltaTime: number) {
    if (deltaTime > 0) {
      this.velocityX = (this.x - this.previousX) / deltaTime;
      this.velocityY = (this.y - this.previousY) / deltaTime;
      
      const frameDistance = Math.hypot(this.x - this.previousX, this.y - this.previousY);
      this.totalDistance += frameDistance;
      
      this.speed = frameDistance / deltaTime;
      if (this.speed > this.maxSpeed) {
        this.maxSpeed = this.speed;
      }
    }

    this.previousX = this.x;
    this.previousY = this.y;
  }
}
