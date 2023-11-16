import React, { useState, useEffect } from 'react';
import AddMemberStyle from "../AddMember/AddMember.module.css";
import axios from 'axios';
import { Url } from '../../Components/core';
import { FormControl, FormLabel, Input, Button, InputGroup, InputRightElement } from "@chakra-ui/react";
import CardComponent from './Card';
import { CircularProgress } from "@mui/material";
import { FaSearch } from "react-icons/fa";



const IssueInformation = () => {
  const [name, setName] = useState("");
  const [mrNumber, setMrNumber] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false)


  useEffect(() => {
    if (mrNumber !== "") {
      setLoading(true)
      axios({
        method: "post",
        url: Url + "/filteredPatients",
        data: {
          filter: {
            PatientMRNumber: mrNumber
          }
        }
      })
        .then((res) => {
          setData(res?.data)
          // console.log("Mr Number data ===> ", res?.data);
        })
        .catch((err) => console.log("err", err?.message)).finally(() => {
          setLoading(false)
        })
    }
  }, [mrNumber]);

  const handleMrNumberFetch = (e) => {
    setMrNumber(e.target.value);
  }

  return (
    <div className={AddMemberStyle.container}>
      {loading && <div style={{ display: 'flex', justifyContent: "center", alignItems: "center", margin: "20px 0px" }}><CircularProgress /></div>}
      {
        data?.length > 0 && !loading && <CardComponent data={data} />
      }

      <div className={AddMemberStyle.heading}>
        <h3>Book An Appointment</h3>
      </div>
      <div className={AddMemberStyle.formContainer}>
        <form>
          <FormLabel>Patient Contact</FormLabel>
          <InputGroup>
            <FormControl>
              <Input type="text" placeholder='Type here...' name='name' id='name' className={AddMemberStyle.input} value={name} onChange={(e) => setName(e.target.value)} />
            </FormControl>
            <InputRightElement>
              <FaSearch style={{position:"relative",top:"6px",fontSize:"1.2rem",cursor:'pointer'}}/>
            </InputRightElement>
          </InputGroup>

          <InputGroup>
            <FormControl mt={4}>
              <FormLabel>MR Number</FormLabel>
              <Input type="number" placeholder='MR Number' name='mrnumber' id='mrnumber' className={AddMemberStyle.input} value={mrNumber} onChange={handleMrNumberFetch} />
            </FormControl>
          </InputGroup>
          <Button type='submit' className={AddMemberStyle.btnconfirm}>Confirm Appointment</Button>
        </form>
      </div>
    </div>
  )
}

export default IssueInformation
