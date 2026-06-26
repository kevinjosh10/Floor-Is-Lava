import React from 'react';
import { useAppStore } from './store/useAppStore';
import { SplashScreen } from './components/screens/SplashScreen';
import { MainMenu } from './components/screens/MainMenu';

const App: React.FC = () => {
  const appState = useAppStore((state) => state.appState);

  return (
    <div className="w-full h-screen bg-charcoal-900 overflow-hidden text-white cursor-none">
      {/* 
        The cursor-none hides the default cursor. 
        We will render our custom canvas cursor later.
      */}
      {appState === 'splash' && <SplashScreen />}
      {appState === 'menu' && <MainMenu />}
      
      {/* Placeholders for other states */}
      {appState === 'countdown' && (
        <div className="w-full h-screen flex items-center justify-center bg-charcoal-900 text-6xl text-lavared font-black animate-pulse">
          GET READY
        </div>
      )}
      {appState === 'settings' && (
        <div className="w-full h-screen flex items-center justify-center bg-charcoal-900">
          Settings Screen placeholder
        </div>
      )}
      {appState === 'achievements' && (
        <div className="w-full h-screen flex items-center justify-center bg-charcoal-900">
          Achievements placeholder
        </div>
      )}
    </div>
  );
}

export default App;
