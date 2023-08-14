import React from 'react';
import { Citizen } from '../types/types';
import InfiniteScroll from 'react-infinite-scroll-component';

type CitizenTableProps = {
  citizens: Citizen[];
  hasMiddleName: boolean;
  nextPage: () => void;
};

const CitizenTable: React.FC<CitizenTableProps> = ({ citizens, hasMiddleName, nextPage }) => {
  return (
    <InfiniteScroll
      dataLength={citizens.length}
      next={nextPage}
      hasMore={true}
      loader={<p className="text-center">Loading...</p>}
    >
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Index</th>
            <th>ID</th>
            <th>Name</th>
            <th>Address</th>
            <th>Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {citizens.map((citizen) => (
            <tr key={citizen.id}>
              <td>{citizen.index}</td>
              <td>{citizen.id}</td>
              <td>
                {citizen.firstName +
                  ' ' +
                  (hasMiddleName ? citizen.middleName + ' ' : '') +
                  citizen.lastName}
              </td>
              <td>{citizen.address}</td>
              <td>{citizen.phoneNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </InfiniteScroll>
  );
};

export default CitizenTable;
