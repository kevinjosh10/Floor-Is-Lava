import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type AppState = 'splash' | 'menu' | 'countdown' | 'playing' | 'paused' | 'gameover' | 'settings' | 'achievements';

interface Settings {
  masterVolume: number;
  musicVolume: number;
  sfxVolume: number;
  particles: boolean;
  screenShake: boolean;
  cursorTrail: boolean;
  fpsCounter: boolean;
}

interface AppStore {
  appState: AppState;
  setAppState: (state: AppState) => void;
  coins: number;
  addCoins: (amount: number) => void;
  highScore: number;
  setHighScore: (score: number) => void;
  settings: Settings;
  updateSettings: (settings: Partial<Settings>) => void;
}

export const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      appState: 'splash',
      setAppState: (state) => set({ appState: state }),
      coins: 0,
      addCoins: (amount) => set((state) => ({ coins: state.coins + amount })),
      highScore: 0,
      setHighScore: (score) => set((state) => ({ highScore: Math.max(state.highScore, score) })),
      settings: {
        masterVolume: 100,
        musicVolume: 100,
        sfxVolume: 100,
        particles: true,
        screenShake: true,
        cursorTrail: true,
        fpsCounter: false,
      },
      updateSettings: (newSettings) => set((state) => ({ settings: { ...state.settings, ...newSettings } })),
    }),
    {
      name: 'lava-game-storage',
      partialize: (state) => ({ 
        coins: state.coins, 
        highScore: state.highScore, 
        settings: state.settings 
      }), // only save these
    }
  )
);
