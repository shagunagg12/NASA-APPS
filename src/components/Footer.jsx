import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 1 }}
      className="mt-20 border-t border-white/10 bg-black/20"
    >
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <span className="font-orbitron font-bold text-xl text-white neon-text">
              Asteroid Impact Simulator
            </span>
            <p className="text-gray-400 mt-2 text-sm">
              Advanced simulation platform for asteroid impact analysis and mitigation strategy evaluation.
            </p>
          </div>

          <div>
            <span className="font-semibold text-white">Data Sources</span>
            <div className="mt-3 space-y-2">
              <a 
                href="#" 
                className="flex items-center text-gray-400 hover:text-white transition-colors text-sm"
              >
                NASA JPL Small-Body Database
                <ExternalLink className="w-3 h-3 ml-1" />
              </a>
              <a 
                href="#" 
                className="flex items-center text-gray-400 hover:text-white transition-colors text-sm"
              >
                ESA Space Situational Awareness
                <ExternalLink className="w-3 h-3 ml-1" />
              </a>
              <a 
                href="#" 
                className="flex items-center text-gray-400 hover:text-white transition-colors text-sm"
              >
                USGS Earthquake Hazards
                <ExternalLink className="w-3 h-3 ml-1" />
              </a>
            </div>
          </div>

          <div>
            <span className="font-semibold text-white">Acknowledgments</span>
            <div className="mt-3 space-y-2 text-sm text-gray-400">
              <p>Built with NASA planetary defense research</p>
              <p>Impact models based on peer-reviewed studies</p>
              <p>Population data from UN World Population Prospects</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-6 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 Asteroid Impact Simulator. Educational simulation for research and awareness purposes.
          </p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;