import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, Zap, Shield, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
const LandingPage = ({
  onStartSimulation
}) => {
  return <div className="min-h-screen flex flex-col items-center justify-center px-4 pt-20">
      <motion.div initial={{
      opacity: 0,
      y: 50
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      duration: 0.8
    }} className="text-center max-w-4xl mx-auto">
        <motion.h1 className="font-orbitron font-black text-6xl md:text-8xl mb-6 neon-text" initial={{
        scale: 0.5
      }} animate={{
        scale: 1
      }} transition={{
        duration: 0.8,
        delay: 0.2
      }}>
          ASTEROID
          <br />
          <span className="gradient-text">IMPACT</span>
          <br />
          SIMULATOR
        </motion.h1>

        <motion.p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed" initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} transition={{
        duration: 0.8,
        delay: 0.4
      }}>Visualize asteroid risks, simulate catastrophic impacts, and explore advanced mitigation strategies with our cutting-edge 3D Earth simulation platform.</motion.p>

        <motion.div initial={{
        opacity: 0,
        y: 30
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.8,
        delay: 0.6
      }}>
          <Button onClick={onStartSimulation} size="lg" className="glow-button neon-glow bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-4 px-8 text-lg rounded-full transform hover:scale-105 transition-all duration-300">
            <Rocket className="w-6 h-6 mr-3" />
            START SIMULATION
          </Button>
        </motion.div>

        <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20" initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} transition={{
        duration: 0.8,
        delay: 0.8
      }}>
          <div className="glass-card p-6 rounded-xl">
            <Target className="w-12 h-12 text-red-400 mb-4 mx-auto" />
            <h3 className="font-orbitron font-bold text-xl mb-3 text-white">Impact Analysis</h3>
            <p className="text-gray-400">
              Precise trajectory modeling and damage assessment for various asteroid scenarios
            </p>
          </div>

          <div className="glass-card p-6 rounded-xl">
            <Zap className="w-12 h-12 text-yellow-400 mb-4 mx-auto" />
            <h3 className="font-orbitron font-bold text-xl mb-3 text-white">Real-time Simulation</h3>
            <p className="text-gray-400">
              Interactive 3D visualization with dynamic shockwave and tsunami modeling
            </p>
          </div>

          <div className="glass-card p-6 rounded-xl">
            <Shield className="w-12 h-12 text-green-400 mb-4 mx-auto" />
            <h3 className="font-orbitron font-bold text-xl mb-3 text-white">Mitigation Strategies</h3>
            <p className="text-gray-400">
              Compare deflection, destruction, and evacuation strategies with cost analysis
            </p>
          </div>
        </motion.div>
      </motion.div>

      <motion.div className="absolute inset-0 pointer-events-none" initial={{
      opacity: 0
    }} animate={{
      opacity: 1
    }} transition={{
      duration: 2
    }}>
        {[...Array(50)].map((_, i) => <motion.div key={i} className="absolute w-1 h-1 bg-white rounded-full" style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`
      }} animate={{
        opacity: [0, 1, 0],
        scale: [0, 1, 0]
      }} transition={{
        duration: Math.random() * 3 + 2,
        repeat: Infinity,
        delay: Math.random() * 2
      }} />)}
      </motion.div>
    </div>;
};
export default LandingPage;