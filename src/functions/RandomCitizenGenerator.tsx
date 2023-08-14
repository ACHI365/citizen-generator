import React, { useState, useEffect} from "react";
import { Faker } from "@faker-js/faker";
import CitizenTable from "../components/CitizenTable";
import Toolbar from "../components/Toolbar";
import pageSeed from "./pageSeed";
import { useMainContext } from "../context/MainContext";
import {applyErrs  } from "./generateErrors";
import { Citizen } from "../types/types";

const RandomCitizenGenerator: React.FC = () => {
  const {
    currentRegion,
    citizens,
    setCitizens,
    errorCount,
    setErrorCount,
    citizenSeed,
    setFinalCitizens,
    finalCitizens
  } = useMainContext();
  const [currPage, setCurrPage] = useState<number>(0);
  const [generateRandomCitizen, setGenerateRandomCitizen] = useState<any>(null);

  let CitizenIndx = 1;

  function generateRandomAddress(faker: Faker): string {
    return faker.helpers.arrayElement([
      faker.location.streetAddress(),
      faker.location.streetAddress(true),
    ]);
  }

  const generateParent = (faker: Faker) => {
    const generateRandomCitizen = () => {
      return {
        index: CitizenIndx++,
        id: faker.database.mongodbObjectId(),
        firstName: faker.person.firstName(),
        middleName: faker.person.middleName(),
        lastName: faker.person.lastName(),
        address: generateRandomAddress(faker),
        phoneNumber: faker.phone.number(),
      };
    };

    return generateRandomCitizen;
  };

  const nextPage = () => {
    const { newErrorcitizens, newcitizens } = fetchcitizens(10, currPage + 1);
    setCurrPage(currPage + 1);
    setCitizens([...citizens, ...newcitizens]);
    setFinalCitizens([...finalCitizens, ...newErrorcitizens]);
  };

  const fetchcitizens = (pageSize = 10, pageNum: number) => {
    currentRegion.faker.seed(pageSeed(pageNum, citizenSeed));
    const newcitizens = Array.from({ length: pageSize }, () =>
      generateRandomCitizen()
    );
    currentRegion.faker.seed(pageSeed(pageNum, citizenSeed));
    const newErrorcitizens = applyErrs(newcitizens, errorCount, currentRegion);
    return {
      newcitizens,
      newErrorcitizens,
    };
  };

  useEffect(() => {
    setGenerateRandomCitizen(() => generateParent(currentRegion.faker));
  }, [currentRegion, citizenSeed]);

  useEffect(() => {
    if (generateRandomCitizen) {
      const { newErrorcitizens, newcitizens } = fetchcitizens(20, 1);
      setCurrPage(1);
      setCitizens(newcitizens);
      setFinalCitizens(newErrorcitizens);
    }
  }, [generateRandomCitizen]);
  
  function getcitizensByPage(pageNum: number) {
    const startIndex = pageNum === 1 ? 0 : (pageNum - 1) * 20;
    const endIndex = pageNum * 20;
    return citizens.slice(startIndex, endIndex);
  }
  
  function getAlteredcitizens(untilPage: number) {
    const alteredcitizens: Citizen[] = [];
  
    for (let i = 1; i <= untilPage; i++) {
      const pageSeedValue = pageSeed(i, citizenSeed);
      currentRegion.faker.seed(pageSeedValue);
      
      const newErrorcitizens = applyErrs(getcitizensByPage(i), errorCount, currentRegion);
      alteredcitizens.push(...newErrorcitizens);
    }
  
    return alteredcitizens;
  }

  useEffect(() => {
    if (generateRandomCitizen) {
      const newErrorcitizens = getAlteredcitizens(currPage);
      setFinalCitizens(newErrorcitizens);
    }
  }, [errorCount]);

  const handleSliderChange = (newErrorCount: number) => {
    setErrorCount(newErrorCount);
  };
  console.log(errorCount);

  return (
    <div>
      <Toolbar errorCount={errorCount} onSliderChange={handleSliderChange} />
      <CitizenTable
        citizens={finalCitizens}
        hasMiddleName={currentRegion.hasMiddleName}
        nextPage={nextPage}
      />
    </div>
  );
};

export default RandomCitizenGenerator;