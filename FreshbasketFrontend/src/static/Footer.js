import React from "react";
import './Footer.css'
function Footer() {
    return (
        <>
            <div id="page-content">
                <div className="container text-center">
                    <div className="row justify-content-center">
                        <div className="col-md-7 mt-4">
                            
                        </div>
                    </div>
                </div>
            </div>
            <footer
                id="sticky-footer"
                className="flex-shrink-0 py-4 bg-dark text-white-50"
            >
                <div className="container text-center">
                {/* <img src="./images/logo1.png" width="200" alt="" className="d-inline-block align-middle mr-2"/> */}
                    <small>©️ 2025. FreshBasket.com All rights reserved</small>
                    <div> "FreshBasket is committed to bringing you the freshest groceries with convenience at your fingertips. We ensure quality, affordability, and timely delivery to make your shopping hassle-free. Shop fresh, live healthy!"  </div>
                </div>
            </footer>
        </>

    );
}

export default Footer