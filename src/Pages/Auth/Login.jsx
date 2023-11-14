import React, { useState, useContext, useEffect } from 'react'
import { Button, FormControl, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import LoginStyle from "./Login.module.css";
import { BiSolidHide, BiSolidShow } from "react-icons/bi";
import StoreContext from '../../ContextApi';
import axios from 'axios';
import { Url } from '../../Components/core';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';



function simulateNetworkRequest() {
    //
    return new Promise((resolve) => setTimeout(resolve, 2000));
}


// Form Schema

const FormSchema = Yup.object({
    email: Yup.string().required("Email is Required"),
    password: Yup.string().required("password is Required"),
});



const Login = () => {
    const user = useContext(StoreContext)
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();


    const notify = () =>
        toast.success("Login Successful!", {
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


    const handleClick = () => {
        setShow(!show)
    }

    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        onSubmit: (values) => {
            // dispatch the action
            axios({
                method: "post",
                url: Url + "/auth/login",
                data: {
                    loginId: values.email,
                    password: values.password,
                }
            }).then((res) => {
                notify()
                console.log(res?.data, "response");
                user.setUserData(res?.data);

                setTimeout(() => {
                    navigate("/appointment");
                }, 2000);

            }).catch(err => console.log(err?.message))

        },
        validationSchema: FormSchema,
    });

    return (
        <div className={LoginStyle.mainContainer}>
            <FormControl className={LoginStyle.container} >
                <h3 className={LoginStyle.heading}>Admin Login</h3>
                <label htmlFor="email" className={LoginStyle.label}>Email</label>
                <Input className={LoginStyle.input} name='email' id='email' type='email' placeholder='Enter Your Email' value={formik.values.email} onChange={formik.handleChange("email")} onBlur={formik.handleBlur("email")} />
                <div className={LoginStyle.error}>
                    {formik?.touched?.email && formik?.errors?.email}
                </div>

                <label htmlFor="password" className={LoginStyle.label}>Password</label>
                <InputGroup size='md'>
                    <Input
                        pr='4.5rem'
                        type={show ? 'text' : 'password'}
                        placeholder='Enter password'
                        value={formik.values.password}
                        onChange={formik.handleChange("password")}
                        onBlur={formik.handleBlur("password")}
                    />
                    <InputRightElement width='4.5rem'>
                        <Button h='1.75rem' size='sm' onClick={handleClick} className={LoginStyle.btn}>
                            {show ? <BiSolidHide style={{ fontSize: "1.2rem" }} /> : <BiSolidShow style={{ fontSize: "1.2rem" }} />}
                        </Button>
                    </InputRightElement>
                </InputGroup>
                <div className={LoginStyle.error}>
                    {formik?.touched?.password && formik?.errors?.password}
                </div>
                <Button onClick={!loading ? formik.handleSubmit : null} className={LoginStyle.btnlogin}>Login</Button>
            </FormControl>
        </div>
    )
}

export default Login
