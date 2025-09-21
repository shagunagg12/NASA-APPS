import React from 'react';
import { motion } from 'framer-motion';
import { Play, BarChart3, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';

const ControlPanel = ({ simulationData, onUpdate, onRunSimulation, onToggleComparison }) => {
  const predefinedLocations = [
    { name: 'New York', lat: 40.7128, lng: -74.0060 },
    { name: 'London', lat: 51.5074, lng: -0.1278 },
    { name: 'Tokyo', lat: 35.6762, lng: 139.6503 },
    { name: 'Sydney', lat: -33.8688, lng: 151.2093 },
    { name: 'Pacific Ocean', lat: 0, lng: -150 },
    { name: 'Atlantic Ocean', lat: 30, lng: -40 },
    { name: 'Sahara Desert', lat: 23, lng: 13 }
  ];

  const strategies = [
    { value: 'deflect', label: 'Deflect Orbit', description: 'Change asteroid trajectory' },
    { value: 'nuclear', label: 'Nuclear Detonation', description: 'Destroy or fragment asteroid' },
    { value: 'evacuation', label: 'Mass Evacuation', description: 'Relocate affected populations' },
    { value: 'nothing', label: 'Do Nothing', description: 'Baseline scenario' }
  ];

  return (
    <div className="space-y-6">
      <div className="glass-card rounded-xl p-6">
        <div className="flex items-center space-x-2 mb-6">
          <Settings className="w-6 h-6 text-blue-400" />
          <h2 className="font-orbitron font-bold text-xl text-white">Control Panel</h2>
        </div>

        <Tabs defaultValue="parameters" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-white/5">
            <TabsTrigger value="parameters" className="text-white">Parameters</TabsTrigger>
            <TabsTrigger value="strategy" className="text-white">Strategy</TabsTrigger>
          </TabsList>

          <TabsContent value="parameters" className="space-y-6 mt-6">
            <div className="space-y-4">
              <div>
                <Label className="text-white font-medium">Asteroid Size</Label>
                <div className="mt-2">
                  <Slider
                    value={[simulationData.asteroidSize]}
                    onValueChange={(value) => onUpdate({ asteroidSize: value[0] })}
                    max={200}
                    min={10}
                    step={5}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-400 mt-1">
                    <span>Small (10m)</span>
                    <span className="text-white font-medium">{simulationData.asteroidSize}m</span>
                    <span>Large (200m)</span>
                  </div>
                </div>
              </div>

              <div>
                <Label className="text-white font-medium">Impact Speed</Label>
                <div className="mt-2">
                  <Slider
                    value={[simulationData.speed]}
                    onValueChange={(value) => onUpdate({ speed: value[0] })}
                    max={50}
                    min={5}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-400 mt-1">
                    <span>Slow (5 km/s)</span>
                    <span className="text-white font-medium">{simulationData.speed} km/s</span>
                    <span>Fast (50 km/s)</span>
                  </div>
                </div>
              </div>

              <div>
                <Label className="text-white font-medium">Impact Angle</Label>
                <div className="mt-2">
                  <Slider
                    value={[simulationData.angle]}
                    onValueChange={(value) => onUpdate({ angle: value[0] })}
                    max={90}
                    min={0}
                    step={5}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-400 mt-1">
                    <span>Grazing (0°)</span>
                    <span className="text-white font-medium">{simulationData.angle}°</span>
                    <span>Direct (90°)</span>
                  </div>
                </div>
              </div>

              <div>
                <Label className="text-white font-medium">Impact Location</Label>
                <Select 
                  value={simulationData.location.name}
                  onValueChange={(value) => {
                    const location = predefinedLocations.find(loc => loc.name === value);
                    if (location) onUpdate({ location });
                  }}
                >
                  <SelectTrigger className="w-full mt-2 bg-white/5 border-white/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-white/20">
                    {predefinedLocations.map((location) => (
                      <SelectItem key={location.name} value={location.name} className="text-white">
                        {location.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="strategy" className="space-y-6 mt-6">
            <div className="space-y-4">
              <Label className="text-white font-medium">Mitigation Strategy</Label>
              {strategies.map((strategy) => (
                <motion.div
                  key={strategy.value}
                  className={`p-4 rounded-lg border cursor-pointer transition-all ${
                    simulationData.strategy === strategy.value
                      ? 'border-blue-400 bg-blue-400/10'
                      : 'border-white/20 bg-white/5 hover:bg-white/10'
                  }`}
                  onClick={() => onUpdate({ strategy: strategy.value })}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full border-2 ${
                      simulationData.strategy === strategy.value
                        ? 'border-blue-400 bg-blue-400'
                        : 'border-white/40'
                    }`} />
                    <div>
                      <div className="text-white font-medium">{strategy.label}</div>
                      <div className="text-sm text-gray-400">{strategy.description}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="space-y-4 mt-8">
          <Button
            onClick={onRunSimulation}
            disabled={simulationData.isRunning}
            className="w-full glow-button bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 text-white font-bold py-3 rounded-lg"
          >
            {simulationData.isRunning ? (
              <motion.div
                className="flex items-center space-x-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <motion.div
                  className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                <span>Running Simulation...</span>
              </motion.div>
            ) : (
              <>
                <Play className="w-5 h-5 mr-2" />
                RUN SIMULATION
              </>
            )}
          </Button>

          <Button
            onClick={onToggleComparison}
            variant="outline"
            className="w-full border-white/20 text-white hover:bg-white/10"
          >
            <BarChart3 className="w-5 h-5 mr-2" />
            Compare Strategies
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;