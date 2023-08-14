import { Region, Citizen } from "../types/types";
import { Parser } from "@json2csv/plainjs";

export default function csvDownloader(citizens: Citizen[], filename: string, currentRegion: Region) {
  const parser = new Parser({});
  const data = parser.parse(convertToCSV(citizens, currentRegion))
  const blob = new Blob([data], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

const convertToCSV = (citizens: Citizen[], currentRegion: Region) => {
  return citizens.map((citizen) => {
    if (currentRegion.hasMiddleName) {
      return citizen;
    } else {
      const newCitizen = { ...citizen } as any;
      delete newCitizen.middleName;
      return newCitizen;
    }
  });
};
