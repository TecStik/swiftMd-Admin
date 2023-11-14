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
} from '@chakra-ui/react'
import { Url } from '../../Components/core';
import moment from 'moment';
import { CircularProgress } from "@mui/material";
import { useFormik } from 'formik';
import * as Yup from "yup";


// Form Schema

const FormSchema = Yup.object({
  clinicid: Yup.string().required("Clinic Id is Required"),
  clinicdoctarname: Yup.string().required("Clinic Doctar Name is Required"),
  cliniclocation: Yup.string().required("Clinic Location is Required"),
  clinicstarttime: Yup.string().required("Clinic Start time is Required"),
  clinicendtime: Yup.string().required("Clinic End time is Required"),
});





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


  const formik = useFormik({
    initialValues: {
      clinicid: "",
      clinicdoctarname: "",
      cliniclocation: "",
      clinicstarttime: "",
      clinicendtime: ""
    },
    onSubmit: (values) => {
      // dispatch the action
      const data = {
        clinicid: values?.clinicid,
        clinicdoctarname: values?.clinicdoctarname,
        cliniclocation: values?.cliniclocation,
        clinicstarttime: values?.clinicstarttime,
        clinicendtime: values?.clinicendtime,
      };
      // dispatch(createPostAction(data));
      console.log(data)

    },
    validationSchema: FormSchema,
  });



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
      {
        loading ? <div className={ClinicStyle.loader}>
          <CircularProgress />
        </div> : <>

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
