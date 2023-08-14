import React, { useContext, createContext, useState, useEffect } from "react";
import { Region, Citizen } from "../types/types";
import { regions } from "../types/Region";

const MainContextProp = createContext(
  {} as {
    citizens: Citizen[];
    setCitizens: React.Dispatch<React.SetStateAction<Citizen[]>>;
    finalCitizens: Citizen[];
    setFinalCitizens: React.Dispatch<React.SetStateAction<Citizen[]>>;
    citizenSeed: number;
    setCitizenSeed: React.Dispatch<React.SetStateAction<number>>;
    currentRegion: Region;
    setCurrentRegion: React.Dispatch<React.SetStateAction<Region>>;
    errorCount: number;
    setErrorCount: React.Dispatch<React.SetStateAction<number>>;
  }
);

export function MainContext({ children }: { children: React.ReactNode }) {
  const [currentRegion, setCurrentRegion] = useState<Region>(regions.US);
  const [errorCount, setErrorCount] = useState<number>(0);
  const [citizenSeed, setCitizenSeed] = useState<number>(0);
  const [citizens, setCitizens] = useState<Citizen[]>([]);
  const [finalCitizens, setFinalCitizens] = useState<Citizen[]>([]);

  function getRandomInteger() {
    return Math.floor(Math.random() * (1_000_000_000 - 0));
  }

  useEffect(() => {
    setCitizenSeed(getRandomInteger());
  }, []);

  return (
    <MainContextProp.Provider
      value={{
        citizens,
        setCitizens,
        finalCitizens,
        setFinalCitizens,
        citizenSeed,
        setCitizenSeed,
        currentRegion,
        setCurrentRegion,
        errorCount,
        setErrorCount
      }}
    >
      {children}
    </MainContextProp.Provider>
  );
}

export function useMainContext() {
  return useContext(MainContextProp);
}