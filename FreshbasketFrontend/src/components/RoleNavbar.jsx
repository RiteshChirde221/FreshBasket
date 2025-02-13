import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import LoginRegisterMenu from "./LoginRegisterMenu"

const RoleNavbar = ({ isLoggedIn }) => {
    const logout = e => {
        dispatch({ type: 'LogOut' })
        sessionStorage.clear();
        navigate("/");
    }
    const state = useSelector((state) => state);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    console.log(sessionStorage.getItem("role"), isLoggedIn)

    if (!isLoggedIn) {
        return (
            <LoginRegisterMenu />
        )
    }
    else if (sessionStorage.getItem("role") === "customer") {
        return (
            <ul className="navbar-nav ml-auto text-light">
                <li className="nav-item active">
                    <Link className="nav-link text-white" to="/cart">VIEW CART {state.cart.length === 0 ? '' :
                        <span className="badge badge-primary p-2">{state.cart.map(x => x.qty).reduce((a, b) => parseInt(a) + parseInt(b))}</span>}</Link>
                </li>
                <li className="nav-item active">
                    <Link className="nav-link text-white" to="/cprofile">PROFILE</Link>
                </li>
                <li className="nav-item active">
                    <Link className="nav-link text-white" to="/myorders">MY ORDERS</Link>
                </li>
                <li className="nav-item active">
                    <Link className="nav-link text-white" to="/feedback">FEEDBACK</Link>
                </li>
                <li className="nav-item active">
                    <Link className="nav-link text-white" onClick={logout} to="/">LOGOUT</Link>
                </li>
            </ul>
        )
    }
    else if (sessionStorage.getItem("role") === "seller") {
        return (
            <ul className="navbar-nav ml-auto text-white">
                <li className="nav-item active">
                    <Link className="nav-link text-white" to="/sprofile">PROFILE</Link>
                </li>
                <li className="nav-item active">
                    <Link className="nav-link text-white" to="/addcategory">ADD CATEGORY</Link>
                </li>
                <li className="nav-item active">
                    <Link className="nav-link text-white" to="/add-product">ADD PRODUCT</Link>
                </li>
                <li className="nav-item active">
                    <Link className="nav-link text-white" to="/myproducts">PRODUCTS</Link>
                </li>
                <li className="nav-item active">
                    <Link className="nav-link text-white" onClick={logout} to="/">LOGOUT</Link>
                </li>
            </ul>
        )
    }
    return (
        <ul className="navbar-nav ml-auto ">
            <li className="nav-item active ">
                <Link className="nav-link text-white" to="/aprofile">PROFILE</Link>
            </li>
            <li className="nav-item active">
                <Link className="nav-link text-white" to="/sellers">SELLERS</Link>
            </li>
            <li className="nav-item active">
                <Link className="nav-link text-white" to="/viewfeedback">FEEDBACK</Link>
            </li>
            <li className="nav-item active">
                <Link className="nav-link text-white" to="/customers">CUSTOMERS</Link>
            </li>
            <li className="nav-item active">
                <Link className="nav-link text-white" to="/orders">ORDERS</Link>
            </li>
            <li className="nav-item active">
                <Link className="nav-link text-white" onClick={logout} to="/">LOGOUT</Link>
            </li>
        </ul>
    )

}



export default RoleNavbar;