import React from 'react';
import { Card, CardBody, Text, Divider } from "@chakra-ui/react";
import IssueStyle from "./IssueInformation.module.css";


const CardComponent = ({ data }) => {
    console.log("Card Data Props passing ===>", data)
    return (
        <div>
            <Card className={IssueStyle.cardContainer}>
                <CardBody>
                    <Text style={{padding:"3px 20px",fontSize:"1.1rem"}}>Patient Name: {data[0]?.PatientName && data[0]?.PatientName}</Text>
                    <Divider/>
                    <Text style={{padding:"3px 20px",fontSize:"1.1rem"}}>Patient CNIC: {data[0]?.Gender ? data[0]?.Gender : "Not Mention"}</Text>
                    <Divider/>
                    <Text style={{padding:"3px 20px",fontSize:"1.1rem"}}>Gender: {data[0]?.Gender ? data[0]?.Gender : "Not Mention"}</Text>
                    <Divider/>
                    <Text style={{padding:"3px 20px",fontSize:"1.1rem"}}>Patient Contact: {data[0]?.PatientNumber && data[0]?.PatientNumber}</Text>
                    <Divider/>
                    <Text style={{padding:"3px 20px",fontSize:"1.1rem"}}>MR No: {data[0]?.PatientMRNumber && data[0]?.PatientMRNumber}</Text>
                </CardBody>
            </Card>
        </div>
    )
}

export default CardComponent
