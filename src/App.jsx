import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from '@/components/ui/toaster';
import Navbar from '@/components/Navbar';
import LandingPage from '@/components/LandingPage';
import SimulationScreen from '@/components/SimulationScreen';
import Footer from '@/components/Footer';

function App() {
  const [currentScreen, setCurrentScreen] = useState('landing');

  const handleStartSimulation = () => {
    setCurrentScreen('simulation');
  };

  const handleBackToHome = () => {
    setCurrentScreen('landing');
  };

  return (
    <>
      <Helmet>
        <title>Asteroid Impact Simulator - Visualize Cosmic Threats</title>
        <meta name="description" content="Advanced asteroid impact simulation tool. Visualize asteroid risks, simulate impacts, and explore mitigation strategies with interactive 3D Earth visualization." />
      </Helmet>
      
      <div className="min-h-screen space-bg">
        <Navbar onBackToHome={handleBackToHome} showBackButton={currentScreen !== 'landing'} />
        
        <AnimatePresence mode="wait">
          {currentScreen === 'landing' && (
            <motion.div
              key="landing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <LandingPage onStartSimulation={handleStartSimulation} />
            </motion.div>
          )}
          
          {currentScreen === 'simulation' && (
            <motion.div
              key="simulation"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              <SimulationScreen />
            </motion.div>
          )}
        </AnimatePresence>
        
        <Footer />
        <Toaster />
      </div>
    </>
  );
}

export default App;