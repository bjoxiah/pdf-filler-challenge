import React from 'react';
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faPlus } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { base_url } from "../../constants";

const PageOne = (props) => {
    return (
        <Formik
            initialValues={{
                "User_id": props.user_id,
                "Yes_business": true,
                "No_business": false,
                "Yes_inn": false,
                "No_inn": false,
                "txtF_des_part": '',
                "txtF_first_name": '',
                "txtF_mid_name": '',
                "txtF_last_name": '',
                "txtF_phone_number": '',
                "txtF_alternate_phone": '',
                "txtF_fax_number": '',
                "txtF_Email": '',
                "rb_language_oral": '',
                "rb_language_written": '',
                "txtF_first_name2": '',
                "txtF_mid_name2": '',
                "txtF_last_name2": '',
                "txtF_phone_number2": '',
                "txtF_alternate_phone2": '',
                "txtF_fax_number2": '',
                "txtF_Email2": '',
                "rb_language_oral2": '',
                "rb_language_written2": '',
            }}
            validationSchema={Yup.object().shape({
              txtF_first_name: Yup.string().required('First name is required!'),
              txtF_last_name: Yup.string().required('Last name is required!'),
            })}
            onSubmit={(values, { setSubmitting }) => {
                axios.post(
                base_url+"pdf", 
                values, 
                { headers: { 
                        Authorization: 'Bearer ' + window.localStorage.token,
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    }
                })
                .then(
                    (res) => {
                        setSubmitting(false);
                        console.log(res);                  
                    }
                )
                .catch(err => {
                    setSubmitting(false);
                    console.log(err.response);
                });
            }}
            >
            {({
                values,
                handleChange, 
                handleBlur, 
                handleSubmit, 
                setFieldValue,
                setFieldTouched,
                isSubmitting, 
                errors, 
                touched 
                }) => (
                    <Form onSubmit={handleSubmit}>
                        <div className="form-row">
                            <div className="col">
                                <h6>Are you listed on TFW Global Website?</h6>
                                <div className="form-group">
                                    <label htmlFor="Yes_business" className="col-form-label mr-2">
                                        <input
                                            type="checkbox"  
                                            id="Yes_business"
                                            checked={values.Yes_business}
                                            value={values.Yes_business}
                                            onChange={handleChange}
                                        /> Yes
                                        {props.values}
                                    </label>                                
                                    <label htmlFor="No_business" className="col-form-label ml-2">
                                        <input 
                                            type="checkbox" 
                                            id="No_business" 
                                            checked= {values.No_business}
                                            value={values.No_business}
                                            onChange={handleChange}
                                        /> No
                                    </label>
                                </div>
                            </div>
                            <div className="col">
                                <h6>Where you referred by an ESDC Referral Partner?</h6>
                                <div className="form-group col">
                                    <label htmlFor="Yes_inn" className="col-form-label mr-2">
                                        <input 
                                            type="checkbox" 
                                            id="Yes_inn" 
                                            checked= {values.Yes_inn}
                                            value={values.Yes_inn}
                                            onChange={handleChange}
                                        /> Yes
                                    </label>
                                
                                    <label htmlFor="No_inn" className="col-form-label ml-2">
                                        <input 
                                            type="checkbox" 
                                            id="No_inn" 
                                            checked= {values.No_inn}
                                            value={values.No_inn}
                                            onChange={handleChange}
                                        /> No
                                    </label>
                                </div>
                            </div>
                        </div>
                        
                        <fieldset className="form-row my-2 p-3 fieldset">
                            <legend className="legend px-3">Principal Designated Referral Partner Contact Info</legend>
                            <div className="form-row">
                                <div className="col">
                                    <div className="form-group">
                                        <label htmlFor="txtF_des_part" className="col-form-label" style={{width: '100%'}}>
                                        Designated Partner Organization Name
                                        </label>
                                        <textarea id="txtF_des_part" value={values.txtF_des_part}
                                            onChange={handleChange}  className="form-control" />
                                    </div>
                                </div>                    
                            </div>
                            <div className="form-row">
                                <div className="col-md-4 col-lg-4 col-xs-12">
                                    <div className="form-group">
                                        <label htmlFor="txtF_first_name" className="col-form-label" style={{width: '100%'}}>
                                        First Name <b className="text-danger">*</b>
                                        </label>
                                        <Field type="text" id="txtF_first_name" value={values.txtF_first_name}
                                            onChange={handleChange}  className="form-control" />
                                        <ErrorMessage name="txtF_first_name" render={msg => <i className="input-feedback text-danger">{msg}</i>} />
                                    </div>
                                </div>
                                <div className="col-md-4 col-lg-4 col-xs-12">
                                    <div className="form-group">
                                        <label htmlFor="txtF_mid_name" className="col-form-label" style={{width: '100%'}}>
                                        Middle Name
                                        </label>
                                        <Field type="text" id="txtF_mid_name" value={values.txtF_mid_name}
                                            onChange={handleChange} className="form-control" />
                                    </div>
                                </div>
                                <div className="col-md-4 col-lg-4 col-xs-12">
                                    <div className="form-group">
                                        <label htmlFor="txtF_last_name" className="col-form-label" style={{width: '100%'}}>
                                        Last Name <b className="text-danger">*</b>
                                        </label>
                                        <Field type="text" id="txtF_last_name" value={values.txtF_last_name}
                                            onChange={handleChange} className="form-control" />
                                        <ErrorMessage name="txtF_last_name" render={msg => <i className="input-feedback text-danger">{msg}</i>} />
                                    </div>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="col-md-3 col-lg-3 col-xs-12">
                                    <div className="form-group">
                                        <label htmlFor="txtF_phone_number" className="col-form-label" style={{width: '100%'}}>
                                        Telephone
                                        </label>
                                        <Field type="text" id="txtF_phone_number" value={values.txtF_phone_number}
                                            onChange={handleChange} className="form-control" />
                                    </div>
                                </div>
                                <div className="col-md-3 col-lg-3 col-xs-12">
                                    <div className="form-group">
                                        <label htmlFor="txtF_alternate_phone" className="col-form-label" style={{width: '100%'}}>
                                        Alternate Telephone
                                        </label>
                                        <Field type="text" id="txtF_alternate_phone" value={values.txtF_alternate_phone}
                                            onChange={handleChange}  className="form-control" />
                                    </div>
                                </div>
                                <div className="col-md-3 col-lg-3 col-xs-12 ">
                                    <div className="form-group">
                                        <label htmlFor="txtF_fax_number" className="col-form-label" style={{width: '100%'}}>
                                        Fax Number
                                        </label>
                                        <Field type="text" id="txtF_fax_number" value={values.txtF_fax_number}
                                            onChange={handleChange} className="form-control" />
                                    </div>
                                </div>
                                <div className="col-md-3 col-lg-3 col-xs-12 ">
                                    <div className="form-group">
                                        <label htmlFor="txtF_Email" className="col-form-label" style={{width: '100%'}}>
                                        Email Address
                                        </label>
                                        <Field type="text" id="txtF_Email" value={values.txtF_Email}
                                            onChange={handleChange}  className="form-control" />
                                    </div>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="col-md-6 col-lg-6 col-xs-12">
                                    Oral Communication
                                    <div className="form-group">
                                        <label htmlFor="rb_language_oral0" className="col-form-label mr-2">
                                            <input type="radio" id="rb_language_oral0" name="rb_language_oral" 
                                            onChange={handleChange} value="English" /> English
                                        </label>
                                        <label htmlFor="rb_language_oral1" className="col-form-label ml-2">
                                            <input type="radio" id="rb_language_oral1" name="rb_language_oral" 
                                            onChange={handleChange}  value="French" /> French
                                        </label>
                                    </div>
                                </div>
                                <div className="col-md-6 col-lg-6 col-xs-12">
                                    Written Communication
                                    <div className="form-group">
                                        <label htmlFor="rb_language_written0" className="col-form-label mr-2">
                                            <input type="radio" id="rb_language_written0" name="rb_language_written" 
                                            onChange={handleChange} value="English" /> English
                                        </label>
                                        <label htmlFor="rb_language_written1" className="col-form-label ml-2">
                                            <input type="radio" id="rb_language_written1" name="rb_language_written" 
                                            onChange={handleChange} value="French" /> French
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </fieldset>

                        <fieldset className="form-row my-2 p-3 fieldset">
                            <legend className="legend px-3">Alternate Designated Referral Partner Contact Info</legend>
                            <div className="form-row">
                                <div className="col-md-4 col-lg-4 col-xs-12">
                                    <div className="form-group">
                                        <label htmlFor="txtF_first_name2" className="col-form-label" style={{width: '100%'}}>
                                        First Name
                                        </label>
                                        <Field type="text" id="txtF_first_name2" value={values.txtF_first_name2}
                                            onChange={handleChange}  className="form-control" />
                                    </div>
                                </div>
                                <div className="col-md-4 col-lg-4 col-xs-12">
                                    <div className="form-group">
                                        <label htmlFor="txtF_mid_name2" className="col-form-label" style={{width: '100%'}}>
                                        Middle Name
                                        </label>
                                        <Field type="text" id="txtF_mid_name2" value={values.txtF_mid_name2}
                                            onChange={handleChange} className="form-control" />
                                    </div>
                                </div>
                                <div className="col-md-4 col-lg-4 col-xs-12">
                                    <div className="form-group">
                                        <label htmlFor="txtF_last_name2" className="col-form-label" style={{width: '100%'}}>
                                        Last Name
                                        </label>
                                        <Field type="text" id="txtF_last_name2" value={values.txtF_last_name2}
                                            onChange={handleChange} className="form-control" />
                                    </div>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="col-md-3 col-lg-3 col-xs-12">
                                    <div className="form-group">
                                        <label htmlFor="txtF_phone_number2" className="col-form-label" style={{width: '100%'}}>
                                        Telephone
                                        </label>
                                        <Field type="text" id="txtF_phone_number2" value={values.txtF_phone_number2}
                                            onChange={handleChange} className="form-control" />
                                    </div>
                                </div>
                                <div className="col-md-3 col-lg-3 col-xs-12">
                                    <div className="form-group">
                                        <label htmlFor="txtF_alternate_phone2" className="col-form-label" style={{width: '100%'}}>
                                        Alternate Telephone
                                        </label>
                                        <Field type="text" id="txtF_alternate_phone2" value={values.txtF_alternate_phone2}
                                            onChange={handleChange}  className="form-control" />
                                    </div>
                                </div>
                                <div className="col-md-3 col-lg-3 col-xs-12 ">
                                    <div className="form-group">
                                        <label htmlFor="txtF_fax_number2" className="col-form-label" style={{width: '100%'}}>
                                        Fax Number
                                        </label>
                                        <Field type="text" id="txtF_fax_number2" value={values.txtF_fax_number2}
                                            onChange={handleChange} className="form-control" />
                                    </div>
                                </div>
                                <div className="col-md-3 col-lg-3 col-xs-12 ">
                                    <div className="form-group">
                                        <label htmlFor="txtF_Email2" className="col-form-label" style={{width: '100%'}}>
                                        Email Address
                                        </label>
                                        <Field type="text" id="txtF_Email2" value={values.txtF_Email2}
                                            onChange={handleChange}  className="form-control" />
                                    </div>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="col-md-6 col-lg-6 col-xs-12">
                                    Oral Communication
                                    <div className="form-group">
                                        <label htmlFor="rb_language_oral20" className="col-form-label mr-2">
                                            <input type="radio" id="rb_language_oral20" name="rb_language_oral2" 
                                            onChange={handleChange} value="English" /> English
                                        </label>
                                        <label htmlFor="rb_language_oral21" className="col-form-label ml-2">
                                            <input type="radio" id="rb_language_oral21" name="rb_language_oral2" 
                                            onChange={handleChange}  value="French" /> French
                                        </label>
                                    </div>
                                </div>
                                <div className="col-md-6 col-lg-6 col-xs-12">
                                    Written Communication
                                    <div className="form-group">
                                        <label htmlFor="rb_language_written20" className="col-form-label mr-2">
                                            <input type="radio" id="rb_language_written20" name="rb_language_written2" 
                                            onChange={handleChange} value="English" /> English
                                        </label>
                                        <label htmlFor="rb_language_written21" className="col-form-label ml-2">
                                            <input type="radio" id="rb_language_written21" name="rb_language_written2" 
                                            onChange={handleChange} value="French" /> French
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </fieldset>

                        <div className="form-group">
                        <button className="btn btn-warning btn-block w-100" style={{borderRadius: 'unset'}} type="submit" disabled={isSubmitting}>
                        <span className="mr-1"> 
                            { isSubmitting ? <FontAwesomeIcon icon={ faSpinner } pulse /> : <FontAwesomeIcon icon={ faPlus } /> } 
                        </span>
                        Add Applicant Info  
                        </button>
                    </div>                    
                    </Form>
                )
            }
            </Formik>
    )
}

export default PageOne;