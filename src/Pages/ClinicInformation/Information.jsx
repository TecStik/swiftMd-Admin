import React, { useState } from 'react';
import ClinicData from "./ClinicInformation.json";
import ClinicStyle from "./Clinic.module.css";
import { FiEdit } from "react-icons/fi";
import PaginationComponent from '../../Components/Pagination';
import { Link } from "react-router-dom";
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



const itemsPerPage = 2;  //pagination limit here


const Information = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)


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
              <FormLabel>Clinic Name</FormLabel>
              <Input ref={initialRef} placeholder='Clinic Name' />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Short Code</FormLabel>
              <Input placeholder='Short Code' />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Address</FormLabel>
              <Input placeholder='Address' />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Start Time</FormLabel>
              <Input placeholder='Start Time' type='date'/>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>End Time</FormLabel>
              <Input placeholder='End Time' type='date'/>
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
