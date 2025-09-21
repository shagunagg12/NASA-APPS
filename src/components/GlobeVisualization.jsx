import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';

const GlobeVisualization = ({ simulationData, onLocationSelect }) => {
  const globeRef = useRef();
  const [isLoaded, setIsLoaded] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Simulate globe loading
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleGlobeClick = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    // Convert click coordinates to lat/lng (simplified)
    const lat = 90 - (y / rect.height) * 180;
    const lng = (x / rect.width) * 360 - 180;
    
    const location = {
      lat: Math.round(lat * 100) / 100,
      lng: Math.round(lng * 100) / 100,
      name: getLocationName(lat, lng)
    };
    
    onLocationSelect(location);
    
    toast({
      title: "Impact Location Selected",
      description: `Target: ${location.name} (${location.lat}°, ${location.lng}°)`
    });
  };

  const getLocationName = (lat, lng) => {
    if (Math.abs(lat) < 30 && Math.abs(lng) < 30) return 'Central Africa';
    if (lat > 30 && lng > -30 && lng < 60) return 'Europe/Asia';
    if (lat > 30 && lng < -60) return 'North America';
    if (lat < -30 && lng > 100) return 'Australia';
    if (lat < -30 && lng < -30) return 'South America';
    if (Math.abs(lng) > 150) return 'Pacific Ocean';
    if (lng < -30 && lng > -100) return 'Atlantic Ocean';
    return 'Indian Ocean';
  };

  return (
    <div className="glass-card rounded-xl p-6 h-[600px] relative overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-orbitron font-bold text-2xl text-white">Earth Impact Visualization</h2>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-400">Live Simulation</span>
        </div>
      </div>

      <div 
        ref={globeRef}
        className="relative w-full h-[500px] bg-gradient-to-b from-blue-900 to-blue-950 rounded-lg cursor-crosshair overflow-hidden"
        onClick={handleGlobeClick}
      >
        {!isLoaded ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          </div>
        ) : (
          <>
            {/* Earth representation */}
            <img 
              className="w-full h-full object-cover rounded-lg opacity-80"
              alt="Earth from space showing continents and oceans"
             src="https://images.unsplash.com/photo-1643330683233-ff2ac89b002c" />

            {/* Population density heatmap overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/20 to-transparent opacity-60"></div>
            <div className="absolute top-1/4 left-1/3 w-20 h-20 bg-red-500/30 rounded-full blur-xl"></div>
            <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-yellow-500/30 rounded-full blur-xl"></div>
            <div className="absolute bottom-1/3 left-1/2 w-12 h-12 bg-orange-500/30 rounded-full blur-xl"></div>

            {/* Asteroid trajectory */}
            {simulationData.isRunning && (
              <motion.div
                className="absolute w-2 h-2 bg-red-500 rounded-full asteroid-trail"
                initial={{ 
                  x: -50, 
                  y: 50,
                  scale: 0.5
                }}
                animate={{ 
                  x: simulationData.location.lng * 2 + 250,
                  y: -simulationData.location.lat * 2 + 250,
                  scale: 1.5
                }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
            )}

            {/* Impact location marker */}
            {simulationData.location && (
              <motion.div
                className="absolute w-4 h-4 bg-red-500 rounded-full border-2 border-white"
                style={{
                  left: `${((simulationData.location.lng + 180) / 360) * 100}%`,
                  top: `${((90 - simulationData.location.lat) / 180) * 100}%`,
                  transform: 'translate(-50%, -50%)'
                }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute inset-0 bg-red-500 rounded-full animate-ping"></div>
              </motion.div>
            )}

            {/* Shockwave rings */}
            {simulationData.results && (
              <>
                {[1, 2, 3].map((ring) => (
                  <motion.div
                    key={ring}
                    className="absolute border-2 border-red-500 rounded-full"
                    style={{
                      left: `${((simulationData.location.lng + 180) / 360) * 100}%`,
                      top: `${((90 - simulationData.location.lat) / 180) * 100}%`,
                      transform: 'translate(-50%, -50%)'
                    }}
                    initial={{ width: 0, height: 0, opacity: 1 }}
                    animate={{ 
                      width: ring * 100, 
                      height: ring * 100, 
                      opacity: 0 
                    }}
                    transition={{ 
                      duration: 2, 
                      delay: ring * 0.5,
                      ease: "easeOut"
                    }}
                  />
                ))}
              </>
            )}

            {/* Grid overlay */}
            <div className="absolute inset-0 opacity-20">
              <svg className="w-full h-full">
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="cyan" strokeWidth="1"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>
          </>
        )}
      </div>

      <div className="mt-4 text-sm text-gray-400">
        Click anywhere on Earth to select impact location
      </div>
    </div>
  );
};

export default GlobeVisualization;