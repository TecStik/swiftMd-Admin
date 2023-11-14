import React, { useState } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import Navbar from './Components/Navbar/Navbar';
import Left from "./Components/Layout/Left";
import RightLayoutContent from './Components/Layout/RightLayoutContent';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import LayoutStyle from "./Components/Layout/Layout.module.css";
import Appointment from './Pages/Appointment/Appointment';
import AddMember from "./Pages/AddMember/AddMember";
import AddClinic from './Pages/AddClinic/AddClinic';
import MemberInformation from './Pages/MemberInformation/MemberInformation';
import PatientRegisteration from "./Pages/PatientRegisteration/PatientRegisteration";
import PatientDetail from "./Pages/PatientDetails/PatientDetails";
import IssueInformation from './Pages/IssueAppoinment/IssueInformation';
import Information from './Pages/ClinicInformation/Information';
import Login from './Pages/Auth/Login';
import { StoreProvider } from './ContextApi';


function App() {
  const [userData, setUserData] = useState(null);
  console.log(userData)
  return (
    <ChakraProvider>
      <StoreProvider value={{ userData, setUserData }}>
        <Router>
          {
            userData ? <>
              <Navbar />
              <div className={LayoutStyle.app}>
                <Left />
                <RightLayoutContent>
                  <Routes>
                    <Route path="/appointment" element={<Appointment />} />
                    <Route path="/add-member" element={<AddMember />} />
                    <Route path="/add-clinic" element={<AddClinic />} />
                    <Route path="/clinic-information" element={<Information />} />
                    <Route path="/member-information" element={<MemberInformation />} />
                    <Route path="/patient-registeration" element={<PatientRegisteration />} />
                    <Route path="/patient-detail" element={<PatientDetail />} />
                    <Route path="/issue-information" element={<IssueInformation />} />
                  </Routes>
                </RightLayoutContent>
              </div>
            </> : <>
              <Routes>
                <Route path='/' element={<Login />} />
              </Routes>
            </>
          }
        </Router>
      </StoreProvider>

    </ChakraProvider>
  );
}

export { App };
