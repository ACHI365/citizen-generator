import React from 'react';
import InputNumber from 'rc-input-number';

type SeedProps = {
  citizenSeed: number;
  setCitizenSeed: React.Dispatch<React.SetStateAction<number>>;
};

const Seed: React.FC<SeedProps> = ({ citizenSeed, setCitizenSeed }) => {
  function getRandomInteger() {
    return Math.floor(Math.random() * (1_000_000_000));
  }

  const handleClick = () => {
    setCitizenSeed(getRandomInteger());
  };

  return (
    <div className="d-flex flex-row justify-content-between align-items-center" style={{marginLeft:"15px"}}>
      <div className="random-seed-button">
        <button className="btn btn-secondary" onClick={handleClick}>
          Random Seed
        </button>
      </div>
      <div className="input-number-container">
        <InputNumber
          value={citizenSeed}
          style={{marginLeft:"15px"}}
          precision={0}
          onChange={(newValue) => {
            if (newValue || newValue === 0) {
              setCitizenSeed(newValue);
            }
          }}
        />
      </div>
    </div>
  );
};

export default Seed;
