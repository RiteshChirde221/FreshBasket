import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function MyProducts() {
  const sellerId = sessionStorage.getItem("id");
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");
  const [showModal, setShowModal] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/products?sellerId=${sellerId}`)
      .then((resp) => {
        console.log(resp.data);
        setProducts(resp.data.data);
      });
  }, [sellerId]);

  window.onbeforeunload = function () {
    sessionStorage.setItem("origin", window.location.href);
  };

  window.onload = function () {
    if (window.location.href === sessionStorage.getItem("origin")) {
      dispatch({ type: "IsLoggedIn" });
    }
  };

  const handleShowModal = (productId) => {
    setDeleteProductId(productId);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setDeleteProductId(null);
  };

  const deleteProduct = () => {
    axios
      .delete(`http://localhost:8080/api/products/${deleteProductId}`)
      .then(() => {
        alert("Product deleted successfully");
        axios
          .get(`http://localhost:8080/api/products?sellerId=${sellerId}`)
          .then((resp) => {
            setProducts(resp.data.data);
          });
      });
    handleCloseModal();
  };

  // Pagination Logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const sortedProducts = [...currentProducts].sort((a, b) => {
    if (sortColumn === "name") {
      return a.pname.localeCompare(b.pname);
    } else if (sortColumn === "category") {
      return a.categoryName.localeCompare(b.categoryName);
    } else if (sortColumn === "brand") {
      return a.brand.localeCompare(b.brand);
    } else if (sortColumn === "price") {
      return a.price - b.price;
    }
    return 0;
  });

  const sortedAndFilteredProducts = sortedProducts.filter((product) =>
    product.pname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-5">
      <div className="card shadow-lg border-0 rounded-lg mt-5">
        <div className="card-body">
          <h4 className="text-center mb-4">My Products</h4>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by name"
              value={searchTerm}
              onChange={handleSearch}
            />
            <div className="input-group-append">
              <button className="btn btn-primary" type="button">
                <i className="fas fa-search"></i>
              </button>
            </div>
          </div>
          <table className="table table-hover table-bordered mt-3">
            <thead>
              <tr className="text-center">
                <th className="text-dark">Name</th>
                <th className="text-dark">Category</th>
                <th className="text-dark">Brand</th>
                <th className="text-dark">Price</th>
                <th className="text-dark">Action</th>
              </tr>
            </thead>
            <tbody>
              {sortedAndFilteredProducts.map((x) => (
                <tr key={x.productId} className="text-center">
                  <td>
                    <img
                      width="50"
                      height="50"
                      src={"http://localhost:8080/" + x.photo}
                      className="img-thumbnail mr-2"
                      alt={x.pname}
                    />
                    {x.pname}
                  </td>
                  <td>{x.categoryName}</td>
                  <td>{x.brand}</td>
                  <td>{x.price}</td>
                  <td>
                    <Link
                      to={"/edit/" + x.productId}
                      className="btn btn-sm btn-outline-primary mr-2"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleShowModal(x.productId)}
                      className="btn btn-sm btn-outline-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Pagination */}
          <div className="d-flex justify-content-between mt-3">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className="btn btn-outline-secondary"
            >
              Previous
            </button>
            <span className="align-self-center">
              Page {currentPage} of {Math.ceil(products.length / productsPerPage)}
            </span>
            <button
              onClick={nextPage}
              disabled={currentPage === Math.ceil(products.length / productsPerPage)}
              className="btn btn-outline-secondary"
            >
              Next
            </button>
          </div>
        </div>
      </div>
      {/* Delete Confirmation Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this product?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={deleteProduct}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default MyProducts;
