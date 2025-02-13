import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const RegCustomer = () => {
    const navigate = useNavigate();

    const validationSchema = Yup.object({
        name: Yup.string().required('Name is required'),
        city: Yup.string().required('City is required'),
        email: Yup.string().email('Invalid email format').required('Email is required'),
        phone: Yup.string()
            .matches(/^\d{10}$/, 'Phone must be exactly 10 digits')
            .required('Phone is required'),
        gender: Yup.string().required('Gender is required'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required'),
        cpassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm password is required'),
    });

    const handleSubmit = (values, { resetForm }) => {
        axios.post("http://localhost:8080/api/customers", values)
            .then(resp => {
                swal({
                    title: "Success!",
                    text: "Customer registered successfully",
                    icon: "success",
                    button: "OK",
                });
                navigate('/clogin');
            })
            .catch(error => {
                swal({
                    title: "Error!",
                    text: "You already have an account! Please login!",
                    icon: "error",
                    button: "OK",
                });
                resetForm();
            });
    };

    return (
        <div className="container">
            <div className="card shadow bg-dark mt-3 text-white">
                <div className="card-body">
                    <div className="row">
                        <div className="col-sm-6 mx-auto">
                            <h4 className="text-center p-2">Customer Registration Form</h4>
                            <Formik
                                initialValues={{ name: '', city: '', email: '', phone: '', gender: '', password: '', cpassword: '' }}
                                validationSchema={validationSchema}
                                onSubmit={handleSubmit}
                            >
                                {({ isSubmitting }) => (
                                    <Form>
                                        <div className="form-group form-row">
                                            <label className="col-sm-4 form-control-label">Name</label>
                                            <div className="col-sm-8">
                                                <Field type="text" name="name" className="form-control" />
                                                <ErrorMessage name="name" component="small" className="text-danger" />
                                            </div>
                                        </div>

                                        <div className="form-group form-row">
                                            <label className="col-sm-4 form-control-label">City</label>
                                            <div className="col-sm-8">
                                                <Field type="text" name="city" className="form-control" />
                                                <ErrorMessage name="city" component="small" className="text-danger" />
                                            </div>
                                        </div>

                                        <div className="form-group form-row">
                                            <label className="col-sm-4 form-control-label">Email</label>
                                            <div className="col-sm-8">
                                                <Field type="email" name="email" className="form-control" />
                                                <ErrorMessage name="email" component="small" className="text-danger" />
                                            </div>
                                        </div>

                                        <div className="form-group form-row">
                                            <label className="col-sm-4 form-control-label">Phone</label>
                                            <div className="col-sm-8">
                                                <Field type="text" name="phone" className="form-control" />
                                                <ErrorMessage name="phone" component="small" className="text-danger" />
                                            </div>
                                        </div>

                                        <div className="form-group form-row">
                                            <label className="col-sm-4 form-control-label">Gender</label>
                                            <div className="col-sm-8">
                                                <Field as="select" name="gender" className="form-control">
                                                    <option value="">Select Gender</option>
                                                    <option value="Male">Male</option>
                                                    <option value="Female">Female</option>
                                                </Field>
                                                <ErrorMessage name="gender" component="small" className="text-danger" />
                                            </div>
                                        </div>

                                        <div className="form-group form-row">
                                            <label className="col-sm-4 form-control-label">Password</label>
                                            <div className="col-sm-8">
                                                <Field type="password" name="password" className="form-control" />
                                                <ErrorMessage name="password" component="small" className="text-danger" />
                                            </div>
                                        </div>

                                        <div className="form-group form-row">
                                            <label className="col-sm-4 form-control-label">Confirm Password</label>
                                            <div className="col-sm-8">
                                                <Field type="password" name="cpassword" className="form-control" />
                                                <ErrorMessage name="cpassword" component="small" className="text-danger" />
                                            </div>
                                        </div>

                                        <div className="text-center ml-auto">
                                            <Link className="text-white" to="/clogin">Already have an account?</Link>
                                        </div>

                                        <button type="submit" className="btn btn-primary mt-3 w-100" disabled={isSubmitting}>Register Now</button>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegCustomer;