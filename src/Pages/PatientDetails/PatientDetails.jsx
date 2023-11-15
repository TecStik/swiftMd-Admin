import {
  Table, TableContainer, Tbody, Td, Th, Thead, Tr, Modal,
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
import React, { useState, useEffect } from 'react';
// import PatientData from "./Patient.json";
import { FiEdit } from "react-icons/fi";
import PaginationComponent from '../../Components/Pagination';
import ClinicStyle from "./PatientDetail.module.css";
import axios from 'axios';
import { Url } from "../../Components/core/index";
import CircularProgress from '@mui/material/CircularProgress';
import * as Yup from "yup";
import { useFormik } from 'formik';

// Form Schema

const FormSchema = Yup.object({
  PatientName: Yup.string().required("Patient Name is Required"),
  PatientNumber: Yup.string().required("Patient Number is Required"),
  PatientMRNumber: Yup.string().required("Patient MR Number is Required")
});


let itemsPerPage = 4;

const PatientDetails = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)
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



  const formik = useFormik({
    initialValues: {
      PatientName: "",
      PatientNumber: "",
      PatientMRNumber: ""
    },
    onSubmit: (values) => {
      // dispatch the action
      const data = {
        PatientName: values?.PatientName,
        PatientNumber: values?.PatientNumber,
        PatientMRNumber: values?.PatientMRNumber,
      };
      // dispatch(createPostAction(data));
      console.log(data)

    },
    validationSchema: FormSchema,
  });


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
          <TableContainer style={{ marginTop: '20px' }}>
            <Table>
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
                      <Td onClick={onOpen}>
                        <FiEdit style={{ cursor: 'pointer', margin: '0px 10px' }} />
                      </Td>
                    </Tr>
                  ))
                }
              </Tbody>
            </Table>
          </TableContainer>



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

                <FormControl mt={4}>
                  <FormLabel>Patient Name</FormLabel>
                  <Input placeholder='Patient Name' name='PatientName' value={formik.values.PatientName} onChange={formik.handleChange("PatientName")} onBlur={formik.handleBlur("PatientName")} />
                </FormControl>

                <div className={ClinicStyle.error}>
                  {formik.touched.PatientName && formik.errors.PatientName}
                </div>
                <FormControl mt={4}>
                  <FormLabel>Patient Number</FormLabel>
                  <Input placeholder='Patient Number' name='PatientNumber' value={formik.values.PatientNumber} onChange={formik.handleChange("PatientNumber")} onBlur={formik.handleBlur("PatientNumber")} />
                </FormControl>

                <div className={ClinicStyle.error}>
                  {formik.touched.PatientNumber && formik.errors.PatientNumber}
                </div>

                <FormControl mt={4}>
                  <FormLabel>Patient MR Number</FormLabel>
                  <Input placeholder='Patient MR Number' name='PatientMRNumber' value={formik.values.PatientMRNumber} onChange={formik.handleChange("PatientMRNumber")} onBlur={formik.handleBlur("PatientMRNumber")} />
                </FormControl>

                <div className={ClinicStyle.error}>
                  {formik.touched.PatientMRNumber && formik.errors.PatientMRNumber}
                </div>


              </ModalBody>

              <ModalFooter>
                <Button colorScheme='blue' mr={3} onClick={formik.handleSubmit}>
                  Update
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>


          {/* modal end here */}

          <PaginationComponent totalPages={totalPages} onChange={handlePageChange} page={page} />
        </>
      }
    </div>
  )
}

export default PatientDetails




















