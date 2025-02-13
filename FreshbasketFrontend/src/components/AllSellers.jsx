import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function AllSellers() {
  const [sellers, setSellers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [deleteSellerId, setDeleteSellerId] = useState(null);
  const dispatch = useDispatch();

  window.onbeforeunload = function () {
    sessionStorage.setItem("origin", window.location.href);
  };
  window.onload = function () {
    if (window.location.href === sessionStorage.getItem("origin")) {
      dispatch({ type: "IsLoggedIn" });
    }
  };

  useEffect(() => {
    axios.get("http://localhost:8080/api/sellers").then((resp) => {
      setSellers(resp.data.data);
    });
  }, []);

  const handleShowModal = (id) => {
    setDeleteSellerId(id);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setDeleteSellerId(null);
  };

  const deleteSeller = () => {
    axios
      .delete(`http://localhost:8080/api/admin/sellers/${deleteSellerId}`)
      .then(() => {
        axios.get("http://localhost:8080/api/sellers").then((resp) => {
          setSellers(resp.data.data);
        });
      });
    handleCloseModal();
  };

  return (
    <div className="container-fluid text-white">
      <h4 className="p-2 text-center text-dark">All Sellers</h4>
      <table className="table table-bordered table-striped table-light table-hover">
        <thead className="table-dark">
          <tr className="text-center">
            <th>Id</th>
            <th>Name</th>
            <th>City</th>
            <th>Phone</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {sellers.map((x) => (
            <tr key={x.id} className="text-center">
              <td>{x.id}</td>
              <td>{x.name}</td>
              <td>{x.city}</td>
              <td>{x.phone}</td>
              <td>{x.email}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Delete Confirmation Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Seller</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this seller?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={deleteSeller}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AllSellers;
