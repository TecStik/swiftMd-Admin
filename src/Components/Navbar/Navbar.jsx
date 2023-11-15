import React, { useEffect, useState } from 'react';
import NavbarStyle from "./Navbar.module.css";
import logo from "./image/swiftmd logo-01.png";
import { Select } from "@chakra-ui/react";
import axios from 'axios';
import { Url } from "../core/index";


const Navbar = () => {
    const [data, setData] = useState([]);


    useEffect(() => {
        axios({
            method: "post",
            url: Url + "/filteredClinic",
            data: {
                "filter": {}
            }
        }).then((res) => {
            console.log("clinic information", res?.data);
            setData(res?.data)
        }).catch(err => console.log(err?.message))
    }, [])


    console.log(data)


    return (
        <>
            <nav className={NavbarStyle.container}>
                <img src={logo} alt="logo" />
                <div className={NavbarStyle.selectContainer}>
                    <Select>
                        <option value="selectclinic">Select Clinic</option>
                        {
                            data?.map((elm) => (
                                <option value={elm?.ClinicDoctorName}>{elm?.ClinicDoctorName
                                }</option>
                            ))
                        }
                    </Select>
                </div>
            </nav>

        </>
    )
}

export default Navbar
