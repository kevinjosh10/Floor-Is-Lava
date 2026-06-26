import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

const Toggle = ({ label, checked, onChange }: { label: string, checked: boolean, onChange: (v: boolean) => void }) => (
  <div className="flex justify-between items-center py-3 border-b border-white/10">
    <span className="text-xl text-white/90">{label}</span>
    <button 
      onClick={() => onChange(!checked)}
      className={`w-14 h-8 rounded-full p-1 transition-colors ${checked ? 'bg-lavared' : 'bg-charcoal-700'}`}
    >
      <motion.div 
        animate={{ x: checked ? 24 : 0 }}
        className="w-6 h-6 bg-white rounded-full shadow-md"
      />
    </button>
  </div>
);

export const SettingsMenu: React.FC = () => {
  const setAppState = useAppStore((state) => state.setAppState);
  const settings = useAppStore((state) => state.settings);
  const updateSettings = useAppStore((state) => state.updateSettings);

  return (
    <div className="relative w-full h-screen bg-charcoal-900 flex flex-col p-8 md:p-24 overflow-hidden">
      <button 
        onClick={() => setAppState('menu')}
        className="group flex items-center space-x-2 text-white/70 hover:text-white transition-colors w-fit mb-12"
      >
        <ArrowLeft className="w-6 h-6 group-hover:-translate-x-2 transition-transform" />
        <span className="text-xl uppercase tracking-widest font-bold">Back</span>
      </button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl w-full mx-auto space-y-8"
      >
        <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-wider mb-8">
          Settings
        </h2>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md shadow-2xl">
          <Toggle 
            label="Particles" 
            checked={settings.particles} 
            onChange={(v) => updateSettings({ particles: v })} 
          />
          <Toggle 
            label="Screen Shake" 
            checked={settings.screenShake} 
            onChange={(v) => updateSettings({ screenShake: v })} 
          />
          <Toggle 
            label="Cursor Trail" 
            checked={settings.cursorTrail} 
            onChange={(v) => updateSettings({ cursorTrail: v })} 
          />
          <Toggle 
            label="FPS Counter" 
            checked={settings.fpsCounter} 
            onChange={(v) => updateSettings({ fpsCounter: v })} 
          />
        </div>
      </motion.div>
    </div>
  );
};
