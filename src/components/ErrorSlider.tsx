import InputNumber from 'rc-input-number';
import React from 'react';
import "./styles/style.css"

interface ErrorSliderProps {
  errorCount: number;
  onChange: (errorCount: number) => void;
}

const ErrorSlider: React.FC<ErrorSliderProps> = ({ errorCount, onChange }) => {
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newErrorCount = parseFloat(e.target.value);
    onChange(newErrorCount);
  };

  return (
    <div className="toolbar d-flex flex-row justify-content-between align-items-center" style={{marginLeft:"15px"}}>
      <div className="slider-container ">
        <input
          type="range"
          className="form-range"
          min={0}
          max={10}
          step={0.01}
          value={errorCount}
          onChange={handleSliderChange}
        />
      </div>
      <div className="input-number-container" >
        <InputNumber
          min={0}
          max={10000}
          step={0.01}
          value={errorCount}
          style={{marginLeft:"15px"}}
          precision={2}
          onChange={(newValue) => {
            if (newValue || newValue === 0) {
              onChange(newValue);
            }
          }}
          className="custom-input"
        />
      </div>
    </div>
  );
};

export default ErrorSlider;
