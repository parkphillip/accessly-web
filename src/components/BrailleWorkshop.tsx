
import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Volume2 } from 'lucide-react';

const BrailleWorkshop = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showDots, setShowDots] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const steps = [
    {
      letter: 'H',
      braille: '⠓',
      pattern: [1, 0, 1, 1, 0, 0],
      description: 'The letter H uses dots 1, 2, and 5'
    },
    {
      letter: 'E',
      braille: '⠑',
      pattern: [1, 0, 0, 0, 1, 0],
      description: 'The letter E uses dots 1 and 5'
    },
    {
      letter: 'L',
      braille: '⠇',
      pattern: [1, 1, 1, 0, 0, 0],
      description: 'The letter L uses dots 1, 2, and 3'
    },
    {
      letter: 'P',
      braille: '⠏',
      pattern: [1, 1, 1, 1, 0, 0],
      description: 'The letter P uses dots 1, 2, 3, and 4'
    }
  ];

  const toggleAnimation = () => {
    setIsPlaying(prevIsPlaying => !prevIsPlaying);
  };

  const resetAnimation = () => {
    setIsPlaying(false);
    setCurrentStep(0);
    setShowDots(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentStep(prevStep => {
          if (prevStep >= steps.length - 1) {
            setIsPlaying(false);
            return prevStep;
          }
          return prevStep + 1;
        });
      }, 1500);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying]);

  useEffect(() => {
    setShowDots(true);
  }, [currentStep]);

  const currentLetterData = steps[currentStep];

  return (
    <section id="workshop" className="py-24 bg-light-bg">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-serif font-bold text-dark-text mb-4 headline-underline">
            Understanding Braille
          </h2>
          <p className="text-lg text-medium-text max-w-3xl mx-auto">
            Braille uses patterns of raised dots to represent letters. Each cell contains up to 6 dots arranged in two columns of three.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Interactive Demo */}
          <div className="structured-card p-8">
            <h3 className="text-2xl font-serif font-bold text-dark-text mb-6 text-center">
              Interactive Braille Demo
            </h3>
            
            {/* Current Letter Display */}
            <div className="text-center mb-8">
              <div className="text-6xl font-serif font-bold text-brand-navy mb-2">
                {currentLetterData.letter}
              </div>
              <div className="text-4xl mb-4">
                {currentLetterData.braille}
              </div>
              <p className="text-medium-text">
                {currentLetterData.description}
              </p>
            </div>

            {/* Braille Cell Pattern */}
            <div className="flex justify-center mb-8">
              <div className="grid grid-cols-2 gap-3 p-6 bg-subtle-gray rounded-lg">
                {currentLetterData.pattern.map((filled, index) => (
                  <div
                    key={index}
                    className={`w-6 h-6 rounded-full border-2 transition-all duration-500 ${
                      filled
                        ? 'bg-brand-navy border-brand-navy shadow-lg'
                        : 'bg-off-white border-light-gray'
                    }`}
                    style={{
                      transform: showDots && filled ? 'scale(1.1)' : 'scale(1)',
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Controls */}
            <div className="flex justify-center gap-4">
              <button
                onClick={toggleAnimation}
                className="flex items-center gap-2 px-6 py-3 bg-brand-navy text-off-white rounded-md hover:bg-brand-navy/90 transition-colors"
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                {isPlaying ? 'Pause' : 'Play'}
              </button>
              
              <button
                onClick={resetAnimation}
                className="flex items-center gap-2 px-6 py-3 bg-medium-text text-off-white rounded-md hover:bg-medium-text/90 transition-colors"
              >
                <RotateCcw className="w-5 h-5" />
                Reset
              </button>
            </div>

            {/* Progress Indicator */}
            <div className="mt-6">
              <div className="flex justify-between text-sm text-medium-text mb-2">
                <span>Progress</span>
                <span>{currentStep + 1} / {steps.length}</span>
              </div>
              <div className="w-full bg-light-gray rounded-full h-2">
                <div
                  className="bg-brand-terracotta h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Information Side */}
          <div className="space-y-8">
            <div className="structured-card p-6">
              <h4 className="text-xl font-serif font-bold text-dark-text mb-4">
                Did You Know?
              </h4>
              <ul className="space-y-3 text-medium-text">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-brand-terracotta rounded-full mt-2 mr-3 shrink-0"></span>
                  Braille was invented in 1824 by Louis Braille, who was just 15 years old
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-brand-terracotta rounded-full mt-2 mr-3 shrink-0"></span>
                  Each braille cell can represent 64 different combinations
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-brand-terracotta rounded-full mt-2 mr-3 shrink-0"></span>
                  Grade 2 braille uses contractions to save space and reading time
                </li>
              </ul>
            </div>

            <div className="structured-card p-6">
              <h4 className="text-xl font-serif font-bold text-dark-text mb-4">
                Why Braille Menus Matter
              </h4>
              <p className="text-medium-text leading-relaxed">
                Physical braille menus provide independence and privacy that digital alternatives cannot match. 
                They allow diners to browse at their own pace without relying on others or technology that might fail.
              </p>
            </div>

            <div className="structured-card p-6 bg-brand-navy text-off-white">
              <h4 className="text-xl font-serif font-bold mb-4">
                Restaurant Benefits
              </h4>
              <ul className="space-y-2 text-off-white/90">
                <li>✓ Shows commitment to accessibility</li>
                <li>✓ Builds customer loyalty</li>
                <li>✓ Demonstrates social responsibility</li>
                <li>✓ Creates inclusive dining environment</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrailleWorkshop;
