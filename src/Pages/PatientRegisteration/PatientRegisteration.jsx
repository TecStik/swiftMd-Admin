import React, { useContext, useEffect, useState } from 'react';
import AddClinicStyle from "./Patient.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Input, Select } from "@chakra-ui/react";
import axios from 'axios';
import { Url } from "../../Components/core/index";
import StoreContext from '../../ContextApi';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


function simulateNetworkRequest() {
  //
  return new Promise((resolve) => setTimeout(resolve, 2000));
}


// Form Schema

const FormSchema = Yup.object({
  patientName: Yup.string().required("Patient Name is Required"),
  patientMrnumber: Yup.string().required("Patient Mr Number is Required"),
  patientNumber: Yup.string().required("Patient Number is Required"),
  patientAge: Yup.string().required("Patient Age is Required"),
});


const PatientRegisteration = () => {
  const user = useContext(StoreContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const notify = () =>
    toast.success("Patient has been Added", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  useEffect(() => {
    if (loading) {
      simulateNetworkRequest().then(() => {
        setLoading(false);
      });
    }
  }, [loading]);





  const formik = useFormik({
    initialValues: {
      patientName: "",
      patientMrnumber: "",
      patientNumber: "",
      patientAge: ""
    },
    onSubmit: (values) => {
      // dispatch the action
      const data = {
        patientName: values?.patientName,
        patientMrnumber: values?.patientMrnumber,
        patientNumber: values?.patientNumber,
        patientAge: values?.patientAge
      };
      console.log(data)
      //  dispatch action here
      axios({
        method: 'post',
        url: Url + "/PatientData",
        data: {
          PatientName: values?.patientName,
          PatientMRNumber: values?.patientMrnumber,
          PatientNumber: values?.patientNumber,
          PatientAge: values?.patientAge,
          BelongsTo: user?.userData?._id
        }
      }).then((res) => {
        notify()
        console.log("patient has been added", res?.data);
        setTimeout(() => {
          navigate("/patient-detail")
        }, 2000);
      }).catch(err => console.log(err?.message));

    },
    validationSchema: FormSchema,
  });

  return (
    <div className={AddClinicStyle.container}>
      <div className={AddClinicStyle.heading}>
        <h3>Patient Registration</h3>
      </div>

      {/* form */}
      <div className={AddClinicStyle.formContainer}>
        <form onSubmit={formik.handleSubmit}>
          <div>
            <label>Patient Name</label>
            <Input placeholder='Patient Name' value={formik.values.patientName} onChange={formik.handleChange("patientName")} onBlur={formik.handleBlur("patientName")} name='patientName' id='patientName' className={AddClinicStyle.inp} />
            <div className={AddClinicStyle.error}>
              {formik?.touched?.patientName && formik?.errors?.patientName}
            </div>
          </div>
          <div>
            <label>Patient Mr Number</label>
            <Input placeholder='Patient Mr Number' type="text" value={formik.values.patientMrnumber} onChange={formik.handleChange("patientMrnumber")} onBlur={formik.handleBlur("patientMrnumber")} name='patientMrnumber' id='patientMrnumber' className={AddClinicStyle.inp} />
            <div className={AddClinicStyle.error}>
              {formik?.touched?.patientMrnumber && formik?.errors?.patientMrnumber}
            </div>
          </div>
          <div>
            <label>Patient Number</label>
            <Input placeholder='Patient Number' type="text" value={formik.values.patientNumber} onChange={formik.handleChange("patientNumber")} onBlur={formik.handleBlur("patientNumber")} name='patientNumber' id='patientNumber' className={AddClinicStyle.inp} />
            <div className={AddClinicStyle.error}>
              {formik?.touched?.patientNumber && formik?.errors?.patientNumber}
            </div>
          </div>
          <div>
            <label>Patient Age</label>
            <Input placeholder='Patient Age' type="text" value={formik.values.patientAge} onChange={formik.handleChange("patientAge")} onBlur={formik.handleBlur("patientAge")} name='patientAge' id='patientAge' className={AddClinicStyle.inp} />
            <div className={AddClinicStyle.error}>
              {formik?.touched?.patientAge && formik?.errors?.patientAge}
            </div>
          </div>
          <Button type="submit" className={AddClinicStyle.btn}>Confirm</Button>
        </form>
      </div>
    </div>
  )
}

export default PatientRegisteration
