import React, { useEffect, useState } from 'react';
import MemberStyle from "./Member.module.css";
import MemberData from "./Member.json";
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
    Select,
    TableContainer,
    Table,
    Thead,
    Tr,
    Th,
    Tbody,
    Td
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import * as Yup from "yup";
import axios from 'axios';
import { Url } from "../../Components/core/index";
import CircularProgress from '@mui/material/CircularProgress';


// pagination import here
import PaginationComponent from "../../Components/Pagination";

const itemsPerPage = 5;  //pagination limit here


// Form Schema

const FormSchema = Yup.object({
    usernumber: Yup.string().required("User Number is Required"),
    useremail: Yup.string().required("User Email is Required"),
    userpassword: Yup.string().required("User Password is Required"),
    role: Yup.string().required("Role is Required"),
});

const MemberInformation = () => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const totalPages = Math.ceil(data.length / itemsPerPage);
    console.log(data)


    useEffect(() => {
        axios({
            method: "post",
            url: Url + "/auth/filteredEmployee",
            data: {
                filter: {
                    // "CreatedBy": id
                }
            }
        }).then((res) => {
            setLoading(false)
            console.log("view member ====>", res?.data);
            setData(res?.data);
        }).catch((err) => console.log(err?.message));
    }, [])



    const { isOpen, onOpen, onClose } = useDisclosure()
    const formik = useFormik({
        initialValues: {
            usernumber: "",
            useremail: "",
            userpassword: "",
            role: "",
        },
        onSubmit: (values) => {
            // dispatch the action
            const data = {
                username: values?.username,
                email: values?.email,
                phone: values?.phone,
                role: values?.role,
            };
            // dispatch(createPostAction(data));
            console.log(data)

        },
        validationSchema: FormSchema,
    });

    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)

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
            {
                loading ? <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '30px' }}>
                    <CircularProgress />
                </div>

                    : <>

                        <TableContainer>

                            <Table className={MemberStyle.table}>
                                <Thead className={MemberStyle.thead_bg}>
                                    <Tr className={MemberStyle.thead_bg}>
                                        <Th>User Number</Th>
                                        <Th>User Email</Th>
                                        <Th>User Password</Th>
                                        <Th>Role</Th>
                                        <Th></Th>
                                    </Tr>
                                </Thead>

                                <Tbody>
                                    {
                                        displayedData && displayedData?.map((elm) => (
                                            <Tr key={elm?.id}>
                                                <Td>{elm?.UserNumber}</Td>
                                                <Td>{elm?.UserEmail}</Td>
                                                <Td>{elm?.UserPassword}</Td>
                                                <Td>{elm?.Role}</Td>
                                                <Td onClick={onOpen}>
                                                    <FiEdit style={{ cursor: 'pointer', margin: '0px 10px' }} />
                                                </Td>
                                            </Tr>
                                        ))
                                    }
                                </Tbody>
                            </Table>
                        </TableContainer>


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
                                        <FormLabel>User Number</FormLabel>
                                        <Input placeholder='User Number' name='usernumber' onChange={formik.handleChange("usernumber")} onBlur={formik.handleBlur("usernumber")} id='usernumber' value={formik.values.usernumber} />
                                    </FormControl>
                                    <div className={MemberStyle.error}>
                                        {formik?.touched?.usernumber && formik?.errors?.usernumber}
                                    </div>

                                    <FormControl mt={4}>
                                        <FormLabel>User Email</FormLabel>
                                        <Input placeholder='User Email' name='useremail' onChange={formik.handleChange("useremail")} onBlur={formik.handleBlur("useremail")} id='useremail' value={formik.values.useremail} />
                                    </FormControl>
                                    <div className={MemberStyle.error}>
                                        {formik?.touched?.useremail && formik?.errors?.useremail}
                                    </div>
                                    <FormControl mt={4}>
                                        <FormLabel>User Password</FormLabel>
                                        <Input placeholder='User Password' name='userpassword' id='userpassword' onChange={formik.handleChange("userpassword")} onBlur={formik.handleBlur("userpassword")} value={formik.values.userpassword} />
                                    </FormControl>
                                    <div className={MemberStyle.error}>
                                        {formik?.touched?.userpassword && formik?.errors?.userpassword}
                                    </div>
                                    <FormControl mt={4}>
                                        <FormLabel>Role</FormLabel>
                                        <Select value={formik.values.role} name='role' id='role' onChange={formik.handleChange("role")} onBlur={formik.handleBlur("role")}>
                                            <option value='admin'>Admin</option>
                                            <option value='cashier'>Cashier</option>
                                            <option value='assistant'>Assistant</option>
                                        </Select>
                                    </FormControl>
                                    <div className={MemberStyle.error}>
                                        {formik?.touched?.role && formik?.errors?.role}
                                    </div>
                                </ModalBody>

                                <ModalFooter>
                                    <Button colorScheme='blue' mr={3} onClick={formik.handleSubmit}>
                                        Update
                                    </Button>
                                    <Button onClick={onClose}>Cancel</Button>
                                </ModalFooter>
                            </ModalContent>
                        </Modal>





                        {/* pagination add here */}
                        <PaginationComponent totalPages={totalPages} onChange={handlePageChange} page={page} />
                    </>}
        </div>
    )
}

export default MemberInformation
