import { useSelector } from "react-redux";
import logohdr from "../images/logohdr.png";
import { Form } from "react-router-dom";


function Header() {
    const state = useSelector((state) => state);
    console.log("Header ", state.loggedin.Username);

    return (
        <div className="container-fluid py-3 mb-0 rounded-0 text-white" style={{ background: "#1a1a1a", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
            <div className="row align-items-center">
                <div className="col-4 text-center">
                    <img src={logohdr} alt="icon" style={{ width: "100px", height: "auto" }} />
                </div>
                <div className="col-4">
                    <h2 className="text-center mb-0" style={{ color: "#f39c12", fontFamily: "'Roboto', sans-serif" }}>FreshBasket Store</h2>
                </div>
                <div className="col-4 text-center">
                    {state.loggedin.IsLoggedIn ? (
                        <span className="h5" style={{ color: "#27ae60", fontFamily: "'Roboto', sans-serif" }}>
                            Welcome, {state.loggedin.Username}!
                        </span>
                    ) : (
                        <span className="h5" style={{ color: "#27ae60", fontFamily: "'Roboto', sans-serif" }}>
                            Welcome to FreshBasket!
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Header;
