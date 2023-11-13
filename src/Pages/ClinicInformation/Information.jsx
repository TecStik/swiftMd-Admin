import React, { useState, useEffect } from 'react';
import ClinicData from "./ClinicInformation.json";
import ClinicStyle from "./Clinic.module.css";
import { FiEdit } from "react-icons/fi";
import PaginationComponent from '../../Components/Pagination';
import axios from 'axios';
// chakra ui model import here
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  Button,
} from '@chakra-ui/react'
import { Url } from '../../Components/core';
import moment from 'moment';
import { CircularProgress } from "@mui/material";





const itemsPerPage = 2;  //pagination limit here


const Information = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)
  const [loading, setLoading] = useState(true)

  const [data, setData] = useState([]);

  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(data.length / itemsPerPage);
  console.log(data)


  useEffect(() => {
    axios({
      method: "post",
      url: Url + "/filteredClinic",
      data: {
        "filter": {}
      }
    }).then((res) => {
      console.log("clinic information", res?.data);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
      setData(res?.data)
    }).catch(err => console.log(err?.message))
  }, [])



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
            <th>ClinicId</th>
            <th>ClinicDoctorName</th>
            <th>ClinicLocation</th>
            <th>ClinicStartingTime</th>
            <th>ClinicEndTime</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {

            loading ?
              <div style={{display:"flex",justifyContent:"center",alignItems:"center",margin:'auto'}}>
                <CircularProgress />
              </div>

              :

              displayedData && displayedData?.map((elm) => (
                <tr key={elm?._id}>
                  <td>{elm?.ClinicId}</td>
                  <td>{elm?.ClinicDoctorName}</td>
                  <td>{elm?.ClinicLocation}</td>

                  <td>{moment(elm?.ClinicStartingTime).format("llll")}</td>
                  <td>{moment(elm?.ClinicEndTime).format("llll")}</td>
                  <td onClick={onOpen}>
                    <FiEdit style={{ cursor: 'pointer', margin: '0px 10px' }} />
                  </td>
                </tr>


              ))
          }
        </tbody>
      </table>


      {/* modal start here */}


      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Clinic Information</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Clinic Id</FormLabel>
              <Input ref={initialRef} placeholder='Clinic Id' />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Clinic Doctar Name</FormLabel>
              <Input placeholder='Clinic Doctar Name' />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Clinic Location</FormLabel>
              <Input placeholder='Clinic Location' />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Clinic Starting Time</FormLabel>
              <Input placeholder='Clinic Starting Time' type='date' />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Clinic End Time</FormLabel>
              <Input placeholder='Clinic End Time' type='date' />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3}>
              Update
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>


      {/* modal end here */}
      {/* pagination component here */}
      <PaginationComponent totalPages={totalPages} onChange={handlePageChange} page={page} />
    </div>
  )
}

export default Information
