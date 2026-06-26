import { Time } from './Time';
import { GameEvents, EventTypes } from './Events';
import { useAppStore } from '../../store/useAppStore';

export class GameDirector {
  public score: number = 0;
  
  public update(time: Time) {
    if (time.isPaused) return;

    // Base survival score: 10 points per second
    this.score += 10 * time.deltaTime;
    
    // Sync with global store occasionally (e.g. every second)
    // For performance, we don't update Zustand every frame
    if (Math.floor(this.score) % 10 === 0) {
      // Not implemented here to avoid spamming React state,
      // handled locally until GameOver
    }
  }
  
  public addScore(points: number) {
    this.score += points;
    GameEvents.emit(EventTypes.ScoreUpdated, this.score);
  }

  public gameOver() {
    // Sync final score to store
    const store = useAppStore.getState();
    store.setHighScore(Math.floor(this.score));
    store.addCoins(Math.floor(this.score / 10)); // 1 coin per 10 score
    GameEvents.emit(EventTypes.GameOver, Math.floor(this.score));
  }
}
