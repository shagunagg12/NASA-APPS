import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Globe, Info, Database } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const Navbar = ({ onBackToHome, showBackButton }) => {
  const { toast } = useToast();

  const handleAboutClick = () => {
    toast({
      title: "About",
       
    });
  };

  const handleDataSourcesClick = () => {
    toast({
      title: "Data Sources",
      
    });
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-white/10"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {showBackButton && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onBackToHome}
                className="text-white hover:bg-white/10"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            )}
            <div className="flex items-center space-x-2">
              <Globe className="w-8 h-8 text-blue-400" />
              <span className="font-orbitron font-bold text-xl text-white neon-text">
                AIS
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleAboutClick}
              className="text-white hover:bg-white/10"
            >
              <Info className="w-4 h-4 mr-2" />
              About
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDataSourcesClick}
              className="text-white hover:bg-white/10"
            >
              <Database className="w-4 h-4 mr-2" />
              Data Sources
            </Button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;