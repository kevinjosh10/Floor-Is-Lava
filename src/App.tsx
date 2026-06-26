import React, { useEffect } from 'react';
import { useAppStore } from './store/useAppStore';
import { SplashScreen } from './components/screens/SplashScreen';
import { MainMenu } from './components/screens/MainMenu';
import { SettingsMenu } from './components/screens/SettingsMenu';
import { GameOverScreen } from './components/screens/GameOverScreen';
import { CanvasRenderer } from './components/game/CanvasRenderer';

const App: React.FC = () => {
  const appState = useAppStore((state) => state.appState);
  const setAppState = useAppStore((state) => state.setAppState);

  // Auto transition from countdown to playing
  useEffect(() => {
    if (appState === 'countdown') {
      const timer = setTimeout(() => {
        setAppState('playing');
      }, 3000); // 3 seconds countdown
      return () => clearTimeout(timer);
    }
  }, [appState, setAppState]);

  return (
    <div className={`w-full h-screen bg-charcoal-900 overflow-hidden text-white ${
      (appState === 'playing' || appState === 'countdown') ? 'cursor-none' : ''
    }`}>
      {/* Canvas is always mounted in the background, but only active during 'playing' or 'gameover' */}
      {(appState === 'playing' || appState === 'gameover' || appState === 'countdown') && (
        <CanvasRenderer />
      )}

      {/* UI Overlays */}
      {appState === 'splash' && <SplashScreen />}
      {appState === 'menu' && <MainMenu />}
      
      {appState === 'countdown' && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-transparent pointer-events-none">
          <div className="text-8xl text-lavared font-black animate-ping drop-shadow-[0_0_20px_rgba(255,42,0,1)]">
            GET READY
          </div>
        </div>
      )}
      
      {appState === 'settings' && <SettingsMenu />}
      
      {appState === 'gameover' && <GameOverScreen />}
      
      {appState === 'achievements' && (
        <div className="w-full h-screen flex items-center justify-center bg-charcoal-900">
          Achievements placeholder
        </div>
      )}
    </div>
  );
}

export default App;
