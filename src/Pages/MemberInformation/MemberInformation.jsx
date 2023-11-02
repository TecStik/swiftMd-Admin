import React, { useState } from 'react';
import MemberStyle from "./Member.module.css";
import MemberData from "./Member.json";
import { Link } from 'react-router-dom';
import { FiEdit } from 'react-icons/fi';
// pagination import here
import PaginationComponent from "../../Components/Pagination";

const itemsPerPage = 2;  //pagination limit here


const MemberInformation = () => {
    const [data, setData] = useState(MemberData);
    const [page, setPage] = useState(1);
    const totalPages = Math.ceil(data.length / itemsPerPage);
    console.log(data)


    // pagination handle function

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const displayedData = data.slice(
        (page - 1) * itemsPerPage,
        page * itemsPerPage
    );


    return (
        <div className={MemberStyle.container}>
            <div className={MemberStyle.heading}>
                <h3>Member Information</h3>
            </div>

            {/* table show here */}
            <table className={MemberStyle.table}>
                <thead className={MemberStyle.thead_bg}>
                    <tr className={MemberStyle.thead_bg}>
                        <th>Name</th>
                        <th>Email Address</th>
                        <th>Phone Number</th>
                        <th>Role</th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {
                        displayedData && displayedData?.map((elm) => (
                            <tr key={elm?.id}>
                                <td>{elm?.name}</td>
                                <td>{elm?.email}</td>
                                <td>{elm?.phonenumber}</td>
                                <td>{elm?.role}</td>
                                <td>
                                    <Link to={`/member-information/${elm?.id}`}>
                                        <FiEdit style={{ cursor: 'pointer', margin: '0px 10px' }} />
                                    </Link>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            {/* pagination add here */}
            <PaginationComponent totalPages={totalPages} onChange={handlePageChange} page={page} />
        </div>
    )
}

export default MemberInformation
