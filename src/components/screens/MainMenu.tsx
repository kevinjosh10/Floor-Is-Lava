import React from 'react';
import { motion } from 'framer-motion';
import { Play, Settings, Trophy, Award, Palette, Info } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

const MenuButton = ({ icon: Icon, label, onClick, delay }: { icon: any, label: string, onClick: () => void, delay: number }) => (
  <motion.button
    initial={{ opacity: 0, x: -50 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay, type: "spring", stiffness: 100 }}
    whileHover={{ scale: 1.05, x: 10 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className="group flex items-center space-x-4 w-full md:w-80 px-6 py-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-lavared/50 rounded-2xl backdrop-blur-md transition-all duration-300 shadow-lg hover:shadow-[0_0_20px_rgba(255,42,0,0.4)]"
  >
    <Icon className="w-6 h-6 text-white/70 group-hover:text-lavayellow transition-colors" />
    <span className="text-xl font-medium tracking-wide group-hover:text-white transition-colors">
      {label}
    </span>
  </motion.button>
);

export const MainMenu: React.FC = () => {
  const setAppState = useAppStore((state) => state.setAppState);

  const menuItems = [
    { icon: Play, label: 'Play', action: () => setAppState('countdown') },
    { icon: Trophy, label: 'Statistics', action: () => {} },
    { icon: Award, label: 'Achievements', action: () => setAppState('achievements') },
    { icon: Settings, label: 'Settings', action: () => setAppState('settings') },
    { icon: Palette, label: 'Themes', action: () => {} },
    { icon: Info, label: 'Credits', action: () => {} },
  ];

  return (
    <div className="relative w-full h-screen bg-charcoal-900 flex items-center p-8 md:p-24 overflow-hidden">
      {/* Dynamic Background Simulation */}
      <div className="absolute top-1/2 left-2/3 w-96 h-96 bg-lavared/20 rounded-full blur-[100px] animate-pulse"></div>
      <div className="absolute bottom-10 right-1/4 w-64 h-64 bg-lavayellow/10 rounded-full blur-[80px] animate-pulse" style={{ animationDelay: '1s' }}></div>
      
      <div className="z-10 w-full max-w-4xl flex flex-col space-y-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-left"
        >
          <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-lavayellow to-lavared drop-shadow-[0_0_10px_rgba(255,102,0,0.5)]">
            THE FLOOR<br/>IS LAVA
          </h1>
        </motion.div>

        <div className="flex flex-col space-y-4">
          {menuItems.map((item, index) => (
            <MenuButton
              key={item.label}
              icon={item.icon}
              label={item.label}
              onClick={item.action}
              delay={0.1 + index * 0.1}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
