import React, { useState, useEffect } from 'react';
import AppointStyle from "./Appointment.module.css";
import UseableComponentbackground from '../../Components/UseableComponentbackground';
// get data in json here
import AppoinmentData from "./Appoinment.json";
import axios from 'axios';
import { Url } from '../../Components/core';

const Appointment = () => {
  const [mydata, setData] = useState([]);
 const [loading,setLoading] = useState(true);


  let title = "Appoinments";

  useEffect(() => {
    axios({
      method: 'post',
      url: Url + "/filteredAppointments",
      data: {
        filter: {

        }
      }
    }).then((response) => {
      setLoading(false)
      // console.log(response?.data);
      setData(response?.data);
      // setTimeout(() => {
      //   setLoading(false);
      // }, 2000);
    }).catch((err) => console.log(err))
  }, [])

  console.log(mydata)

  return (
    <div className={AppointStyle.container}>
      <div className={AppointStyle.end_container}>
        <select className={AppointStyle.select}>
          <option value="selectclinic">Select Clinic</option>
          <option value="nic1">123456</option>
          <option value="nic2">123455</option>
        </select>
      </div>
      {/* use useable component here */}
      <UseableComponentbackground data={mydata} title={title} loading={loading}/>
    </div>
  )
}

export default Appointment
