// src/components/EmptyStateAnimation.js

import React from 'react';
import Lottie from 'lottie-react';
import animationData from '../../assets/empty-state-animation.json';

export default function EmptyStateAnimation() {
  return (
    <div className="w-48 h-48">
      <Lottie animationData={animationData} loop={true} />
    </div>
  );
}