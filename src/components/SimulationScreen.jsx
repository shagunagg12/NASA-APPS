import React, { useState } from 'react';
import { motion } from 'framer-motion';
import GlobeVisualization from '@/components/GlobeVisualization';
import ControlPanel from '@/components/ControlPanel';
import ResultsDashboard from '@/components/ResultsDashboard';
import StrategyComparison from '@/components/StrategyComparison';

const SimulationScreen = () => {
  const [simulationData, setSimulationData] = useState({
    asteroidSize: 50,
    speed: 20,
    angle: 45,
    location: { lat: 40.7128, lng: -74.0060, name: 'New York' },
    strategy: 'deflect',
    isRunning: false,
    results: null
  });

  const [showComparison, setShowComparison] = useState(false);

  const handleSimulationUpdate = (newData) => {
    setSimulationData(prev => ({ ...prev, ...newData }));
  };

  const handleRunSimulation = () => {
    setSimulationData(prev => ({ ...prev, isRunning: true }));
    
    // Simulate calculation time
    setTimeout(() => {
      const results = calculateImpactResults(simulationData);
      setSimulationData(prev => ({ 
        ...prev, 
        isRunning: false, 
        results 
      }));
    }, 3000);
  };

  const calculateImpactResults = (data) => {
    const sizeMultiplier = data.asteroidSize / 100;
    const speedMultiplier = data.speed / 100;
    const angleMultiplier = Math.sin((data.angle * Math.PI) / 180);
    
    const baseDamage = sizeMultiplier * speedMultiplier * angleMultiplier;
    
    return {
      populationAffected: Math.floor(baseDamage * 10000000),
      infrastructureDamage: Math.floor(baseDamage * 500000000000),
      shockwaveRadius: Math.floor(baseDamage * 500),
      fireballRadius: Math.floor(baseDamage * 200),
      tsunamiRadius: data.location.name.includes('Ocean') ? Math.floor(baseDamage * 1000) : 0,
      probability: Math.random() * 100
    };
  };

  return (
    <div className="min-h-screen pt-20 pb-8">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="font-orbitron font-bold text-4xl md:text-5xl text-center mb-4 neon-text">
            IMPACT SIMULATION
          </h1>
          <p className="text-center text-gray-300 text-lg">
            Configure parameters and visualize asteroid impact scenarios
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-10 gap-6 mb-8">
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <GlobeVisualization 
              simulationData={simulationData}
              onLocationSelect={(location) => handleSimulationUpdate({ location })}
            />
          </motion.div>

          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <ControlPanel
              simulationData={simulationData}
              onUpdate={handleSimulationUpdate}
              onRunSimulation={handleRunSimulation}
              onToggleComparison={() => setShowComparison(!showComparison)}
            />
          </motion.div>
        </div>

        {simulationData.results && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <ResultsDashboard results={simulationData.results} />
          </motion.div>
        )}

        {showComparison && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <StrategyComparison simulationData={simulationData} />
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default SimulationScreen;