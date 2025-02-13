import { Link, useLocation } from "react-router-dom";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import RoleNavbar from "./RoleNavbar";
import { useSelector } from "react-redux";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import logo1 from "../images/logo1.png"; // Import your logo image

function NavBar() {
  const state = useSelector((state) => state);
  console.log("LoggedIn ", state.loggedin);
  console.log("Cart ", state.cart);
  const location = useLocation();

  const [category, setCategory] = useState([]);

  useEffect(() => {
    console.log("Welcome to NavBar bro");

    axios
      .get("http://localhost:8080/api/category/getallcategory")
      .then((resp) => {
        console.log(resp);
        setCategory(resp.data);
        console.log("GetAllCategory");
      })
      .catch((error) => {
        toast.error("Category unable to fetch");
      });
  }, [location]);

  return (
    <Navbar
      bg="dark"
      variant="dark"
      expand="lg"
      className="position-sticky"
      style={{ top: 0, zIndex: "1000" }}
    >
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img
            src={logo1}
            alt="FreshBasket Logo"
            style={{ width: "120px", height: "auto" }}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <NavDropdown title="Category" id="basic-nav-dropdown">
              {category.map((cat) => (
                <NavDropdown.Item
                  key={cat.categoryId}
                  as={Link}
                  to={`/cats?cat=${cat.categoryName}`}
                >
                  {cat.categoryName}
                </NavDropdown.Item>
              ))}
            </NavDropdown>
            <Nav.Link as={Link} to="/aboutUs">
              About Us
            </Nav.Link>
          </Nav>
          <RoleNavbar isLoggedIn={state.loggedin.IsLoggedIn} />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
