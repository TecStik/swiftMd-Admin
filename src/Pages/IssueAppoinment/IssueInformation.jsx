import React from 'react';
import AddMemberStyle from "../AddMember/AddMember.module.css";
import axios from 'axios';
import { Url } from '../../Components/core';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { FormControl, FormLabel, Input,Button } from "@chakra-ui/react";


// Form Schema

const FormSchema = Yup.object({
  name: Yup.string().required("Name is Required"),
  time: Yup.string().required("Time is Required"),
});



const IssueInformation = () => {

  const formik = useFormik({
    initialValues: {
      name: "",
      time: "",
    },
    onSubmit: (values) => {
      // dispatch the action
      const data = {
        name: values?.username,
        time: values?.time,
      };
      // dispatch(createPostAction(data));
      console.log(data)

    },
    validationSchema: FormSchema,
  });

  return (
    <div className={AddMemberStyle.container}>
      <div className={AddMemberStyle.heading}>
        <h3>Issue Appointment</h3>
      </div>
      <div className={AddMemberStyle.formContainer}>
        <form onSubmit={formik.handleSubmit}>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input type="text" placeholder='Name' value={formik.values.name} onChange={formik.handleChange("name")} onBlur={formik.handleBlur("name")} name='name' id='name' className={AddMemberStyle.input}/>
          </FormControl>

          <div className={AddMemberStyle.error}>
            {formik?.touched?.name && formik?.errors?.name}
          </div>
          <FormControl mt={4}>
            <FormLabel>Time</FormLabel>
            <Input type="date" placeholder='Date' value={formik.values.time} onChange={formik.handleChange("time")} onBlur={formik.handleBlur("time")} name='time' id='time' className={AddMemberStyle.input} />
          </FormControl>
          <div className={AddMemberStyle.error}>
            {formik?.touched?.time && formik?.errors?.time}
          </div>
          <Button type='submit' className={AddMemberStyle.btn}>Confirm</Button>
        </form>
      </div>
    </div>
  )
}

export default IssueInformation
