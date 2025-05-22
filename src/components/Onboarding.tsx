import React, { useState } from 'react';
import Joyride, { Step, CallBackProps } from 'react-joyride';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';

interface OnboardingProps {
  isFirstVisit: boolean;
}

const Onboarding: React.FC<OnboardingProps> = ({ isFirstVisit }) => {
  const [isRunning, setIsRunning] = useState(isFirstVisit);
  const [showConfetti, setShowConfetti] = useState(false);

  const steps: Step[] = [
    {
      target: '.hero-section',
      content: 'Welcome to Airdrops Hunter! This is your gateway to discovering the best crypto airdrops.',
      placement: 'center',
    },
    {
      target: '.airdrop-list',
      content: 'Browse through our curated list of verified airdrops.',
      placement: 'bottom',
    },
    {
      target: '.filters-section',
      content: 'Use these filters to find airdrops that match your interests.',
      placement: 'bottom',
    },
    {
      target: '.newsletter-section',
      content: 'Subscribe to our newsletter to never miss new opportunities!',
      placement: 'top',
    },
  ];

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status, type } = data;
    
    if (status === 'finished') {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
    }
    
    if (['finished', 'skipped'].includes(status)) {
      setIsRunning(false);
    }
  };

  return (
    <>
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={200}
        />
      )}
      
      <Joyride
        steps={steps}
        run={isRunning}
        continuous
        showProgress
        showSkipButton
        callback={handleJoyrideCallback}
        styles={{
          options: {
            primaryColor: '#4F46E5',
            textColor: '#111827',
            backgroundColor: '#FFFFFF',
          },
          tooltip: {
            padding: '20px',
          },
          buttonNext: {
            backgroundColor: '#4F46E5',
          },
          buttonBack: {
            color: '#4F46E5',
          },
        }}
      />

      {!isRunning && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-4 right-4 bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-indigo-700 transition-colors duration-200"
          onClick={() => setIsRunning(true)}
        >
          Start Tour
        </motion.button>
      )}
    </>
  );
};

export default Onboarding;