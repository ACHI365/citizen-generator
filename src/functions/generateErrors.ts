import { regions } from "../types/Region";
import { ChangableElements, Region, Citizen } from "../types/types";

let region = regions.US
let { faker, alphabet } = region;

export function applyErrs(citizens: Citizen[], errCnt: number, regionLoc: Region) {
    region = regionLoc;
    faker = regionLoc.faker;
    alphabet = regionLoc.alphabet;

    return citizens.map((citizen) => {
      citizen = {
        ...citizen,
      };
      const numErrs = getErrCnt(region, errCnt);
      for (let i = 0; i < numErrs; i++) {
        const attr = rndAttr();
        intrErrSingle(citizen, attr.v as ChangableElements, attr.t);
      }
      return citizen;
    });
  }
  
const charGens: Record<string, () => string> = {
  num: () => faker.number.int({ max: 9 }).toString(),
  alphaNum: () =>
    faker.helpers.arrayElement([...alphabet, ..."0123456789".split("")]),
  def: () => faker.helpers.arrayElement(alphabet),
};

function genErrChar(changeType: string): string {
  const gen = charGens[changeType] || charGens.def;
  return gen();
}

function swapChars(arr: string[], errPos: number) {
  const t = arr[errPos];
  arr[errPos] = arr[errPos + 1];
  arr[errPos + 1] = t;
}

function rndAttr(): AttrDefinition {
  const { faker, hasMiddleName } = region;

  const attributes: AttrDefinition[] = [
    { v: "firstName", t: "alpha" },
    ...(hasMiddleName ? [{ v: "middleName", t: "alpha" }] : []),
    { v: "lastName", t: "alpha" },
    { v: "address", t: "alphaNum" },
    { v: "phoneNumber", t: "num" },
  ];

  return faker.helpers.arrayElement(attributes);
}

function mkErr(attrValue: string, errType: number, errChar: string, errPos: number): string {
  const attrValueArr = attrValue.split("");

  if (errType === 0) {
    attrValueArr[errPos] = "";
  } else if (errType === 1) {
    attrValueArr.splice(errPos, 0, errChar);
  } else {
    swapChars(attrValueArr, errPos);
  }

  return attrValueArr.join("");
}

interface AttrDefinition {
  v: string;
  t: string;
}

function intrErrSingle(citizen: Citizen, attr: ChangableElements, changeType: string) {
  const errPos = faker.number.int({
    max: (citizen[attr].length || 1) - 1,
  });
  const errType = faker.number.int({ max: 2 });
  let errChar = genErrChar(changeType);
  citizen[attr] = mkErr(citizen[attr], errType, errChar, errPos);
}

function getErrCnt(region: Region, errCnt: number): number {
  const [intPart, fracPart] = extractIntegerAndFraction(errCnt);
  const rndNum = generateRandomNumber(region);
  const totalErr = calculateHowMany(intPart, fracPart, rndNum);
  return totalErr;
}

function extractIntegerAndFraction(value: number): [number, number] {
  const intPart = Math.floor(value);
  const fracPart = value - intPart;
  return [intPart, fracPart];
}

function generateRandomNumber(region: Region): number {
  return region.faker.number.float({ max: 0.99 });
}

function calculateHowMany(intPart: number, fracPart: number, rndNum: number): number {
  return rndNum < fracPart ? intPart + 1 : intPart;
}
