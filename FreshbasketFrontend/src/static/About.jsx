import React from 'react';
import '../static/About.css';
import Logo from "../static/Chairs.jpeg";
import Logo1 from "../static/hall.jpeg";
import Logo2 from "../static/sofa.jpeg";

function About() {
    return (
        <>
            <main role="main">


                <div className=" ">
                    
                </div>
                <div className="container about_text">

                    <div className="row">
                        <div className="col-md-4  ">
                            <div className="text-center mt-2">
                                <img src={'https://cdn-icons-png.flaticon.com/512/524/524516.png'} alt={"Logo"} className="bd-placeholder-img rounded-circle " width="140" height="140" />
                                <h2>Vision</h2>
                            </div>
                            <p className="justify">"To revolutionize grocery shopping by providing fresh, high-quality products with seamless delivery, ensuring a healthier and happier lifestyle for all."
                            </p>

                        </div>
                        <div className="col-md-4  ">
                            <div className="text-center mt-2">
                                <img src={'https://cdn-icons-png.flaticon.com/512/4622/4622726.png'} alt={"Logo"} className="bd-placeholder-img rounded-circle" width="140" height="140" />
                                <h2>Mission</h2>
                            </div>
                            <p className="justify">"To offer a convenient, affordable, and reliable online grocery experience with a focus on freshness, sustainability, and customer satisfaction."
                            </p>

                        </div>
                        <div className="col-md-4  ">
                            <div className="text-center mt-2">
                                <img src={'https://cdn-icons-png.flaticon.com/512/8776/8776768.png'} alt={"Logo"} className="bd-placeholder-img rounded-circle" width="140" height="140" />
                                <h2>Why freshbasket.com</h2>
                            </div>
                            <p className="d-flex justify-content-start">"At FreshBasket, we prioritize quality, freshness, and convenience. With a wide range of farm-fresh products, secure payments, and timely deliveries.

                            </p>
                        </div>
                    </div>

                    <hr />

                </div>

            </main>
        </>
    );
}

export default About;