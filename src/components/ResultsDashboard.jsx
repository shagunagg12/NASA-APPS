import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, DollarSign, Zap, Target, Waves } from 'lucide-react';

const ResultsDashboard = ({ results }) => {
  const [animatedValues, setAnimatedValues] = useState({
    populationAffected: 0,
    infrastructureDamage: 0,
    shockwaveRadius: 0,
    fireballRadius: 0,
    tsunamiRadius: 0,
    probability: 0
  });

  useEffect(() => {
    if (!results) return;

    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepDuration = duration / steps;

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      const easeProgress = 1 - Math.pow(1 - progress, 3); // Ease out cubic

      setAnimatedValues({
        populationAffected: Math.floor(results.populationAffected * easeProgress),
        infrastructureDamage: Math.floor(results.infrastructureDamage * easeProgress),
        shockwaveRadius: Math.floor(results.shockwaveRadius * easeProgress),
        fireballRadius: Math.floor(results.fireballRadius * easeProgress),
        tsunamiRadius: Math.floor(results.tsunamiRadius * easeProgress),
        probability: Math.floor(results.probability * easeProgress * 100) / 100
      });

      if (currentStep >= steps) {
        clearInterval(interval);
      }
    }, stepDuration);

    return () => clearInterval(interval);
  }, [results]);

  const formatNumber = (num) => {
    if (num >= 1e9) return (num / 1e9).toFixed(1) + 'B';
    if (num >= 1e6) return (num / 1e6).toFixed(1) + 'M';
    if (num >= 1e3) return (num / 1e3).toFixed(1) + 'K';
    return num.toLocaleString();
  };

  const formatCurrency = (num) => {
    if (num >= 1e12) return '$' + (num / 1e12).toFixed(1) + 'T';
    if (num >= 1e9) return '$' + (num / 1e9).toFixed(1) + 'B';
    if (num >= 1e6) return '$' + (num / 1e6).toFixed(1) + 'M';
    return '$' + num.toLocaleString();
  };

  const cards = [
    {
      title: 'Population Affected',
      value: formatNumber(animatedValues.populationAffected),
      icon: Users,
      color: 'text-red-400',
      bgColor: 'bg-red-400/10',
      borderColor: 'border-red-400/30'
    },
    {
      title: 'Infrastructure Damage',
      value: formatCurrency(animatedValues.infrastructureDamage),
      icon: DollarSign,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-400/10',
      borderColor: 'border-yellow-400/30'
    },
    {
      title: 'Shockwave Radius',
      value: `${animatedValues.shockwaveRadius} km`,
      icon: Zap,
      color: 'text-orange-400',
      bgColor: 'bg-orange-400/10',
      borderColor: 'border-orange-400/30'
    },
    {
      title: 'Fireball Radius',
      value: `${animatedValues.fireballRadius} km`,
      icon: Target,
      color: 'text-red-500',
      bgColor: 'bg-red-500/10',
      borderColor: 'border-red-500/30'
    },
    {
      title: 'Tsunami Radius',
      value: animatedValues.tsunamiRadius > 0 ? `${animatedValues.tsunamiRadius} km` : 'N/A',
      icon: Waves,
      color: 'text-blue-400',
      bgColor: 'bg-blue-400/10',
      borderColor: 'border-blue-400/30'
    },
    {
      title: 'Impact Probability',
      value: `${animatedValues.probability.toFixed(1)}%`,
      icon: Target,
      color: 'text-purple-400',
      bgColor: 'bg-purple-400/10',
      borderColor: 'border-purple-400/30'
    }
  ];

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="font-orbitron font-bold text-3xl text-center mb-8 neon-text">
          IMPACT ANALYSIS RESULTS
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`glass-card rounded-xl p-6 border ${card.borderColor} ${card.bgColor}`}
          >
            <div className="flex items-center justify-between mb-4">
              <card.icon className={`w-8 h-8 ${card.color}`} />
              <div className={`w-3 h-3 ${card.color.replace('text-', 'bg-')} rounded-full animate-pulse`} />
            </div>
            
            <div className="space-y-2">
              <h3 className="text-gray-300 text-sm font-medium">{card.title}</h3>
              <motion.div
                className={`text-3xl font-bold ${card.color} font-orbitron counter-animation`}
                key={animatedValues[card.title.toLowerCase().replace(/\s+/g, '')]}
              >
                {card.value}
              </motion.div>
            </div>

            <div className="mt-4 h-1 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className={`h-full ${card.color.replace('text-', 'bg-')} rounded-full`}
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 2, delay: index * 0.1 }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="glass-card rounded-xl p-6 mt-8"
      >
        <h3 className="font-orbitron font-bold text-xl text-white mb-4">Impact Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-gray-300 font-medium mb-2">Immediate Effects</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>• Fireball formation and thermal radiation</li>
              <li>• Seismic shockwaves and ground motion</li>
              <li>• Atmospheric pressure waves</li>
              <li>• Debris ejection and secondary impacts</li>
            </ul>
          </div>
          <div>
            <h4 className="text-gray-300 font-medium mb-2">Long-term Consequences</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>• Climate disruption from dust clouds</li>
              <li>• Economic and social infrastructure collapse</li>
              <li>• Potential mass extinction events</li>
              <li>• Global supply chain disruption</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ResultsDashboard;