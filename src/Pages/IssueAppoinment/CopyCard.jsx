import React from 'react'
import { Card, CardBody, Text, Divider } from "@chakra-ui/react";
import IssueStyle from "./IssueInformation.module.css";

const CopyCard = ({ data }) => {
    console.log("copy props", data)
    return (
        <div>
            <Card className={IssueStyle.cardContainer1}>
                <CardBody style={{ padding: '20px' }}>
                    <Text style={{ padding: '5px' }}>Patient Name: {data && data?.PatientName}</Text>
                    <Divider />
                    <Text style={{ padding: '5px' }}>Patient Number: {data && data?.PatientNumber}</Text>
                    <Divider />
                    <Text style={{ padding: '5px' }}>Patient MR Number: {data && data?.PatientMRNumber}</Text>
                </CardBody>
            </Card>
        </div>
    )
}

export default CopyCard
