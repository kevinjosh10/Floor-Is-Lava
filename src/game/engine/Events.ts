type EventCallback = (...args: any[]) => void;

export class EventManager {
  private events: Map<string, EventCallback[]> = new Map();

  public on(event: string, callback: EventCallback) {
    if (!this.events.has(event)) {
      this.events.set(event, []);
    }
    this.events.get(event)!.push(callback);
  }

  public off(event: string, callback: EventCallback) {
    if (!this.events.has(event)) return;
    const callbacks = this.events.get(event)!.filter(cb => cb !== callback);
    this.events.set(event, callbacks);
  }

  public emit(event: string, ...args: any[]) {
    if (!this.events.has(event)) return;
    for (const callback of this.events.get(event)!) {
      callback(...args);
    }
  }

  public clear() {
    this.events.clear();
  }
}

export const GameEvents = new EventManager();

export const EventTypes = {
  PlatformDestroyed: 'PlatformDestroyed',
  PowerupCollected: 'PowerupCollected',
  BossSpawned: 'BossSpawned',
  NearDeath: 'NearDeath',
  GameOver: 'GameOver',
  ComboStarted: 'ComboStarted',
  ScoreUpdated: 'ScoreUpdated',
  AchievementUnlocked: 'AchievementUnlocked',
};
