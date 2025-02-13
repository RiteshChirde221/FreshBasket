import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";

const RegSupplier = () => {
    const navigate = useNavigate();

    const initialValues = {
        name: "",
        city: "",
        email: "",
        phone: "",
        password: "",
        cpassword: ""
    };

    const validationSchema = Yup.object({
        name: Yup.string().required("Name is required"),
        city: Yup.string().required("City is required"),
        email: Yup.string().email("Invalid email format").required("Email is required"),
        phone: Yup.string()
            .matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
            .required("Phone number is required"),
        password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
        cpassword: Yup.string()
            .oneOf([Yup.ref("password"), null], "Passwords must match")
            .required("Confirm Password is required"),
    });

    const handleSubmit = (values, { setSubmitting, resetForm }) => {
        axios.post("http://localhost:8080/api/sellers", values)
            .then(resp => {
                swal({
                    title: "Success!",
                    text: "Seller registered successfully",
                    icon: "success",
                    button: "OK",
                });
                navigate("/slogin");
            })
            .catch(error => {
                swal({
                    title: "Warning!",
                    text: "You already have an account! Please login !",
                    icon: "warning",
                    button: "OK",
                });
                resetForm();
            })
            .finally(() => setSubmitting(false));
    };

    return (
        <div className="container">
            <div className="card shadow bg-dark mt-3 text-white">
                <div className="card-body">
                    <div className="row">
                        <div className="col-sm-6 mx-auto">
                            <h4 className="text-center p-2">Seller Registration Form</h4>
                            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                                {({ isSubmitting }) => (
                                    <Form>
                                        <div className="form-group">
                                            <label>Name</label>
                                            <Field type="text" name="name" className="form-control" />
                                            <ErrorMessage name="name" component="small" className="text-danger" />
                                        </div>

                                        <div className="form-group">
                                            <label>City</label>
                                            <Field type="text" name="city" className="form-control" />
                                            <ErrorMessage name="city" component="small" className="text-danger" />
                                        </div>

                                        <div className="form-group">
                                            <label>Email</label>
                                            <Field type="text" name="email" className="form-control" />
                                            <ErrorMessage name="email" component="small" className="text-danger" />
                                        </div>

                                        <div className="form-group">
                                            <label>Phone</label>
                                            <Field type="text" name="phone" className="form-control" />
                                            <ErrorMessage name="phone" component="small" className="text-danger" />
                                        </div>

                                        <div className="form-group">
                                            <label>Password</label>
                                            <Field type="password" name="password" className="form-control" />
                                            <ErrorMessage name="password" component="small" className="text-danger" />
                                        </div>

                                        <div className="form-group">
                                            <label>Confirm Password</label>
                                            <Field type="password" name="cpassword" className="form-control" />
                                            <ErrorMessage name="cpassword" component="small" className="text-danger" />
                                        </div>

                                        <div className="text-center">
                                            <Link className="text-white" to="/slogin">Already have an account?</Link>
                                        </div>

                                        <button type="submit" className="btn btn-primary w-100 mt-3" disabled={isSubmitting}>
                                            {isSubmitting ? "Registering..." : "Register Now"}
                                        </button>
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

export default RegSupplier;
