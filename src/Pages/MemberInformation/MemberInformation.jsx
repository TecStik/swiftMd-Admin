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
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import * as Yup from "yup";



// pagination import here
import PaginationComponent from "../../Components/Pagination";

const itemsPerPage = 2;  //pagination limit here


// Form Schema

const FormSchema = Yup.object({
    username: Yup.string().required("User Name is Required"),
    email: Yup.string().required("Email is Required"),
    phone: Yup.string().required("Phone is Required"),
    role: Yup.string().required("Role is Required"),
});

const MemberInformation = () => {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const formik = useFormik({
        initialValues: {
            username: "",
            email: "",
            phone: "",
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
                            <Input  placeholder='Name' name='username' onChange={formik.handleChange("username")} onBlur={formik.handleBlur("username")} id='username' value={formik.values.username} />
                        </FormControl>
                        <div className={MemberStyle.error}>
                            {formik?.touched?.username && formik?.errors?.username}
                        </div>

                        <FormControl mt={4}>
                            <FormLabel>Email Address</FormLabel>
                            <Input placeholder='Email Address' name='email' onChange={formik.handleChange("email")} onBlur={formik.handleBlur("email")} id='email' value={formik.values.email} />
                        </FormControl>
                        <div className={MemberStyle.error}>
                            {formik?.touched?.email && formik?.errors?.email}
                        </div>
                        <FormControl mt={4}>
                            <FormLabel>Phone Number</FormLabel>
                            <Input placeholder='Phone Number' name='phone' id='phone' onChange={formik.handleChange("phone")} onBlur={formik.handleBlur("phone")} value={formik.values.phone} />
                        </FormControl>
                        <div className={MemberStyle.error}>
                            {formik?.touched?.phone && formik?.errors?.phone}
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
        </div>
    )
}

export default MemberInformation
