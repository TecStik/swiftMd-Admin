import React, { useState } from 'react';
import Pagination from '@mui/material/Pagination';
import UseableStyle from "./UseableComponent.module.css";
import nameImg from "./images/name.png";
import timeImg from "./images/time.png";
import dateImg from "./images/date.png";
import doctornameImg from "./images/menname.png";
import { CircularProgress } from "@mui/material";
import moment from "moment";
import { Table, TableCaption, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr } from '@chakra-ui/react';

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

          <TableContainer>
            <Table variant='striped' colorScheme='teal'>
              <Thead>
                <Tr>
                  <Th>Appointment</Th>
                  <Th>AppointmentMRNum</Th>
                  <Th>Name</Th>
                  <Th>Time</Th>
                  <Th>Status</Th>
                </Tr>
              </Thead>
              <Tbody >
                {
                  displayedData?.map((elm) => (
                    <Tr key={elm?._id}>
                      <Td>{elm?.Appointment}</Td>
                      <Td>{elm?.AppointmentMRNum}</Td>
                      <Td>
                        {elm?.AppointmentName}

                      </Td>
                      <Td>
                        {moment(elm?.createdOn).format("llll")}
                      </Td>
                      <Td>
                        {elm?.Status}
                      </Td>
                    </Tr>
                  ))
                }
              </Tbody>
            </Table>
          </TableContainer>

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
