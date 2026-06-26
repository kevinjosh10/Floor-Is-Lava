import { create } from 'zustand';

type AppState = 'splash' | 'menu' | 'countdown' | 'playing' | 'paused' | 'gameover' | 'settings' | 'achievements';

interface AppStore {
  appState: AppState;
  setAppState: (state: AppState) => void;
  coins: number;
  addCoins: (amount: number) => void;
  highScore: number;
  setHighScore: (score: number) => void;
}

export const useAppStore = create<AppStore>((set) => ({
  appState: 'splash',
  setAppState: (state) => set({ appState: state }),
  coins: 0,
  addCoins: (amount) => set((state) => ({ coins: state.coins + amount })),
  highScore: 0,
  setHighScore: (score) => set((state) => ({ highScore: Math.max(state.highScore, score) })),
}));
