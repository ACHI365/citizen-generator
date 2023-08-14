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
        intrErrSingle(
          citizen,
          attr.v as ChangableElements,
          attr.t
        );
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

function rndAttr() {
  const { faker, hasMiddleName } = region;

  return faker.helpers.arrayElement([
    { v: "firstName", t: "alpha" },
    ...(hasMiddleName ? [{ v: "middleName", t: "alpha" }] : []),
    { v: "lastName", t: "alpha" },
    { v: "address", t: "alphanumeric" },
    { v: "phoneNumber", t: "numeric" },
  ]);
}

function mkErr(attrValue: string,errType: number,errChar: string,errPos: number) {
  let attrValueArr = attrValue.split("");
  if (errType === 0) {
    attrValueArr[errPos] = "";
  } else if (errType === 1) {
    attrValueArr.splice(errPos, 0, errChar);
  } else {
    swapChars(attrValueArr, errPos);
  }
  return attrValueArr.join("");
}

function intrErrSingle(citizen: Citizen, attr: ChangableElements, changeType: string) {
  const errPos = faker.number.int({
    max: (citizen[attr].length || 1) - 1,
  });
  const errType = faker.number.int({ max: 2 });
  let errChar = genErrChar(changeType);
  citizen[attr] = mkErr(
    citizen[attr],
    errType,
    errChar,
    errPos
  );
}

function getErrCnt(region: Region, errCnt: number) {
  const intPart = Math.floor(errCnt);
  const fracPart = errCnt - intPart;
  const rndNum = region.faker.number.float({ max: 0.99 });
  const howMany = rndNum < fracPart ? intPart + 1 : intPart;
  return howMany;
}