import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import productvalidation from "./productvalidation";
import swal from 'sweetalert';
import { useDispatch } from "react-redux";

function AddProduct() {

    const sellerid = sessionStorage.getItem("id")
    const [product, setProduct] = useState({
        "pname": "",
        "categoryName": "",
        "price": "",
        "brand": "",
        "sellerId": sellerid
    })
    const dispatch = useDispatch()
    const [errors, setErrors] = useState({})
    const [selectedPhoto, setSelectedPhoto] = useState(null)
    const [file, setFile] = useState(null)
    const [submitted, setSubmitted] = useState(false)

    const [category, setCategory] = useState([])
    const navigate = useNavigate();

    const handleInput = e => {
        setProduct({ ...product, [e.target.name]: e.target.value })
    }

    const handleFileInput = e => {
        setSelectedPhoto(e.target.files[0])
        setFile(URL.createObjectURL(e.target.files[0]))
    }
    window.onbeforeunload = function () {
        sessionStorage.setItem("origin", window.location.href);
    }

    window.onload = function () {
        if (window.location.href == sessionStorage.getItem("origin")) {
            dispatch({ type: 'IsLoggedIn' })
        }
    }

    const handleSubmit = e => {
        e.preventDefault()
        setErrors(productvalidation(product))
        setSubmitted(true)
    }

    useEffect(() => {

        axios.get("http://localhost:8080/api/category/getallcategory")
            .then(resp => {
                console.log(resp);
                setCategory(resp.data);
                console.log("GetAllCategory");
            }).catch(error => {
                toast.error("Category unable to fetch")
            }, [])

        console.log(Object.keys(errors).length)
        if (Object.keys(errors).length === 0 && submitted) {
            const formData = new FormData()
            formData.append("pic", selectedPhoto)
            formData.append("pname", product.pname)
            formData.append("categoryName", product.categoryName)
            formData.append("price", product.price)
            formData.append("brand", product.brand)
            formData.append("sellerId", sellerid)
            console.log(product)
            axios.post("http://localhost:8080/api/products", formData)
                .then(resp => {
                    let result = resp.data.data;
                    console.log(result)
                    swal({
                        title: "Done!",
                        text: "Product saved successfully",
                        icon: "success",
                        button: "OK",
                    });
                    navigate('/myproducts');
                })
                .catch(error => {
                    console.log("Error", error);
                    toast.error("Error saving product")
                    swal({
                        title: "Error!",
                        text: "Error saving product",
                        icon: "error",
                        button: "OK",
                    });
                })
        }
    }, [errors])
    return (
        <div className="container mt-5">
            <div className="card shadow bg-transparent text-dark">
                <div className="card-body">
                    <div className="row">
                        <div class="col-sm-4 pt-5">
                            {selectedPhoto ? <img className="img-thumbnail" src={file} alt="Photo" /> : ""}
                        </div>
                        <div className="col-sm-6">
                            <h4 className="text-center p-2">
                                Add Product Form
                            </h4>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group form-row">
                                    <label className="col-sm-4 form-control-label">Product Name</label>
                                    <div className="col-sm-8">
                                        <input type="text" name="pname" value={product.pname} onChange={handleInput} className="form-control" />
                                        {errors.pname && <medium className="text-danger float-right">{errors.pname}</medium>}
                                    </div>
                                </div>
                                <div className="form-group form-row">
                                    <label className="col-sm-4 form-control-label">Category</label>
                                    <div className="col-sm-8">
                                        <select name="categoryName" value={product.categoryName} onChange={handleInput} className="form-control">
                                            <option value="">please select</option>
                                            {category.map(cat => (
                                                <option>{cat.categoryName}</option>
                                            ))}
                                        </select>
                                        {errors.categoryName && <medium className="text-danger float-right">{errors.categoryName}</medium>}
                                    </div>
                                </div>
                                <div className="form-group form-row">
                                    <label className="col-sm-4 form-control-label">Price</label>
                                    <div className="col-sm-8">
                                        <input type="number" name="price" value={product.price} onChange={handleInput} className="form-control" />
                                        {errors.price && <medium className="text-danger float-right">{errors.price}</medium>}
                                    </div>
                                </div>
                                <div className="form-group form-row">
                                    <label className="col-sm-4 form-control-label">Brand</label>
                                    <div className="col-sm-8">
                                        <select name="brand" value={product.brand} onChange={handleInput} className="form-control">
                                            <option value="">Select Brand</option>
                                            <option>FreshO (Organic & Fresh Produce)</option>
                                            <option>Nature’s Basket (Premium Quality Fruits)</option>
                                            <option>Farm Fresh (Locally Sourced Fruits)</option>
                                            <option>Del Monte (Imported Fruits)</option>
                                            <option>Amul (Milk, Butter, Cheese, Paneer)</option>
                                            <option>Mother Dairy (Milk, Dahi, Ice Creams)</option>
                                            <option>Britannia (Bread, Cakes, Biscuits)</option>
                                            <option>Nestlé (Milk Powders, Yogurts)</option>
                                            <option>Tropicana (Fruit Juices)</option>
                                            <option>Real (Mixed Fruit & Energy Juices)</option>
                                            <option>Nescafé (Coffee)</option>
                                            <option>Tata Tea, Red Label (Tea)</option>
                                            <option>Dove, Lux, Pears (Soaps)</option>
                                            <option>Colgate, Pepsodent (Toothpaste)</option>
                                            <option>Dettol, Lifebuoy (Hand Wash, Sanitizers)</option>
                                            <option> Harpic, Lizol (Home Cleaning)</option>
                                            <option>Maggi, Yippee (Instant Noodles)</option>
                                            <option>Kellogg’s, Quaker (Cereals & Oats)</option>
                                            <option>Haldiram’s, Bikano (Namkeen & Sweets)</option>
                                            <option>Lays, Bingo, Kurkure (Chips & Snacks)</option>
                                            <option>Others</option>
                                            
                                        </select>
                                        {errors.brand && <medium className="text-danger float-right">{errors.brand}</medium>}
                                    </div>
                                </div>

                                <div className="form-group form-row">
                                    <label className="col-sm-4 form-control-label">Photo</label>
                                    <div className="col-sm-8">
                                        <input type="file" required name="photo" value={product.photo} onChange={handleFileInput} className="form-control-file" />
                                    </div>
                                </div>

                                <button className="btn btn-primary float-right">Save Product</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddProduct;
