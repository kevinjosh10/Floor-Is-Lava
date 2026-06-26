import { Time } from './Time';
import { Input } from './Input';
import { Cursor } from '../entities/Cursor';

export abstract class Scene {
  public abstract init(): void;
  public abstract update(time: Time, input: Input, cursor: Cursor): void;
  public abstract render(ctx: CanvasRenderingContext2D, input: Input, time: Time): void;
  public abstract destroy(): void;
}
