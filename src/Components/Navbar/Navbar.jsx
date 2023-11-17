import React, { useEffect, useState, useContext } from 'react';
import NavbarStyle from "./Navbar.module.css";
import logo from "./image/swiftmd logo-01.png";
import { Select } from "@chakra-ui/react";
import axios from 'axios';
import { Url } from "../core/index";
import StoreContext from '../../ContextApi';


const Navbar = () => {
    const [data, setData] = useState([]);
    const [selectedClinic, setSelectedClinic] = useState("selectclinic"); // Set default value
    const clidata = useContext(StoreContext);

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


    const handleSelectChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedClinic(selectedValue);


        // Find the selected clinic data
        const selectedClinicData = data.find(elm => elm.ClinicDoctorName === selectedValue);
        // console.log("Selected clinic data: ", selectedClinicData);

        clidata.setClinicData(selectedClinicData)
    };


    return (
        <>
            <nav className={NavbarStyle.container}>
                <img src={logo} alt="logo" />
                <div className={NavbarStyle.selectContainer}>
                    <Select value={selectedClinic} onChange={handleSelectChange}>
                        <option value="selectclinic">Select Clinic</option>
                        {
                            data?.map((elm) => (
                                <option value={elm?.ClinicDoctorName} key={elm?._id}>
                                    {elm?.ClinicDoctorName}
                                </option>
                            ))
                        }
                    </Select>
                </div>
            </nav>

        </>
    )
}

export default Navbar
