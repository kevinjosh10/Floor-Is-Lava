import { Time } from './Time';
import { Input } from './Input';

export abstract class Scene {
  public abstract init(): void;
  public abstract update(time: Time, input: Input): void;
  public abstract render(ctx: CanvasRenderingContext2D, input: Input): void;
  public abstract destroy(): void;
}
