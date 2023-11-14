import React from 'react';
import AddClinicStyle from "./Patient.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Input, Select } from "@chakra-ui/react";


// Form Schema

const FormSchema = Yup.object({
  name: Yup.string().required("Name is Required"),
  dateofbirth: Yup.string().required("Date Of Birth is Required"),
  gender: Yup.string().required("Gender is Required"),
  email: Yup.string().required("Email is Required"),
  mrnumber: Yup.string().required("MR Number is Required"),
  address: Yup.string().required("Address is Required"),
  primarycontact: Yup.string().required("Primary Contact is Required"),
  secondarycontact: Yup.string().required("Secondary Contact is Required"),
});


const AddClinic = () => {

  const formik = useFormik({
    initialValues: {
      name: "",
      dateofbirth: "",
      gender: "",
      email: "",
      mrnumber: "",
      address: "",
      primarycontact: "",
      secondarycontact: ""
    },
    onSubmit: (values) => {
      // dispatch the action
      const data = {
        name: values?.name,
        dateofbirth: values?.dateofbirth,
        gender: values?.gender,
        email: values?.email,
        mrnumber: values?.mrnumber,
        address: values?.address,
        primarycontact: values?.primarycontact,
        secondarycontact: values?.secondarycontact,
      };
      // dispatch(createPostAction(data));
      console.log(data)

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
            <label>Name</label>
            <Input placeholder='Name' value={formik.values.name} onChange={formik.handleChange("name")} onBlur={formik.handleBlur("name")} name='name' id='name' className={AddClinicStyle.inp} />
            <div className={AddClinicStyle.error}>
              {formik?.touched?.name && formik?.errors?.name}
            </div>
          </div>
          <div>
            <label>Date of Birth</label>
            <Input type="date" placeholder='Date of Birth' value={formik.values.dateofbirth} onChange={formik.handleChange("dateofbirth")} onBlur={formik.handleBlur("dateofbirth")} name='dateofbirth' id='dateofbirth' className={AddClinicStyle.inp} />
            <div className={AddClinicStyle.error}>
              {formik?.touched?.dateofbirth && formik?.errors?.dateofbirth}
            </div>
          </div>
          <div>
            <label>Gender</label>
            <Select placeholder='Gender' type="text" value={formik.values.gender} onChange={formik.handleChange("gender")} onBlur={formik.handleBlur("gender")} name='gender' id='gender' className={AddClinicStyle.inp}>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </Select>


            <div className={AddClinicStyle.error}>
              {formik?.touched?.gender && formik?.errors?.gender}
            </div>
          </div>
          <div>
            <label>Email</label>
            <Input placeholder='Email' type="email" value={formik.values.email} onChange={formik.handleChange("email")} onBlur={formik.handleBlur("email")} name='email' id='email' className={AddClinicStyle.inp} />
            <div className={AddClinicStyle.error}>
              {formik?.touched?.email && formik?.errors?.email}
            </div>
          </div>
          <div>
            <label>MR Number</label>
            <Input placeholder='MR Number' type="text" value={formik.values.mrnumber} onChange={formik.handleChange("mrnumber")} onBlur={formik.handleBlur("mrnumber")} name='mrnumber' id='mrnumber' className={AddClinicStyle.inp} />
            <div className={AddClinicStyle.error}>
              {formik?.touched?.mrnumber && formik?.errors?.mrnumber}
            </div>
          </div>
          <div>
            <label>Address</label>
            <Input placeholder='Address' type="text" value={formik.values.address} onChange={formik.handleChange("address")} onBlur={formik.handleBlur("address")} name='address' id='address' className={AddClinicStyle.inp} />
            <div className={AddClinicStyle.error}>
              {formik?.touched?.address && formik?.errors?.address}
            </div>
          </div>
          <div>
            <label>Primary Contact</label>
            <Input placeholder='Primary Contact' type="text" value={formik.values.primarycontact} onChange={formik.handleChange("primarycontact")} onBlur={formik.handleBlur("primarycontact")} name='primarycontact' id='primarycontact' className={AddClinicStyle.inp}/>
            <div className={AddClinicStyle.error}>
              {formik?.touched?.primarycontact && formik?.errors?.primarycontact}
            </div>
          </div>
          <div>
            <label>Secondary Contact</label>
            <Input placeholder='Secondary Contact' type="text" value={formik.values.secondarycontact} onChange={formik.handleChange("secondarycontact")} onBlur={formik.handleBlur("secondarycontact")} name='secondarycontact' id='secondarycontact' className={AddClinicStyle.inp}/>
            <div className={AddClinicStyle.error}>
              {formik?.touched?.secondarycontact && formik?.errors?.secondarycontact}
            </div>
          </div>
          <Input type="submit" value="Confirm" className={AddClinicStyle.btn} />
        </form>
      </div>
    </div>
  )
}

export default AddClinic
