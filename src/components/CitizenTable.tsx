import React from "react";
import { Citizen } from "../types/types";
import InfiniteScroll from "react-infinite-scroll-component";

type CitizenTableProps = {
  citizens: Citizen[];
  hasMiddleName: boolean;
  nextPage: () => void;
};

const CitizenTable: React.FC<CitizenTableProps> = ({
  citizens,
  hasMiddleName,
  nextPage,
}) => {
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
            <th style={{ wordWrap: "break-word", maxWidth: '10px' }}>Index</th>
            <th style={{ wordWrap: "break-word", maxWidth: '10px' }}>ID</th>
            <th style={{ wordWrap: "break-word", maxWidth: '10px' }}>Name</th>
            <th style={{ wordWrap: "break-word", maxWidth: '10px' }}>Address</th>
            <th style={{ wordWrap: "break-word", maxWidth: '10px' }}>Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {citizens.map((citizen) => (
            <tr key={citizen.id}>
              <td style={{ wordWrap: "break-word", maxWidth: '10px' }}>{citizen.index}</td>
              <td style={{ wordWrap: "break-word", maxWidth: '10px' }}>{citizen.id}</td>
              <td style={{ wordWrap: "break-word", maxWidth: '10px' }}>
                {citizen.firstName +
                  " " +
                  (hasMiddleName ? citizen.middleName + " " : "") +
                  citizen.lastName}
              </td>
              <td style={{ wordWrap: "break-word", maxWidth: '10px' }}>{citizen.address}</td>
              <td style={{ wordWrap: "break-word", maxWidth: '10px' }}>{citizen.phoneNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </InfiniteScroll>
  );
};

export default CitizenTable;
