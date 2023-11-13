import React, { useState } from 'react';
import MemberStyle from "./Member.module.css";
import MemberData from "./Member.json";
import { Link } from 'react-router-dom';
import { FiEdit } from 'react-icons/fi';
// modal import here
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    FormControl,
    FormLabel,
    Input,
    Button,
    useDisclosure,
    Select
} from '@chakra-ui/react'



// pagination import here
import PaginationComponent from "../../Components/Pagination";

const itemsPerPage = 2;  //pagination limit here


const MemberInformation = () => {

    const { isOpen, onOpen, onClose } = useDisclosure()

    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)


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
                                <td onClick={onOpen}>
                                    <FiEdit style={{ cursor: 'pointer', margin: '0px 10px' }} />
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>


            {/* modal import her */}
            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Update Member Information</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Name</FormLabel>
                            <Input ref={initialRef} placeholder='Name' />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Email Address</FormLabel>
                            <Input placeholder='Email Address' />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Phone Number</FormLabel>
                            <Input placeholder='Phone Number' />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Role</FormLabel>
                            <Select>
                                <option value='admin'>Admin</option>
                                <option value='cashier'>Cashier</option>
                                <option value='assistant'>Assistant</option>
                            </Select>
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3}>
                            Update
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>





            {/* pagination add here */}
            <PaginationComponent totalPages={totalPages} onChange={handlePageChange} page={page} />
        </div>
    )
}

export default MemberInformation
