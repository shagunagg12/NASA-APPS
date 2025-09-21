import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

const StrategyComparison = ({ simulationData }) => {
  const strategies = [
    {
      name: 'Deflect Orbit',
      livesSaved: 8500000,
      cost: 50000000000,
      successProbability: 75,
      timeRequired: 24,
      description: 'Gradually change asteroid trajectory using gravitational tractors or kinetic impactors'
    },
    {
      name: 'Nuclear Detonation',
      livesSaved: 6200000,
      cost: 25000000000,
      successProbability: 60,
      timeRequired: 6,
      description: 'Destroy or fragment asteroid using nuclear explosives'
    },
    {
      name: 'Mass Evacuation',
      livesSaved: 9200000,
      cost: 100000000000,
      successProbability: 95,
      timeRequired: 12,
      description: 'Relocate populations from impact zones to safe areas'
    },
    {
      name: 'Do Nothing',
      livesSaved: 0,
      cost: 0,
      successProbability: 0,
      timeRequired: 0,
      description: 'Baseline scenario with no intervention'
    }
  ];

  const chartData = strategies.map(strategy => ({
    name: strategy.name.split(' ')[0],
    livesSaved: strategy.livesSaved / 1000000,
    cost: strategy.cost / 1000000000,
    success: strategy.successProbability,
    time: strategy.timeRequired
  }));

  const radarData = strategies.slice(0, 3).map(strategy => ({
    strategy: strategy.name.split(' ')[0],
    effectiveness: (strategy.livesSaved / 10000000) * 100,
    feasibility: strategy.successProbability,
    speed: 100 - (strategy.timeRequired / 24) * 100,
    costEfficiency: 100 - (strategy.cost / 100000000000) * 100
  }));

  const formatCurrency = (value) => `$${value}B`;
  const formatLives = (value) => `${value}M`;

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="font-orbitron font-bold text-3xl text-center mb-8 neon-text">
          STRATEGY COMPARISON
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="glass-card rounded-xl p-6"
        >
          <h3 className="font-orbitron font-bold text-xl text-white mb-6">Lives Saved vs Cost</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis 
                dataKey="name" 
                stroke="rgba(255,255,255,0.7)"
                fontSize={12}
              />
              <YAxis 
                yAxisId="left"
                stroke="rgba(255,255,255,0.7)"
                fontSize={12}
              />
              <YAxis 
                yAxisId="right"
                orientation="right"
                stroke="rgba(255,255,255,0.7)"
                fontSize={12}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'rgba(0,0,0,0.8)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '8px',
                  color: 'white'
                }}
                formatter={(value, name) => {
                  if (name === 'livesSaved') return [formatLives(value), 'Lives Saved'];
                  if (name === 'cost') return [formatCurrency(value), 'Cost'];
                  return [value, name];
                }}
              />
              <Bar 
                yAxisId="left"
                dataKey="livesSaved" 
                fill="#10b981" 
                name="livesSaved"
                radius={[4, 4, 0, 0]}
              />
              <Bar 
                yAxisId="right"
                dataKey="cost" 
                fill="#f59e0b" 
                name="cost"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="glass-card rounded-xl p-6"
        >
          <h3 className="font-orbitron font-bold text-xl text-white mb-6">Strategy Effectiveness</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="rgba(255,255,255,0.2)" />
              <PolarAngleAxis 
                dataKey="strategy" 
                tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }}
              />
              <PolarRadiusAxis 
                angle={90} 
                domain={[0, 100]}
                tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 10 }}
              />
              <Radar
                name="Effectiveness"
                dataKey="effectiveness"
                stroke="#8884d8"
                fill="#8884d8"
                fillOpacity={0.3}
                strokeWidth={2}
              />
              <Radar
                name="Feasibility"
                dataKey="feasibility"
                stroke="#82ca9d"
                fill="#82ca9d"
                fillOpacity={0.3}
                strokeWidth={2}
              />
              <Radar
                name="Speed"
                dataKey="speed"
                stroke="#ffc658"
                fill="#ffc658"
                fillOpacity={0.3}
                strokeWidth={2}
              />
            </RadarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {strategies.map((strategy, index) => (
          <motion.div
            key={strategy.name}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
            className={`glass-card rounded-xl p-6 ${
              strategy.name === 'Do Nothing' 
                ? 'border-red-500/30 bg-red-500/5' 
                : 'border-blue-400/30 bg-blue-400/5'
            }`}
          >
            <h4 className="font-orbitron font-bold text-lg text-white mb-4">
              {strategy.name}
            </h4>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400 text-sm">Lives Saved:</span>
                <span className="text-green-400 font-bold">
                  {strategy.livesSaved > 0 ? formatLives(strategy.livesSaved / 1000000) : 'None'}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-400 text-sm">Cost:</span>
                <span className="text-yellow-400 font-bold">
                  {strategy.cost > 0 ? formatCurrency(strategy.cost / 1000000000) : 'Free'}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-400 text-sm">Success Rate:</span>
                <span className="text-blue-400 font-bold">{strategy.successProbability}%</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-400 text-sm">Time Required:</span>
                <span className="text-purple-400 font-bold">
                  {strategy.timeRequired > 0 ? `${strategy.timeRequired}mo` : 'N/A'}
                </span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-white/10">
              <p className="text-xs text-gray-400 leading-relaxed">
                {strategy.description}
              </p>
            </div>

            <div className="mt-4">
              <div className="w-full bg-white/10 rounded-full h-2">
                <motion.div
                  className={`h-2 rounded-full ${
                    strategy.successProbability > 70 ? 'bg-green-500' :
                    strategy.successProbability > 40 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  initial={{ width: 0 }}
                  animate={{ width: `${strategy.successProbability}%` }}
                  transition={{ duration: 1, delay: 0.8 + index * 0.1 }}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default StrategyComparison;