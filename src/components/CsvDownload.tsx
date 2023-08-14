import React from 'react';
import csvDownloader from '../functions/csvDownloader';
import { Region, Citizen } from '../types/types';

interface DownloadButtonProps {
  citizens: Citizen[];
  currentRegion: Region;
}

const CsvDownload: React.FC<DownloadButtonProps> = ({ citizens, currentRegion }) => {
  const handleDownloadClick = () => {
    csvDownloader(citizens, 'users.csv', currentRegion);
  };

  return (
    <button className="btn btn-primary" onClick={handleDownloadClick} style={{marginLeft:"15px"}}>
      Download CSV
    </button>
  );
};

export default CsvDownload;
