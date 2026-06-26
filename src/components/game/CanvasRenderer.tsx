import React, { useEffect, useRef } from 'react';
import { GameLoop } from '../../game/engine/GameLoop';
import { GameplayScene } from '../../game/engine/GameplayScene';
import { useAppStore } from '../../store/useAppStore';
import { GameEvents, EventTypes } from '../../game/engine/Events';

export const CanvasRenderer: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const setAppState = useAppStore(state => state.setAppState);
  const setHighScore = useAppStore(state => state.setHighScore);

  useEffect(() => {
    if (!canvasRef.current) return;
    
    // Resize canvas to window size
    const resizeCanvas = () => {
      canvasRef.current!.width = window.innerWidth;
      canvasRef.current!.height = window.innerHeight;
    };
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const loop = new GameLoop(canvasRef.current);
    const scene = new GameplayScene(window.innerWidth, window.innerHeight);
    loop.setScene(scene);
    loop.start();

    // Listen to Game Over event
    const handleGameOver = (score: number) => {
      setHighScore(score);
      
      // Delay state transition slightly for effect
      setTimeout(() => {
        loop.stop();
        setAppState('gameover');
      }, 2000);
    };

    GameEvents.on(EventTypes.GameOver, handleGameOver);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      GameEvents.off(EventTypes.GameOver, handleGameOver);
      loop.stop();
    };
  }, [setAppState, setHighScore]);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 block cursor-none"
      style={{ touchAction: 'none' }} // Prevents mobile scrolling
    />
  );
};
