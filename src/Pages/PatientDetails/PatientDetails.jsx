import { Table, TableCaption, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr } from '@chakra-ui/react'
import React, { useState, useEffect } from 'react';
// import PatientData from "./Patient.json";
import { FiEdit } from "react-icons/fi";
import PaginationComponent from '../../Components/Pagination';
import ClinicStyle from "./PatientDetail.module.css";
import axios from 'axios';
import { Url } from "../../Components/core/index";
import CircularProgress from '@mui/material/CircularProgress';



let itemsPerPage = 4;

const PatientDetails = () => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log(data)

  useEffect(() => {
    axios({
      method: "post",
      url: Url + "/filteredPatients",
      data: {
        filter: {

        }
      }
    }).then((res) => {
      setLoading(false);
      console.log("Patient Details", res?.data);
      setData(res?.data);
    }).catch(err => console.log(err?.message))
  }, [])


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
        <h3>Patient Details</h3>
      </div>
      {
        loading ? <div style={{ display: 'flex', justifyContent: "center", alignItems: 'center', marginTop: '30px' }}>
          <CircularProgress />
        </div> : <>
          <TableContainer>
            <Table variant='striped' colorScheme='teal'>
              <Thead>
                <Tr>
                  <Th>Id</Th>
                  <Th>Patient Name</Th>
                  <Th>Patient Number</Th>
                  <Th>Patient MRNumber</Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                {
                  displayedData?.map((elm) => (
                    <Tr key={elm?._id}>
                      <Td>{elm?._id}</Td>
                      <Td>{elm?.PatientName}</Td>
                      <Td>{elm?.PatientNumber}</Td>
                      <Td>{elm?.PatientMRNumber}</Td>
                      <Td><FiEdit style={{ cursor: "pointer" }} /></Td>
                    </Tr>
                  ))
                }
              </Tbody>
            </Table>
          </TableContainer>

          <PaginationComponent totalPages={totalPages} onChange={handlePageChange} page={page} />
        </>
      }
    </div>
  )
}

export default PatientDetails




















