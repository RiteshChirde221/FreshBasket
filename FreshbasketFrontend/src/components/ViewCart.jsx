// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import swal from "sweetalert";

// function ViewCart() {
//     const state = useSelector((state) => state);
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const [address, setAddress] = useState({
//         city: "",
//         state: "",
//         zip: "",
//         country: ""
//     });
//     const [paymentAmount, setPaymentAmount] = useState(state.cart.reduce((a, b) => a + b.price, 0));

//     useEffect(() => {
//         sessionStorage.setItem("origin", window.location.href);
//     }, []);

//     useEffect(() => {
//         if (window.location.href === sessionStorage.getItem("origin")) {
//             dispatch({ type: "IsLoggedIn" });
//         }
//     }, [dispatch]);

//     const deleteItem = (item) => {
//         let resp = window.confirm("Are you sure to delete this item ?");
//         if (resp) {
//             dispatch({ type: "RemoveItem", payload: item });
//             setPaymentAmount(state.cart.reduce((a, b) => a + b.price, 0));
//         }
//     };

//     const handleAddressInput = (e) => {
//         setAddress({ ...address, [e.target.name]: e.target.value });
//     };

//     const handlePayment = async () => {
//         const options = {
//             key: "rzp_test_9C5DF9gbJINYTA", // Replace with your Razorpay Key ID
//             amount: paymentAmount * 100, // Convert amount to paise
//             currency: "INR",
//             name: "FreshBasket Store",
//             description: "Order Payment",
//             handler: async (response) => {
//                 let data = {
//                     cart: state.cart,
//                     payment: { ...response, amount: paymentAmount },
//                     address: address,
//                     customerId: sessionStorage.getItem("id")
//                 };
//                 axios.post("http://localhost:8080/api/orders", data)
//                     .then((resp) => {
//                         dispatch({ type: "Clear" });
//                         swal({
//                             title: "Success!",
//                             text: "Order placed successfully",
//                             icon: "success",
//                             button: "OK",
//                         });
//                         navigate("/myorders");
//                     });
//             },
//             prefill: {
//                 name: sessionStorage.getItem("username"),
//                 email: "test@example.com", // Replace with actual user email
//                 contact: "9999999999" // Replace with actual user contact
//             },
//             theme: {
//                 color: "#3399cc"
//             }
//         };
//         const rzp = new window.Razorpay(options);
//         rzp.open();
//     };

//     return (
//         <div className="container-fluid text-white">
//             {state.cart.length > 0 ? (
//                 <div className="row">
//                     <div className="col-sm-7">
//                         <h4 className="p-2 text-dark text-center">Cart View</h4>
//                         <table className="table table-bordered table-light table-striped">
//                             <thead className="text-dark">
//                                 <tr className="text-center">
//                                     <th>ProductId</th>
//                                     <th>Product Name</th>
//                                     <th>Price</th>
//                                     <th>Qty</th>
//                                     <th>Amount</th>
//                                     <th>Action</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {state.cart.map((item) => (
//                                     <tr key={item.productId} className="text-center">
//                                         <td>{item.productId}</td>
//                                         <td>
//                                             <img className="mr-2 float-left" src={`http://localhost:8080/${item.photo}`} width="100" alt={item.pname} />
//                                             {item.pname}
//                                         </td>
//                                         <td>&#8377; {item.price}</td>
//                                         <td>{item.qty}</td>
//                                         <td>&#8377; {item.qty * item.price}</td>
//                                         <td>
//                                             <button onClick={() => deleteItem(item)} className="btn btn-danger">Delete</button>
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                             <tfoot>
//                                 <tr>
//                                     <th colSpan="4">Total Amount</th>
//                                     <th>&#8377; {paymentAmount}</th>
//                                 </tr>
//                             </tfoot>
//                         </table>
//                     </div>
//                     <div className="col-sm-4">
//                         <h5 className="p-2 text-dark">Address Information</h5>
//                         <div className="form-group">
//                             <label className="text-dark">City</label>
//                             <input type="text" name="city" required value={address.city} onChange={handleAddressInput} className="form-control" />
//                         </div>
//                         <div className="form-group">
//                             <label className="text-dark">State</label>
//                             <input type="text" name="state" required value={address.state} onChange={handleAddressInput} className="form-control" />
//                         </div>
//                         <div className="form-group">
//                             <label className="text-dark">Zip</label>
//                             <input type="text" name="zip" required value={address.zip} onChange={handleAddressInput} className="form-control" />
//                         </div>
//                         <div className="form-group">
//                             <label className="text-dark">Country</label>
//                             <input type="text" name="country" required value={address.country} onChange={handleAddressInput} className="form-control" />
//                         </div>
//                         <div className="form-group">
//                             <label className="text-dark">Billed Amount</label>
//                             <input type="text" readOnly value={paymentAmount} className="form-control" />
//                         </div>
//                         <button className="btn btn-success float-right" onClick={handlePayment}>Pay with Razorpay</button>
//                     </div>
//                 </div>
//             ) : (
//                 <h4 className="text-dark">Cart is Empty</h4>
//             )}
//         </div>
//     );
// }

// export default ViewCart;


// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import swal from "sweetalert";

// function ViewCart() {
//     const state = useSelector((state) => state);
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const [address, setAddress] = useState({
//         city: "",
//         state: "",
//         zip: "",
//         country: ""
//     });
//     const [discountCode, setDiscountCode] = useState("");
//     const [discount, setDiscount] = useState(0);
//     const [paymentAmount, setPaymentAmount] = useState(state.cart.reduce((a, b) => a + b.price, 0));

//     useEffect(() => {
//         sessionStorage.setItem("origin", window.location.href);
//     }, []);

//     useEffect(() => {
//         if (window.location.href === sessionStorage.getItem("origin")) {
//             dispatch({ type: "IsLoggedIn" });
//         }
//     }, [dispatch]);

//     const deleteItem = (item) => {
//         let resp = window.confirm("Are you sure to delete this item ?");
//         if (resp) {
//             dispatch({ type: "RemoveItem", payload: item });
//             setPaymentAmount(state.cart.reduce((a, b) => a + b.price, 0) * (1 - discount / 100));
//         }
//     };

//     const handleAddressInput = (e) => {
//         setAddress({ ...address, [e.target.name]: e.target.value });
//     };

//     const applyDiscount = () => {
//         if (discountCode === "FRESHBASKET20") {
//             setDiscount(20);
//             setPaymentAmount((state.cart.reduce((a, b) => a + b.price, 0)) * 0.8);
//         }else if(discountCode === "BIGDEAL30"){
//               {
//                 setDiscount(30);
//                 setPaymentAmount((state.cart.reduce((a, b) => a + b.price, 0)) * 0.7);
//             }
//         } 
//         else if(discountCode === "FIRSTDEAL50"){
//               {
//                 setDiscount(50);
//                 setPaymentAmount((state.cart.reduce((a, b) => a + b.price, 0)) * 0.5);
//             }
//         } 
//         else {
//             swal({
//                 title: "Invalid Code!",
//                 text: "Please enter a valid discount code.",
//                 icon: "error",
//                 button: "OK",
//             });
//         }
//     };
    

//     const handlePayment = async () => {
//         const options = {
//             key: "rzp_test_9C5DF9gbJINYTA",
//             amount: paymentAmount * 100,
//             currency: "INR",
//             name: "FreshBasket Store",
//             description: "Order Payment",
//             handler: async (response) => {
//                 let data = {
//                     cart: state.cart,
//                     payment: { ...response, amount: paymentAmount },
//                     address: address,
//                     customerId: sessionStorage.getItem("id")
//                 };
//                 axios.post("http://localhost:8080/api/orders", data)
//                     .then((resp) => {
//                         dispatch({ type: "Clear" });
//                         swal({
//                             title: "Success!",
//                             text: "Order placed successfully",
//                             icon: "success",
//                             button: "OK",
//                         });
//                         navigate("/myorders");
//                     });
//             },
//             prefill: {
//                 name: sessionStorage.getItem("username"),
//                 email: "test@example.com",
//                 contact: "9999999999"
//             },
//             theme: {
//                 color: "#3399cc"
//             }
//         };
//         const rzp = new window.Razorpay(options);
//         rzp.open();
//     };

//     return (
//         <div className="container-fluid text-white">
//             {state.cart.length > 0 ? (
//                 <div className="row">
//                     <div className="col-sm-7">
//                         <h4 className="p-2 text-dark text-center">Cart View</h4>
//                         <table className="table table-bordered table-light table-striped">
//                             <thead className="text-dark">
//                                 <tr className="text-center">
//                                     <th>ProductId</th>
//                                     <th>Product Name</th>
//                                     <th>Price</th>
//                                     <th>Qty</th>
//                                     <th>Amount</th>
//                                     <th>Action</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {state.cart.map((item) => (
//                                     <tr key={item.productId} className="text-center">
//                                         <td>{item.productId}</td>
//                                         <td>
//                                             <img className="mr-2 float-left" src={`http://localhost:8080/${item.photo}`} width="100" alt={item.pname} />
//                                             {item.pname}
//                                         </td>
//                                         <td>&#8377; {item.price}</td>
//                                         <td>{item.qty}</td>
//                                         <td>&#8377; {item.qty * item.price}</td>
//                                         <td>
//                                             <button onClick={() => deleteItem(item)} className="btn btn-danger">Delete</button>
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                             <tfoot>
//                                 <tr>
//                                     <th colSpan="4">Total Amount</th>
//                                     <th>&#8377; {paymentAmount}</th>
//                                 </tr>
//                             </tfoot>
//                         </table>
//                     </div>
//                     <div className="col-sm-4">
//                         <h5 className="p-2 text-dark">Address Information</h5>
//                         <div className="form-group">
//                             <label className="text-dark">City</label>
//                             <input type="text" name="city" value={address.city} onChange={handleAddressInput} className="form-control" />
//                         </div>
//                         <div className="form-group">
//                             <label className="text-dark">State</label>
//                             <input type="text" name="state" value={address.state} onChange={handleAddressInput} className="form-control" />
//                         </div>
//                         <div className="form-group">
//                             <label className="text-dark">Zip</label>
//                             <input type="text" name="zip" value={address.zip} onChange={handleAddressInput} className="form-control" />
//                         </div>
//                         <div className="form-group">
//                             <label className="text-dark">Country</label>
//                             <input type="text" name="country" value={address.country} onChange={handleAddressInput} className="form-control" />
//                         </div>
//                         <div className="form-group">
//                             <label className="text-dark">Discount Code</label>
//                             <input type="text" value={discountCode} onChange={(e) => setDiscountCode(e.target.value)} className="form-control" />
//                             <button className="btn btn-primary mt-2" onClick={applyDiscount}>Apply Discount</button>
//                         </div>
//                         <div className="form-group">
//                             <label className="text-dark">Billed Amount</label>
//                             <input type="text" readOnly value={paymentAmount} className="form-control" />
//                         </div>
//                         <button className="btn btn-success float-right" onClick={handlePayment}>Pay with Razorpay</button>
//                     </div>
//                 </div>
//             ) : (
//                 <h4 className="text-dark">Cart is Empty</h4>
//             )}
//         </div>
//     );
// }

// export default ViewCart;


import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

function ViewCart() {
    const state = useSelector((state) => state);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [address, setAddress] = useState({
        city: "",
        state: "",
        zip: "",
        country: "",
    });

    const [discountCode, setDiscountCode] = useState("");
    const [discount, setDiscount] = useState(0);

    // Function to calculate total price considering quantity
    const calculateTotalAmount = () => {
        return state.cart.reduce((total, item) => total + item.price * item.qty, 0);
    };

    const [paymentAmount, setPaymentAmount] = useState(calculateTotalAmount());

    useEffect(() => {
        sessionStorage.setItem("origin", window.location.href);
    }, []);

    useEffect(() => {
        if (window.location.href === sessionStorage.getItem("origin")) {
            dispatch({ type: "IsLoggedIn" });
        }
    }, [dispatch]);

    const deleteItem = (item) => {
        let resp = window.confirm("Are you sure to delete this item?");
        if (resp) {
            dispatch({ type: "RemoveItem", payload: item });

            // Update total after item is removed
            setPaymentAmount(calculateTotalAmount() * (1 - discount / 100));
        }
    };

    const handleAddressInput = (e) => {
        setAddress({ ...address, [e.target.name]: e.target.value });
    };

    const applyDiscount = () => {
        let discountValue = 0;
        if (discountCode === "FRESHBASKET20") {
            discountValue = 20;
        } else if (discountCode === "BIGDEAL30") {
            discountValue = 30;
        } else if (discountCode === "FIRSTDEAL15") {
            discountValue = 15;
        } else {
            swal({
                title: "Invalid Code!",
                text: "Please enter a valid discount code.",
                icon: "error",
                button: "OK",
            });
            return;
        }

        setDiscount(discountValue);
        setPaymentAmount(calculateTotalAmount() * ((100 - discountValue) / 100));
    };

    const handlePayment = async () => {
        const options = {
            key: "rzp_test_9C5DF9gbJINYTA",
            amount: paymentAmount * 100,
            currency: "INR",
            name: "FreshBasket Store",
            description: "Order Payment",
            handler: async (response) => {
                let data = {
                    cart: state.cart,
                    payment: { ...response, amount: paymentAmount },
                    address: address,
                    customerId: sessionStorage.getItem("id"),
                };
                axios.post("http://localhost:8080/api/orders", data).then((resp) => {
                    dispatch({ type: "Clear" });
                    swal({
                        title: "Success!",
                        text: "Order placed successfully",
                        icon: "success",
                        button: "OK",
                    });
                    navigate("/myorders");
                });
            },
            prefill: {
                name: sessionStorage.getItem("username"),
                email: "test@example.com",
                contact: "9999999999",
            },
            theme: {
                color: "#3399cc",
            },
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
    };

    return (
        <div className="container-fluid text-white">
            {state.cart.length > 0 ? (
                <div className="row">
                    <div className="col-sm-7">
                        <h4 className="p-2 text-dark text-center">Cart View</h4>
                        <table className="table table-bordered table-light table-striped">
                            <thead className="text-dark">
                                <tr className="text-center">
                                    <th>ProductId</th>
                                    <th>Product Name</th>
                                    <th>Price</th>
                                    <th>Qty</th>
                                    <th>Amount</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {state.cart.map((item) => (
                                    <tr key={item.productId} className="text-center">
                                        <td>{item.productId}</td>
                                        <td>
                                            <img
                                                className="mr-2 float-left"
                                                src={`http://localhost:8080/${item.photo}`}
                                                width="100"
                                                alt={item.pname}
                                            />
                                            {item.pname}
                                        </td>
                                        <td>&#8377; {item.price}</td>
                                        <td>{item.qty}</td>
                                        <td>&#8377; {item.qty * item.price}</td>
                                        <td>
                                            <button onClick={() => deleteItem(item)} className="btn btn-danger">
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <th colSpan="4">Total Amount</th>
                                    <th>&#8377; {paymentAmount}</th>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                    <div className="col-sm-4">
                        <h5 className="p-2 text-dark">Address Information</h5>
                        <div className="form-group">
                            <label className="text-dark">City</label>
                            <input type="text" name="city" value={address.city} onChange={handleAddressInput} className="form-control" />
                        </div>
                        <div className="form-group">
                            <label className="text-dark">State</label>
                            <input type="text" name="state" value={address.state} onChange={handleAddressInput} className="form-control" />
                        </div>
                        <div className="form-group">
                            <label className="text-dark">Zip</label>
                            <input type="text" name="zip" value={address.zip} onChange={handleAddressInput} className="form-control" />
                        </div>
                        <div className="form-group">
                            <label className="text-dark">Country</label>
                            <input type="text" name="country" value={address.country} onChange={handleAddressInput} className="form-control" />
                        </div>
                        <div className="form-group">
                            <label className="text-dark">Discount Code</label>
                            <input type="text" value={discountCode} onChange={(e) => setDiscountCode(e.target.value)} className="form-control" />
                            <button className="btn btn-primary mt-2" onClick={applyDiscount}>
                                Apply Discount
                            </button>
                        </div>
                        <div className="form-group">
                            <label className="text-dark">Billed Amount</label>
                            <input type="text" readOnly value={paymentAmount} className="form-control" />
                        </div>
                        <button className="btn btn-success float-right" onClick={handlePayment}>
                            Pay with Razorpay
                        </button>
                    </div>
                </div>
            ) : (
                <h4 className="text-dark">Cart is Empty</h4>
            )}
        </div>
    );
}

export default ViewCart;
