import React, { useState, useEffect } from 'react';
// import ClinicData from "./ClinicInformation.json";
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
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from '@chakra-ui/react';
import { Url } from '../../Components/core';
import moment from 'moment';
import { CircularProgress } from "@mui/material";
import { useFormik } from 'formik';
import * as Yup from "yup";
import { toast } from 'react-toastify';


// Form Schema

const FormSchema = Yup.object({
  clinicid: Yup.string().required("Clinic Id is Required"),
  clinicdoctarname: Yup.string().required("Clinic Doctar Name is Required"),
  cliniclocation: Yup.string().required("Clinic Location is Required"),
  clinicstarttime: Yup.string().required("Clinic Start time is Required"),
  clinicendtime: Yup.string().required("Clinic End time is Required"),
});





const itemsPerPage = 4;  //pagination limit here


const Information = () => {
  const [loading, setLoading] = useState(true)
  const [editdata, setEditData] = useState(null);
  const [updating, setUpdating] = useState(false);
  const [myloading, setMyLoading] = useState(false);

  const [data, setData] = useState([]);

  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(data.length / itemsPerPage);
  console.log(data)

  const notify = () =>
    toast.success("Client has been Updated", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  function simulateNetworkRequest() {
    //
    return new Promise((resolve) => setTimeout(resolve, 2000));
  }


  useEffect(() => {
    if (myloading) {
      simulateNetworkRequest().then(() => {
        setMyLoading(false);
      });
    }
  }, [myloading]);



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
  }, [myloading])


  const formik = useFormik({
    initialValues: {
      clinicid: "",
      clinicdoctarname: "",
      cliniclocation: "",
      clinicstarttime: "",
      clinicendtime: ""
    },
    onSubmit: (values) => {
      setUpdating(true);
      // Perform an API request or update logic here
      axios({
        method: "put",
        url: Url + "/UpdateFilteredClinic",
        data: {
          filter: {
            _id: editdata?._id,
          },
          update: {
            ClinicId: values?.clinicid,
            ClinicDoctorName: values?.clinicdoctarname,
            ClinicLocation: values?.cliniclocation,
            ClinicStartingTime: values?.clinicstarttime,
            ClinicEndTime: values?.clinicendtime,
          }
        }
      }).then((response) => {
        console.log('Update successful', response.data);
        onClose();
        notify();

        // get real here
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
      }).catch((error) => {
        console.error('Update failed', error);
      }).finally(() => {
        setUpdating(false)
      })
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

  const handleGetData = (data) => {
    setEditData(data);
    formik.setValues({
      clinicid: data?.ClinicId || "",
      clinicdoctarname: data?.ClinicDoctorName || "",
      cliniclocation: data?.ClinicLocation || "",
      clinicstarttime: moment(data?.ClinicStartingTime).format("YYYY-MM-DD") || "",
      clinicendtime: moment(data?.ClinicEndTime).format("YYYY-MM-DD") || "",
    });
  }


  const handleCloseModal = () => {
    onClose();
    formik.resetForm(); // Reset the form when the modal is closed
  };

  const { isOpen, onOpen, onClose } = useDisclosure()

  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)


  return (
    <div className={ClinicStyle.container}>
      <div className={ClinicStyle.heading}>
        <h3>Clinic Information</h3>
      </div>
      {
        loading ? <div className={ClinicStyle.loader}>
          <CircularProgress />
        </div> : <>
          <TableContainer>

            <Table className={ClinicStyle.table}>
              <Thead className={ClinicStyle.thead_bg}>
                <Tr className={ClinicStyle.thead_bg}>
                  <Th>Clinic Id</Th>
                  <Th>Clinic Doctor Name</Th>
                  <Th>Clinic Location</Th>
                  <Th>Clinic Starting Time</Th>
                  <Th>Clinic End Time</Th>
                  <Th></Th>
                </Tr>
              </Thead>

              <Tbody>
                {
                  displayedData && displayedData?.map((elm) => (
                    <Tr key={elm?._id}>
                      <Td>{elm?.ClinicId}</Td>
                      <Td>{elm?.ClinicDoctorName}</Td>
                      <Td>{elm?.ClinicLocation}</Td>

                      <Td>{moment(elm?.ClinicStartingTime).format("MMM Do YY")}</Td>
                      <Td>{moment(elm?.ClinicEndTime).format("MMM Do YY")}</Td>
                      <Td onClick={onOpen}>
                        <FiEdit style={{ cursor: 'pointer', margin: '0px 10px' }} onClick={() => handleGetData(elm)} />
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
            onClose={handleCloseModal}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Update Clinic Information</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <FormControl>
                  <FormLabel>Clinic Id</FormLabel>
                  <Input ref={initialRef} placeholder='Clinic Id' name='clinicid' value={formik.values.clinicid} onChange={formik.handleChange("clinicid")} onBlur={formik.handleBlur("clinicid")} />
                </FormControl>

                <div className={ClinicStyle.error}>
                  {formik.touched.clinicid && formik.errors.clinicid}
                </div>

                <FormControl mt={4}>
                  <FormLabel>Clinic Doctar Name</FormLabel>
                  <Input placeholder='Clinic Doctar Name' name='clinicdoctarname' value={formik.values.clinicdoctarname} onChange={formik.handleChange("clinicdoctarname")} onBlur={formik.handleBlur("clinicdoctarname")} />
                </FormControl>

                <div className={ClinicStyle.error}>
                  {formik.touched.clinicdoctarname && formik.errors.clinicdoctarname}
                </div>
                <FormControl mt={4}>
                  <FormLabel>Clinic Location</FormLabel>
                  <Input placeholder='Clinic Location' name='cliniclocation' value={formik.values.cliniclocation} onChange={formik.handleChange("cliniclocation")} onBlur={formik.handleBlur("cliniclocation")} />
                </FormControl>

                <div className={ClinicStyle.error}>
                  {formik.touched.cliniclocation && formik.errors.cliniclocation}
                </div>

                <FormControl mt={4}>
                  <FormLabel>Clinic Starting Time</FormLabel>
                  <Input placeholder='Clinic Starting Time' type='date' name='clinicstarttime' value={formik.values.clinicstarttime} onChange={formik.handleChange("clinicstarttime")} onBlur={formik.handleBlur("clinicstarttime")} />
                </FormControl>

                <div className={ClinicStyle.error}>
                  {formik.touched.clinicstarttime && formik.errors.clinicstarttime}
                </div>
                <FormControl mt={4}>
                  <FormLabel>Clinic End Time</FormLabel>
                  <Input placeholder='Clinic End Time' type='date' name='clinicendtime' value={formik.values.clinicendtime} onChange={formik.handleChange("clinicendtime")} onBlur={formik.handleBlur("clinicendtime")} />
                </FormControl>
                <div className={ClinicStyle.error}>
                  {formik.touched.clinicendtime && formik.errors.clinicendtime}
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
          {/* pagination component here */}
          <PaginationComponent totalPages={totalPages} onChange={handlePageChange} page={page} />
        </>
      }
    </div>
  )
}

export default Information
