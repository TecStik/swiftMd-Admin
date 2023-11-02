import React from 'react';
import AddClinicStyle from "./AddClinic.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";


// Form Schema

const FormSchema = Yup.object({
  clinicname: Yup.string().required("Clinic Name is Required"),
  shortcode: Yup.string().required("Short Code is Required"),
  starttime: Yup.string().required("Start Time is Required"),
  endtime: Yup.string().required("End Time is Required"),
});


const AddClinic = () => {

  const formik = useFormik({
    initialValues: {
      clinicname: "",
      shortcode: "",
      starttime: "",
      endtime: "",
    },
    onSubmit: (values) => {
      // dispatch the action
      const data = {
        clinicname: values?.clinicname,
        shortcode: values?.shortcode,
        starttime: values?.starttime,
        endtime: values?.endtime,
      };
      // dispatch(createPostAction(data));
      console.log(data)

    },
    validationSchema: FormSchema,
  });

  return (
    <div className={AddClinicStyle.container}>
      <div className={AddClinicStyle.heading}>
        <h3>Add Clinic</h3>
      </div>

      {/* form */}
      <div className={AddClinicStyle.formContainer}>
        <form onSubmit={formik.handleSubmit}>
          <div>
            <label>Name Of Clinic</label>
            <input placeholder='Liaquat Nationl' value={formik.values.clinicname} onChange={formik.handleChange("clinicname")} onBlur={formik.handleBlur("clinicname")} name='clinicname' id='clinicname' />
            <div className={AddClinicStyle.error}>
              {formik?.touched?.clinicname && formik?.errors?.clinicname}
            </div>
          </div>
          <div>
            <label>Short code</label>
            <input type="text" placeholder='LNH' value={formik.values.shortcode} onChange={formik.handleChange("shortcode")} onBlur={formik.handleBlur("shortcode")} name='shortcode' id='shortcode' />
            <div className={AddClinicStyle.error}>
              {formik?.touched?.shortcode && formik?.errors?.shortcode}
            </div>
          </div>
          <div className={AddClinicStyle.main__start_time_container}>
            <div>
              <label>Start time</label>
              <input placeholder='Start Time' type="text" value={formik.values.starttime} onChange={formik.handleChange("starttime")} onBlur={formik.handleBlur("starttime")} name='starttime' id='starttime' />
              <div className={AddClinicStyle.error}>
                {formik?.touched?.starttime && formik?.errors?.starttime}
              </div>
            </div>
            <div>
              <label>End time</label>
              <input placeholder='End Time' type="text" value={formik.values.endtime} onChange={formik.handleChange("endtime")} onBlur={formik.handleBlur("endtime")} name='endtime' id='endtime' />
              <div className={AddClinicStyle.error}>
                {formik?.touched?.endtime && formik?.errors?.endtime}
              </div>
            </div>
          </div>
          <input type="submit" value="Confirm" className={AddClinicStyle.btn} />
        </form>
      </div>
    </div>
  )
}

export default AddClinic
