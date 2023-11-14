import { Table, TableCaption, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr } from '@chakra-ui/react'
import React, { useState } from 'react';
import PatientData from "./Patient.json";
import { FiEdit } from "react-icons/fi";
import PaginationComponent from '../../Components/Pagination';
import ClinicStyle from "./PatientDetail.module.css";

let itemsPerPage = 2;

const PatientDetails = () => {

  const [data, setDat] = useState(PatientData);
  console.log(data)


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
    <div>
      <div className={ClinicStyle.heading}>
        <h3>Patient Details</h3>
      </div>
      <TableContainer>
        <Table variant='striped' colorScheme='teal'>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Phone</Th>
              <Th>MRN</Th>
              <Th>Address</Th>
              <Th>Email</Th>
            </Tr>
          </Thead>
          <Tbody>
            {
              displayedData?.map((elm) => (
                <Tr>
                  <Td>{elm?.name}</Td>
                  <Td>{elm?.Phone}</Td>
                  <Td>{elm?.MRN}</Td>
                  <Td>{elm?.Address}</Td>
                  <Td>{elm?.Email}</Td>
                </Tr>
              ))
            }
          </Tbody>
        </Table>
      </TableContainer>

      <PaginationComponent totalPages={totalPages} onChange={handlePageChange} page={page} />
    </div>
  )
}

export default PatientDetails





















