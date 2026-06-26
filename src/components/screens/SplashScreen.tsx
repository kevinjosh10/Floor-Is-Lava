import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../../store/useAppStore';

export const SplashScreen: React.FC = () => {
  const setAppState = useAppStore((state) => state.setAppState);
  const [showPlay, setShowPlay] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPlay(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full h-screen bg-charcoal-900 flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-lavared via-charcoal-900 to-charcoal-900 animate-pulse"></div>
      
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="z-10 flex flex-col items-center"
      >
        <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-lavayellow via-lavablaze to-lavared tracking-tighter drop-shadow-[0_0_15px_rgba(255,102,0,0.8)]">
          THE FLOOR IS LAVA
        </h1>
        
        <div className="mt-4 h-1 w-32 bg-gradient-to-r from-transparent via-lavared to-transparent rounded-full shadow-[0_0_10px_rgba(255,42,0,0.8)]"></div>
      </motion.div>

      <AnimatePresence>
        {showPlay && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            whileHover={{ scale: 1.1, textShadow: "0px 0px 8px rgb(255,255,255)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setAppState('menu')}
            className="z-10 mt-16 px-8 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-xl font-bold uppercase tracking-widest hover:bg-white/20 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
          >
            Click to Start
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};
