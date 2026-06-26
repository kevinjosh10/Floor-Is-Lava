import React from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, Home } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

export const GameOverScreen: React.FC = () => {
  const setAppState = useAppStore(state => state.setAppState);
  const highScore = useAppStore(state => state.highScore);

  return (
    <div className="relative w-full h-screen bg-charcoal-900/90 flex flex-col items-center justify-center p-8 z-50 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="flex flex-col items-center bg-white/5 border border-lavared/30 rounded-3xl p-12 shadow-[0_0_50px_rgba(255,42,0,0.2)] backdrop-blur-xl"
      >
        <h1 className="text-6xl md:text-8xl font-black text-lavared uppercase tracking-widest mb-4 drop-shadow-[0_0_20px_rgba(255,42,0,0.8)]">
          YOU DIED
        </h1>
        
        <div className="text-2xl text-white/80 mb-12">
          High Score: <span className="text-lavayellow font-bold">{highScore}</span>
        </div>

        <div className="flex space-x-6">
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(0,255,102,0.4)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setAppState('countdown')}
            className="flex items-center space-x-3 px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full transition-all"
          >
            <RefreshCw className="w-6 h-6 text-[#00ff66]" />
            <span className="text-xl font-bold uppercase tracking-wider">Play Again</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(255,255,255,0.2)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setAppState('menu')}
            className="flex items-center space-x-3 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all"
          >
            <Home className="w-6 h-6 text-white" />
            <span className="text-xl font-bold uppercase tracking-wider">Menu</span>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};
