import React from 'react';
import AddMemberStyle from "./AddMember.module.css";
import axios from 'axios';
import { Url } from '../../Components/core';
import { useFormik } from 'formik';
import * as Yup from "yup";


// Form Schema

const FormSchema = Yup.object({
  username: Yup.string().required("User Name is Required"),
  email: Yup.string().required("Email is Required"),
  password: Yup.string().required("password is Required"),
  role: Yup.string().required("Role is Required"),
});



const AddMember = () => {

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      role: "",
    },
    onSubmit: (values) => {
      // dispatch the action
      const data = {
        username: values?.username,
        email: values?.email,
        password: values?.password,
        role: values?.role,
      };
      // dispatch(createPostAction(data));
      console.log(data)

    },
    validationSchema: FormSchema,
  });

  return (
    <div className={AddMemberStyle.container}>
      <div className={AddMemberStyle.heading}>
        <h3>Add Member</h3>
      </div>
      <div className={AddMemberStyle.formContainer}>
        <form onSubmit={formik.handleSubmit}>
          <label>User Name</label>
          <input type="text" placeholder='User Name' value={formik.values.username} onChange={formik.handleChange("username")} onBlur={formik.handleBlur("username")} name='username' id='username' />
          <div className={AddMemberStyle.error}>
            {formik?.touched?.username && formik?.errors?.username}
          </div>
          <label>Email</label>
          <input type="email" placeholder='Email' value={formik.values.email} onChange={formik.handleChange("email")} onBlur={formik.handleBlur("email")} name='email' id='email' />
          <div className={AddMemberStyle.error}>
            {formik?.touched?.email && formik?.errors?.email}
          </div>
          <label>Password New</label>
          <input type="password" placeholder='Password New' value={formik.values.password} onChange={formik.handleChange("password")} onBlur={formik.handleBlur("password")} name='password' id='password' />
          <div className={AddMemberStyle.error}>
            {formik?.touched?.password && formik?.errors?.password}
          </div>
          <label>Role</label>
          <select value={formik.values.role} onChange={formik.handleChange("role")} onBlur={formik.handleBlur("role")} name='role' id='role'>
            <option value="admin">Admin</option>
            <option value="cashier">Cashier</option>
            <option value="assistant">Assistant</option>
          </select>
          <div className={AddMemberStyle.error}>
            {formik?.touched?.role && formik?.errors?.role}
          </div>
          <button type='submit' className={AddMemberStyle.btn}>Confirm</button>
        </form>
      </div>
    </div>
  )
}

export default AddMember
