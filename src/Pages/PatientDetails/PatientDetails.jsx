import { Table, TableCaption, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr } from '@chakra-ui/react'
import React, { useState } from 'react';
import PatientData from "./Patient.json";
import { FiEdit } from "react-icons/fi";
import PaginationComponent from '../../Components/Pagination';
import ClinicStyle from "./PatientDetail.module.css";

let itemsPerPage = 2;

const PatientDetails = () => {

  const [data, setDat] = useState(PatientData);
  console.log(data)


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
    <div className={ClinicStyle.container}>
      <div className={ClinicStyle.heading}>
        <h3>Patient Details</h3>
      </div>
      <TableContainer>
        <Table variant='striped' colorScheme='teal'>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Phone</Th>
              <Th>MRN</Th>
              <Th>Address</Th>
              <Th>Email</Th>
            </Tr>
          </Thead>
          <Tbody>
            {
              displayedData?.map((elm) => (
                <Tr>
                  <Td>{elm?.name}</Td>
                  <Td>{elm?.Phone}</Td>
                  <Td>{elm?.MRN}</Td>
                  <Td>{elm?.Address}</Td>
                  <Td>{elm?.Email}</Td>
                </Tr>
              ))
            }
          </Tbody>
        </Table>
      </TableContainer>

      <PaginationComponent totalPages={totalPages} onChange={handlePageChange} page={page} />
    </div>
  )
}

export default PatientDetails























// import React, { useState } from 'react';
// import PatientData from "./Patient.json";
// import ClinicStyle from "./PatientDetail.module.css";
// import { FiEdit } from "react-icons/fi";
// import PaginationComponent from '../../Components/Pagination';
// import { Link } from "react-router-dom";
// // modal import here
// import {
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalHeader,
//   ModalFooter,
//   ModalBody,
//   ModalCloseButton,
//   useDisclosure,
//   FormControl,
//   FormLabel,
//   Input,
//   Button,
// } from '@chakra-ui/react'



// const itemsPerPage = 2;  //pagination limit here


// const PatientDetails = () => {
//   const { isOpen, onOpen, onClose } = useDisclosure()

//   const initialRef = React.useRef(null)
//   const finalRef = React.useRef(null)

//   const [data, setDat] = useState(PatientData);
//   console.log(data)

//   const [page, setPage] = useState(1);
//   const totalPages = Math.ceil(data.length / itemsPerPage);
//   console.log(data)


//   // pagination handle function

//   const handlePageChange = (event, value) => {
//     setPage(value);
//   };

//   const displayedData = data.slice(
//     (page - 1) * itemsPerPage,
//     page * itemsPerPage
//   );


//   return (
//     <div className={ClinicStyle.container}>
//       <div className={ClinicStyle.heading}>
//         <h3>Patient Information</h3>
//       </div>
//       <table className={ClinicStyle.table}>
//         <thead className={ClinicStyle.thead_bg}>
//           <tr className={ClinicStyle.thead_bg}>
//             <th>Name</th>
//             <th>Phone</th>
//             <th>MRN</th>
//             <th>Address</th>
//             <th>Email</th>
//             <th></th>
//           </tr>
//         </thead>

//         <tbody>
//           {
//             displayedData && displayedData?.map((elm) => (
//               <tr key={elm?.id}>
//                 <td>{elm?.name}</td>
//                 <td>{elm?.Phone}</td>
//                 <td>{elm?.MRN}</td>
//                 <td>{elm?.Address}</td>
//                 <td>{elm?.Email}</td>
//                 <td onClick={onOpen}>
//                   <FiEdit style={{ cursor: 'pointer', margin: '0px 10px' }} />
//                 </td>
//               </tr>
//             ))
//           }
//         </tbody>
//       </table>

//       {/* modal start */}

//       <Modal
//         initialFocusRef={initialRef}
//         finalFocusRef={finalRef}
//         isOpen={isOpen}
//         onClose={onClose}
//       >
//         <ModalOverlay />
//         <ModalContent>
//           <ModalHeader>Update Patient Information</ModalHeader>
//           <ModalCloseButton />
//           <ModalBody pb={6}>
//             <FormControl>
//               <FormLabel>Name</FormLabel>
//               <Input ref={initialRef} placeholder='Name' />
//             </FormControl>

//             <FormControl mt={4}>
//               <FormLabel>Phone</FormLabel>
//               <Input placeholder='Phone' />
//             </FormControl>

//             <FormControl mt={4}>
//               <FormLabel>MRN</FormLabel>
//               <Input placeholder='MRN' />
//             </FormControl>


//             <FormControl mt={4}>
//               <FormLabel>Address</FormLabel>
//               <Input placeholder='Address' />
//             </FormControl>

//             <FormControl mt={4}>
//               <FormLabel>Email</FormLabel>
//               <Input placeholder='Email' />
//             </FormControl>

//           </ModalBody>

//           <ModalFooter>
//             <Button colorScheme='blue' mr={3}>
//               Update
//             </Button>
//             <Button onClick={onClose}>Cancel</Button>
//           </ModalFooter>
//         </ModalContent>
//       </Modal>



//       {/* modal end */}




//       {/* pagination component here */}
//       <PaginationComponent totalPages={totalPages} onChange={handlePageChange} page={page} />
//     </div >
//   )
// }

// export default PatientDetails
