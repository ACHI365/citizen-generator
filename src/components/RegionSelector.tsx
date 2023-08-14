import React from 'react';
import { useMainContext } from '../context/MainContext';
import Select from "react-select";
import { Region } from '../types/types';
import { regions } from '../types/Region';

const RegionSelector: React.FC = () => {
    const {currentRegion, setCurrentRegion } = useMainContext();

    const regionVals = Object.values(regions).map((region) => ({
        value: region,
        label: region.label,
      }));
      
    return (
        <div style={{width:"200px"}}>
          <Select
            value={regionVals.find((region) => region.value === currentRegion)}
            onChange={(selectedRegion) =>
                setCurrentRegion(selectedRegion?.value as Region)
            }
            options={regionVals}
          />
        </div>
      );
  };
  
  export default RegionSelector;