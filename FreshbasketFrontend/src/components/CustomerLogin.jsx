import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import loginvalidation from "../loginvalidation";
import user1 from "../images/user1.jpg";
import { Link } from "react-router-dom";
import swal from "sweetalert";

function CustomerLogin() {
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(loginvalidation(user));
    setSubmitted(true);
  };

  useEffect(() => {
    console.log(errors);
    if (Object.keys(errors).length === 0 && submitted) {
      console.log(user);
      axios
        .post("http://localhost:8080/api/customers/validate", user)
        .then((resp) => {
          let result = resp.data.data;
          console.log(resp.data.data);
          sessionStorage.setItem("email", result.email);
          sessionStorage.setItem("uname", result.name);
          sessionStorage.setItem("role", "customer");
          sessionStorage.setItem("id", result.id);
          swal({
            title: "Success!",
            text: "Logged in successfully",
            icon: "success",
            button: "OK",
          });
          dispatch({ type: "IsLoggedIn" });
          navigate("/");
        })
        .catch((error) => {
          console.log("Error", error);
          swal({
            title: "Error!",
            text: "Invalid username or password",
            icon: "warning",
            button: "OK",
          });
        });
    }
  }, [errors]);

  return (
    <div className="container-fluid w-50 mt-5 login-component">
      <div className="row shadow bg-light border rounded">
        <div className="col-4">
          <img
            src={user1}
            className="rounded-start img-fluid mt-5"
            style={{ width: "300px" }}
          />
        </div>

        <div className="col-8">
          <div className="border border-0 rounded p-2">
            <h2 className="fw-bold mb-2 mt-2 text-uppercase text-center">
              Customer Login
            </h2>

            <div className="">
              <form onSubmit={handleSubmit}>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    name="email"
                    value={user.email}
                    onChange={handleInput}
                    className="form-control form-control-sm"
                    placeholder="name@example.com"
                  />
                  <label>
                    <i className="fa fa-envelope pr-2"></i>Email Address
                  </label>
                  {errors.email && (
                    <small className="text-danger float-right">
                      {errors.email}
                    </small>
                  )}
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="password"
                    className="form-control form-control-sm"
                    name="password"
                    value={user.password}
                    onChange={handleInput}
                    placeholder="password"
                  />
                  <label>
                    <i className="fa fa-unlock pr-2"></i>Password
                  </label>
                  {errors.password && (
                    <small className="text-danger float-right">
                      {errors.password}
                    </small>
                  )}
                </div>
                <div className="row g-1">
                  <div className="text-center mb-2">
                    <Link to="/forgetPasswordCustomer" className="link-primary">
                      Forgot password?
                    </Link>
                  </div>
                </div>
                <div className="d-grid">
                  <button className="btn btn-primary">Login Now</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerLogin;
