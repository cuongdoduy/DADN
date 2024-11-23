import React from "react";

const BeautifulSlider = ({
  selectedValue,
  handleChange,
}: {
  selectedValue: number;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className="mx-auto w-full max-w-md p-6">
      {/* Title */}
      <div className="text-center mb-4 text-lg font-semibold text-gray-700">
        Select a Value
      </div>

      {/* Slider */}
      <div className="relative">
        <input
          type="range"
          min="0"
          max="100"
          value={selectedValue}
          onChange={handleChange}
          className="w-full appearance-none h-2 bg-gray-300 rounded-full outline-none transition-all duration-300 focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Selected Value Display */}
      <div className="text-center mt-4 text-2xl font-bold text-blue-500">
        {selectedValue}
      </div>
    </div>
  );
};

export default BeautifulSlider;
