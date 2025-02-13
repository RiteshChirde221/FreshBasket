import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import swal from "sweetalert";
import catPhoto from "../images/category.png";
import { useDispatch } from "react-redux";

function AddCategory() {
  const [category, setCategory] = useState({
    categoryName: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInput = (event) => {
    setCategory({ ...category, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(category);

    axios
      .post("http://localhost:8080/api/category/addcategory", category)
      .then((resp) => {
        console.log(resp);
        swal({
          title: "Success!",
          text: "Category added successfully",
          icon: "success",
          button: "OK",
        });
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        swal({
          title: "Error!",
          text: "Failed to add category!",
          icon: "error",
          button: "OK",
        });
        setCategory({
          ...category,
          categoryName: "",
        });
      });
  };

  window.onbeforeunload = function () {
    sessionStorage.setItem("addCategory", window.location.href);
  };

  window.onload = function () {
    if (window.location.href === sessionStorage.getItem("addCategory")) {
      dispatch({ type: "IsLoggedIn" });
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-lg border-0 rounded-lg mt-5">
            <div className="row g-0">
              <div className="col-lg-5 d-none d-lg-block bg-image">
                <img
                  src={catPhoto}
                  className="img-fluid rounded-start h-100"
                  alt="category"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="col-lg-7">
                <div className="card-body p-4">
                  <h2 className="fw-bold text-center mb-4">Add Category</h2>
                  <form onSubmit={handleSubmit}>
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        name="categoryName"
                        value={category.categoryName}
                        onChange={handleInput}
                        className="form-control"
                        placeholder="Category Name"
                        required
                      />
                      <label htmlFor="categoryName">Category Name</label>
                    </div>
                    <div className="d-grid">
                      <button className="btn btn-primary btn-block">Add</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddCategory;
