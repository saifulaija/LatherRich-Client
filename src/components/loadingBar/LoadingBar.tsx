import React from 'react';

interface LoadingBarProps {
  progress: number;
}

const LoadingBar: React.FC<LoadingBarProps> = ({ progress }) => {
  return (
    <div
      className="h-2 bg-red-500"
      style={{ width: `${progress}%`, transition: 'width 2s ease' }}
    ></div>
  );
};

export default LoadingBar;
