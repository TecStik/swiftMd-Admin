import React, { useState } from 'react';
import ClinicData from "./ClinicInformation.json";
import ClinicStyle from "./Clinic.module.css";
import { FiEdit } from "react-icons/fi";
import PaginationComponent from '../../Components/Pagination';
import { Link } from "react-router-dom";


const itemsPerPage = 2;  //pagination limit here


const Information = () => {
  const [data, setDat] = useState(ClinicData);

  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(data.length / itemsPerPage);
  console.log(data)


  // pagination handle function

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const displayedData = data.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );


  return (
    <div className={ClinicStyle.container}>
      <div className={ClinicStyle.heading}>
        <h3>Clinic Information</h3>
      </div>
      <table className={ClinicStyle.table}>
        <thead className={ClinicStyle.thead_bg}>
          <tr className={ClinicStyle.thead_bg}>
            <th>Clinic Name</th>
            <th>Short Code</th>
            <th>Address</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {
            displayedData && displayedData?.map((elm) => (
              <tr key={elm?.id}>
                <td>{elm?.clinicname}</td>
                <td>{elm?.shortcode}</td>
                <td>{elm?.address}</td>
                <td>{elm?.starttime}</td>
                <td>{elm?.endtime}</td>
                <td>
                  <Link to={`/clinic-information/${elm?.id}`}>
                    <FiEdit style={{ cursor: 'pointer', margin: '0px 10px' }} />
                  </Link>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
      {/* pagination component here */}
      <PaginationComponent totalPages={totalPages} onChange={handlePageChange} page={page} />
    </div>
  )
}

export default Information
