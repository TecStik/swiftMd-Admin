import React, { useState, useEffect, useContext } from 'react';
import AddMemberStyle from "../AddMember/AddMember.module.css";
import axios from 'axios';
import { Url } from '../../Components/core';
import { FormControl, FormLabel, Input, Button, InputGroup, InputRightElement, useDisclosure } from "@chakra-ui/react";
import CardComponent from './Card';
import { CircularProgress } from "@mui/material";
import { FaSearch } from "react-icons/fa";
// modal import here
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react';
import CopyCard from './CopyCard';
import { IconButton } from '@chakra-ui/react'
import StoreContext from '../../ContextApi';



const IssueInformation = () => {
  const [number, setNumber] = useState("");
  const [mrNumber, setMrNumber] = useState("");
  const [data, setData] = useState([]);
  const [registerPatient, setRegisterPatient] = useState([]);
  const [copyData, setCopyData] = useState(null);
  const [loading, setLoading] = useState(false);
  const clidata = useContext(StoreContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = React.useRef(null)


  const handleMrNumberFetch = (e) => {

    setLoading(true)
    axios({
      method: "post",
      url: Url + "/filteredPatients",
      data: {
        filter: {
          PatientMRNumber: mrNumber
        }
      }
    })
      .then((res) => {
        clidata?.setPatientData(res?.data);
        setData(res?.data)
        // console.log("Mr Number data ===> ", res?.data);
      })
      .catch((err) => console.log("err", err?.message)).finally(() => {
        setLoading(false)
      })
  }

  console.log(clidata?.patientData)

  const handleCopyData = (data) => {
    // console.log("id", data);
    setCopyData(data);
    onClose();
  }

  // console.log("copy Data", copyData)

  const handleClickModal = () => {
    // fetch data to MrNumbere here
    axios({
      method: "post",
      url: Url + "/filteredPatients",
      data: {
        filter: {
          PatientNumber: number
        }
      }
    }).then((elm) => {
      onOpen();
      setRegisterPatient(elm?.data)
      console.log("Fetch Data...>", elm?.data);
    }).catch((err) => console.log(err));
  }

  // confirm appoinment her
  // confirm appoinment here
  const handleSubmitAppointment = () => {
    axios({
      method: "post",
      url: Url + "/takeAppointment",
      data: {
        Clinic_ID: clidata?.clinicData?._id,
        AppointmentNumber: data?.PatientNumber,
        AppointmentMRNuM: data?.PatientMRNumber,
        AppointmentName: data?.PatientName,
        Appointment: "Appointment",
        AppointmentMRNum: data?._id,
      },
    })
      .then((res) => {
        console.log(`Your Appointment has been Submitted`, res?.data);
      })
      .catch((err) => console.log(err?.message));
  };



  console.log(data)

  return (
    <div className={AddMemberStyle.container}>
      {loading && <div style={{ display: 'flex', justifyContent: "center", alignItems: "center", margin: "20px 0px" }}><CircularProgress /></div>}
      {
        data?.length > 0 && !loading ? data?.length > 0 && !loading && <CardComponent data={data} /> : null
      }

      {
        copyData ? <CopyCard data={copyData} /> : null
      }

      <div className={AddMemberStyle.heading}>
        <h3>Book An Appointment</h3>
      </div>
      <div className={AddMemberStyle.formContainer} style={{ marginTop: '30px' }}>
        <FormLabel>Patient Contact</FormLabel>
        <InputGroup>
          <FormControl>
            <Input type="text" placeholder='Type here...' name='name' id='name' className={AddMemberStyle.input} value={number} onChange={(e) => setNumber(e.target.value)} />
          </FormControl>
          <InputRightElement onClick={handleClickModal}>
            <FaSearch style={{ position: "relative", top: "2px", fontSize: "1.2rem", cursor: 'pointer', color: "#fff" }} />
          </InputRightElement>
        </InputGroup>

        <FormLabel>MR Number</FormLabel>
        <InputGroup>
          <FormControl mt={4}>
            <Input type="number" placeholder='MR Number' name='mrnumber' id='mrnumber' className={AddMemberStyle.input} value={mrNumber} onChange={(e) => setMrNumber(e.target.value)} />
          </FormControl>
          <InputRightElement onClick={handleMrNumberFetch}>
            <FaSearch style={{ position: "relative", top: "16px", fontSize: "1.2rem", cursor: 'pointer', color: "#fff" }} />
          </InputRightElement>
        </InputGroup>
        <Button type='submit' className={AddMemberStyle.btnconfirm} onClick={handleSubmitAppointment}>Confirm Appointment</Button>



        {/* open modal here */}
        <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose} >
          <ModalOverlay />
          <ModalContent >
            <ModalHeader>Patients List</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <TableContainer style={{ overflow: "hidden" }}>
                <Table>
                  <Thead>
                    <Tr>
                      <Th>Patient Name</Th>
                      <Th>Patient Number</Th>
                      <Th>Action</Th>
                    </Tr>
                  </Thead>

                  <Tbody>

                    {
                      registerPatient?.length > 0 && registerPatient?.map((elm) => (
                        <Tr>
                          <Td>{elm?.PatientName}</Td>
                          <Td>{elm?.PatientNumber}</Td>
                          <Td onClick={(e) => handleCopyData(elm)}>
                            <p className={AddMemberStyle.viewContainer}>View</p>
                          </Td>
                        </Tr>
                      ))
                    }
                  </Tbody>
                </Table>
              </TableContainer>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>


        {/* end modal here */}
      </div>
    </div>
  )
}

export default IssueInformation
