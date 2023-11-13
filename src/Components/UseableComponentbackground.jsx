import React, { useState } from 'react';
import Pagination from '@mui/material/Pagination';
import UseableStyle from "./UseableComponent.module.css";
import nameImg from "./images/name.png";
import timeImg from "./images/time.png";
import dateImg from "./images/date.png";
import doctornameImg from "./images/menname.png";
import { CircularProgress } from "@mui/material";
import moment from "moment";

const itemsPerPage = 4;  //pagination limit here

const UseableComponentbackground = ({ data, title, loading }) => {
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


  console.log(displayedData)



  return (
    <>
      {
        loading ? <div style={{ display: 'flex', justifyContent: "center", alignItems: "center", padding: '30px 0px' }}>
          <CircularProgress />
        </div> : <div className={UseableStyle.container}>
          <h2>{title}</h2>
          <div className={UseableStyle.filterbtn}>
            FILTER
          </div>

          <table className={UseableStyle.table}>
            <thead className={UseableStyle.thead_bg}>
              <tr className={UseableStyle.thead_bg}>
                <th>Appointment</th>
                <th>AppointmentMRNum</th>
                <th>Name</th>
                <th>Time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody className={UseableStyle.tbody}>
              {
                displayedData?.map((elm) => (
                  <tr key={elm?._id}>
                    <td>{elm?.Appointment}</td>
                    <td>{elm?.AppointmentMRNum}</td>
                    <td>
                      {elm?.AppointmentName}

                    </td>
                    <td>
                      {moment(elm?.createdOn).format("llll")}
                    </td>
                    <td>
                      {elm?.Status}
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>

          {/* add pagination here */}
          <div className={UseableStyle.pagination_container}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              // variant="outlined"
              color='primary'
            />
          </div>
        </div>
      }

    </>

  )
}

export default UseableComponentbackground
