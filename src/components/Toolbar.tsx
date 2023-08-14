import React from 'react';
import RegionSelector from './RegionSelector';
import ErrorSlider from './ErrorSlider'; // Import the ErrorSlider component
import { useMainContext } from '../context/MainContext';
import CsvDownload from './CsvDownload';
import Seed from './Seed';

interface ToolbarProps {
  errorCount: number;
  onSliderChange: (errorCount: number) => void;
}

const Toolbar: React.FC<ToolbarProps> = ({ errorCount, onSliderChange }) => {
  const {finalCitizens, currentRegion, citizenSeed, setCitizenSeed} = useMainContext();
  
  return (
    <div className="toolbar d-flex flex-row m-2">
      <RegionSelector />
      <ErrorSlider errorCount={errorCount} onChange={onSliderChange} />
      <CsvDownload citizens={finalCitizens} currentRegion={currentRegion}/>
      <Seed citizenSeed={citizenSeed} setCitizenSeed={setCitizenSeed}/>
    </div>
  );
};

export default Toolbar;
