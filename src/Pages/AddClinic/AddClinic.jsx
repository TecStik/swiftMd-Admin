import React, { useContext,useState,useEffect } from 'react';
import AddClinicStyle from "./AddClinic.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Input, Select } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import axios from 'axios';
import { Url } from "../../Components/core/index";
import StoreContext from '../../ContextApi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


// Form Schema

const FormSchema = Yup.object({
  clinicid: Yup.string().required("Clinic Id is Required"),
  clinicdoctorname: Yup.string().required("Clinic Doctor Name is Required"),
  cliniclocation: Yup.string().required("Clinic Location is Required"),
  cliniccontact: Yup.string().required("Clinic Contact is Required"),
  starttime: Yup.string().required("Start Time is Required"),
  endtime: Yup.string().required("End Time is Required"),
  avg: Yup.string().required("Avg is Required"),
});

function simulateNetworkRequest() {
  //
  return new Promise((resolve) => setTimeout(resolve, 2000));
}




const AddClinic = () => {
  const user = useContext(StoreContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const notify = () =>
    toast.success("Clinic has been Added", {
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
  }, [loading])

  // console.log(user?.userData)
  const formik = useFormik({
    initialValues: {
      clinicid: "",
      clinicdoctorname: "",
      cliniclocation: "",
      cliniccontact: "",
      starttime: "",
      endtime: "",
      avg: ""
    },
    onSubmit: (values) => {
      // dispatch the action
      const data = {
        clinicid: values?.clinicid,
        clinicdoctorname: values?.clinicdoctorname,
        cliniclocation: values?.cliniclocation,
        cliniccontact: values?.cliniccontact,
        starttime: values?.starttime,
        endtime: values?.endtime,
        avg: values?.avg
      };

      console.log(data)


      // submit add clinic herte
      axios({
        method: "post",
        url: Url + "/ClinictData",
        data: {
          ClinicId: values.clinicid,
          ClinicDoctorName: values.clinicdoctorname,
          ClinicLocation: values.cliniclocation,
          ClinicCurrentNo: 0,
          ClinicContact: values.cliniccontact,
          BelongsTo: user?.userData?._id,
          status: "Closed",
          ClinicStartingTime: values.starttime,
          ClinicEndTime: values.endtime,
          Avg: values.avg,
          ClinicLastIssueNum: 0
        }
      }).then((res) => {
        notify();
        console.log("Client has been added", res?.data);
        setTimeout(() => {
          navigate("/clinic-information")
        }, 2000);
      }).catch((err) => console.log(err?.message))


    },
    validationSchema: FormSchema,
  });

  return (
    <div className={AddClinicStyle.container}>
      <div className={AddClinicStyle.heading}>
        <h3>Add Clinic</h3>
      </div>

      {/* form */}
      <div className={AddClinicStyle.formContainer}>
        <form onSubmit={formik.handleSubmit}>
          <div>
            <label>Clinic Id</label>
            <Input placeholder='Clinic Id' value={formik.values.clinicname} onChange={formik.handleChange("clinicid")} onBlur={formik.handleBlur("clinicnid")} name='clinicnid' id='clinicnid' />
            <div className={AddClinicStyle.error}>
              {formik?.touched?.clinicid && formik?.errors?.clinicid}
            </div>
          </div>
          <div>
            <label>Clinic Doctor Name</label>
            <Input type="text" placeholder='Clinic Doctor Name' value={formik.values.clinicdoctorname} onChange={formik.handleChange("clinicdoctorname")} onBlur={formik.handleBlur("clinicdoctorname")} name='clinicdoctorname' id='shortcode' />
            <div className={AddClinicStyle.error}>
              {formik?.touched?.clinicdoctorname && formik?.errors?.clinicdoctorname}
            </div>
          </div>

          <div>
            <label>Clinic Location</label>
            <Input type="text" placeholder='Clinic Location' value={formik.values.cliniclocation} onChange={formik.handleChange("cliniclocation")} onBlur={formik.handleBlur("cliniclocation")} name='cliniclocation' id='cliniclocation' />
            <div className={AddClinicStyle.error}>
              {formik?.touched?.cliniclocation && formik?.errors?.cliniclocation}
            </div>
          </div>

          <div>
            <label>Clinic Contact</label>
            <Input type="text" placeholder='Clinic Contact' value={formik.values.cliniccontact} onChange={formik.handleChange("cliniccontact")} onBlur={formik.handleBlur("cliniccontact")} name='cliniccontact' id='cliniccontact' />
            <div className={AddClinicStyle.error}>
              {formik?.touched?.cliniccontact && formik?.errors?.cliniccontact}
            </div>
          </div>

          {/*  status here */}
          {/* <div>
            <label htmlFor="status">Status</label>
            <Select name='status' id='status' value={formik.values.status} onChange={formik.handleChange("status")} onBlur={formik.handleBlur("status")}>
              <option value="open">Open</option>
              <option value="closed">Closed</option>
            </Select>
            <div className={AddClinicStyle.error}>
              {formik?.touched?.status && formik?.errors?.status}
            </div>
          </div> */}
          {/* Avg */}
          <div>
            <label>Avg</label>
            <Input type="text" placeholder='Avg' value={formik.values.avg} onChange={formik.handleChange("avg")} onBlur={formik.handleBlur("avg")} name='avg' id='avg' />
            <div className={AddClinicStyle.error}>
              {formik?.touched?.avg && formik?.errors?.avg}
            </div>
          </div>



          <div className={AddClinicStyle.main__start_time_container}>
            <div>
              <label>Start time</label>
              <Input placeholder='Start Time' type="date" value={formik.values.starttime} onChange={formik.handleChange("starttime")} onBlur={formik.handleBlur("starttime")} name='starttime' id='starttime' />
              <div className={AddClinicStyle.error}>
                {formik?.touched?.starttime && formik?.errors?.starttime}
              </div>
            </div>
            <div>
              <label>End time</label>
              <Input placeholder='End Time' type="date" value={formik.values.endtime} onChange={formik.handleChange("endtime")} onBlur={formik.handleBlur("endtime")} name='endtime' id='endtime' />
              <div className={AddClinicStyle.error}>
                {formik?.touched?.endtime && formik?.errors?.endtime}
              </div>
            </div>
          </div>
          {/* <input type="button" value="Submit" className={AddClinicStyle.btn}/> */}
          <Button type="submit" className={AddClinicStyle.btn}>Add Clinic</Button>
        </form>
      </div>
    </div>
  )
}

export default AddClinic
