import React, { useState } from 'react';

const Slider = ({setZoom}) => {
  const [distance, setDistance] = useState(1);

  const handleDistanceChange = (e) => {
    setDistance(Number(e.target.value));
    setZoom(10+Number(e.target.value));

  };

  return (
    <div className="w-64 bg-neutral-200 p-3 rounded-lg shadow-xl ml-16">
      <div className="flex items-center mb-4">
        <div className="text-xl font-semibold text-gray-800 mr-4">Distance:</div>
        <div className="text-xl font-semibold text-gray-800 ml-20">{distance} km</div>
      </div>
      <div className="relative">
        <input
          type="range"
          min={1}
          max={5}
          value={distance}
          onChange={handleDistanceChange}
          className="absolute top-1/2 left-0 w-full h-1 -translate-y-1/2 thumb:z-20 thumb:w-8 thumb:h-8 thumb:bg-gray-800 thumb:rounded-full thumb:shadow-lg thumb:outline-none"
          style={{ background: 'transparent' }}
        />
        <div
          className="absolute top-1/2 left-0 w-1/5 h-1 -translate-y-1/2 bg-gray-800 rounded-full"
          style={{ width: `${(distance / 5) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

export default Slider;
