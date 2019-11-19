import React, {Component} from 'react';
import PageIcon from './LoginPageIcon.svg';
import './LoginPage.css';
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from 'yup';
import { faSpinner, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { base_url } from "../../constants";
import { toast } from "react-toastify";

class LoginPage extends Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    if (window.localStorage.getItem('token') !== null) {
      toast.dismiss();
      this.props.history.push('/dashboard')
    }
  }

  render() {
    return (
      <div className="row my-5 py-5">
        <div className="col d-none d-sm-block">
          <img src={PageIcon} className="w-100 p-5 mt-4" alt="Icon" />
        </div>
        <div className="col">
          <div className="mt-5">
            <h5 className="title-text">PDF Form Filler Challenge</h5>
            <p className="text-muted">Yeah! Automate the boring stuff <span role="img" aria-label="glasses" aria-labelledby="glasses">😎</span></p>
          </div>
          <div className="card card-body mt-2">
            
            <Formik
                initialValues={{ 
                  Username: '', 
                  Password: '' 
                }}
                validationSchema={Yup.object().shape({
                  Username: Yup.string().required('Your username is required!'),
                  Password: Yup.string().required('Password is required!'),
              })}
                onSubmit={(values, { setSubmitting }) => {
                  // console.log(values);
                  setSubmitting(true);
                  axios.post(
                    base_url+"auth/login", 
                    values, 
                    { headers: 
                      { 
                        // Authorization: 'Bearer '
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                      }
                    })
                    .then(
                      (res) => {
                        toast.dismiss();
                        setSubmitting(false);
                        // console.log(res.data);
                        if (res.data.token) {                          
                          window.localStorage.setItem('token', res.data.token)
                          this.props.history.push('/dashboard');
                        }
                    })
                    .catch(err => {
                      setSubmitting(false);
                      toast.dismiss();
                      if (err.response.status === 400) {
                        toast.error('Authentication Failed: ' + err.response.data);
                      } else {
                        toast.error('Looks like a network error occuured!');
                      }
                    });
                }}
              >
                {({ isSubmitting, errors, touched }) => (
                  <Form>
                    <div className="form-group">
                      <label htmlFor="username" className="col-form-label">Username</label>
                      <Field 
                        type="text" 
                        id="username" 
                        name="Username" 
                        placeholder="e.g Joxiah"
                        className="form-control"
                       />
                      <ErrorMessage name="Username" render={msg => <i className="input-feedback text-danger">{msg}</i>} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="password" className="col-form-label" style={{width: '100%'}}>
                        Password
                      </label>
                      <Field placeholder="*******" type="password" id="password" name="Password"  className="form-control" />
                      <ErrorMessage name="Password" render={msg => <i className="input-feedback text-danger">{msg}</i>} />
                    </div>
                    { isSubmitting }
                    <div className="form-group">
                      <button className="btn btn-warning btn-block w-100" style={{borderRadius: 'unset'}} type="submit" disabled={isSubmitting}>
                        <span className="mr-1"> 
                          { isSubmitting ? <FontAwesomeIcon icon={ faSpinner } pulse /> : <FontAwesomeIcon icon={ faUserCircle } /> } 
                        </span>
                        Sign In   
                      </button>
                    </div>                    
                  </Form>
                )}
              </Formik>
              
          </div>
          
        </div>
      </div>
    );
  }
}

export default LoginPage;
