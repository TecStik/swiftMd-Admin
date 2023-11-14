import React from 'react'
import LayoutStyle from "./Layout.module.css";
import { Link } from "react-router-dom";

const Layout = () => {
  return (
    <div className={LayoutStyle.left_content}>
      <div className={LayoutStyle.mainLayout}>
        <ul>
          <li><Link to="/appointment">Appointments</Link></li>
          <li><Link to="/add-member">Add Members</Link></li>
          <li><Link to="/add-clinic">Add Clinic</Link></li>
          <li><Link to="/clinic-information">Clinic Information</Link></li>
          <li><Link to="/member-information">Member Information</Link></li>
          <li><Link to="/patient-registeration">Patient Registeration</Link></li>
          <li><Link to="/patient-detail"> Patient details</Link></li>
          <li><Link to="/issue-information">Issue Appointment</Link></li>
          <li>Logout</li>
        </ul>
      </div>
    </div>
  )
}

export default Layout
