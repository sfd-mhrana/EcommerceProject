import React, { useState } from 'react'
import { useLocation, Link } from 'react-router-dom';
import apiurl from '../ApiUrl.json';
import { withCookies, useCookies } from 'react-cookie';

const Product = (props) => {
    const [cartlist, setCartlist] = useCookies(["cartlist"]);
    const [wishlist, setWishlist] = useCookies(["wishlist"]);
    const [quantity, setQuantity] = useState(1);


    const location = useLocation();
    const products = location.state.product;
    const categoryProduct = location.state.categoryProduct;
    const productimage = apiurl.Image_URL + "productImage/";



    const addwish = (product) => {
        if (wishlist.wishlist && wishlist.wishlist.length > 0) {
            var check = false;
            for (var i = 0; i < wishlist.wishlist.length; i++) {
                if (product.Category_Id === wishlist.wishlist[i].Category_Id &&
                    product.Product_Id === wishlist.wishlist[i].Product_Id &&
                    product.User_ID === wishlist.wishlist[i].User_ID) {
                    check = false;
                    break;
                } else {
                    check = true;
                }
            }
            if (check) {
                setWishlist('wishlist', wishlist.wishlist.concat(product), { path: '/' })
            } else {
                console.warn("product already have");
            }
        } else {
            setWishlist('wishlist', [product], { path: '/' })
        }

    }

    const addcart = (product) => {
        const target = quantity > 0 && quantity != 1 ? { Order_Quantaty: quantity } : { Order_Quantaty: 1 };
        if (quantity >0 && quantity <= product.Quantaty) {
            const returnedTarget = Object.assign(target, product);
            if (cartlist.cartlist && cartlist.cartlist.length>0) {
                var check = false;
                for (var i = 0; i < cartlist.cartlist.length; i++) {
                    if (product.Category_Id === cartlist.cartlist[i].Category_Id &&
                        product.Product_Id === cartlist.cartlist[i].Product_Id &&
                        product.User_ID === cartlist.cartlist[i].User_ID) {
                        check = false;
                        break;
                    } else {
                        check = true;
                    }
                }
                if (check) {
                    setCartlist('cartlist', cartlist.cartlist.concat(returnedTarget), { path: '/' })
                } else {
                    console.warn("product already have");
                }
            } else {
                setCartlist('cartlist', [returnedTarget], { path: '/' })
            }
        }else{
            console.warn("Quantity Getter Than Stock")
        }

    }

    return (
        <div>
            {/* <!--Product section start--> */}
            <div class="container">
                <div class="row">
                    <div class="col-md-6 col-sm-12 p-5 ">
                        <img src={productimage + '' + products.Producut_Images} class="custom_product_image img-fluid" alt="" />
                    </div>

                    <div class="col-md-6 col-sm-12 p-5">
                        <h1>{products.Product_Name}</h1>
                        <hr />
                        <h4>{products.Producut_Price}/-</h4>
                        <p class="mt-5 mb-5">
                            {products.Producut_Details}
                        </p>
                        <div class="mb-5">
                            <strong>Quantity</strong>
                            <input type="number" defaultValue="1" onChange={event => setQuantity(event.target.value)} id="quantity" />

                        </div>

                        <div class="row">
                            <div class="col">
                                <div class="">
                                    <button class="btn btn-info w-100">Order Now</button>
                                </div>
                            </div>
                            <div class="col">
                                <div class="">
                                    <button class="btn btn-primary w-100" onClick={() => {
                                        quantity > 0 ? addcart(products) :
                                        console.warn("Add quantity")
                                    }}>Add to Cart</button>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
            {/* <!--Product section end--> */}



            {/* <!--Relative start--> */}

            <div class="container-fluid ">
                <div class="container mt-3 mb-3 pt-3 pb-3 bg-light">

                    <div class=" container-fluid mt-2">
                        <div class="container">
                            <div class="row">
                                <div class="col">
                                    <h2>Relative Product</h2>
                                </div>

                                <div class="col text-end">
                                    <p class="btn btn-outline-primary btn-sm">see more..</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="container-fluid mb-3">
                        <div class="container">
                            <div class="row">
                                {
                                    categoryProduct.slice(0, 11).map((product, index) => {
                                        return ( 
                                            <div class="col-md-4 col-lg-2 col-sm-6 mt-2">
                                                <div class="card">
                                                    <img src={productimage + '' + product.Producut_Images} class="img-fluid" alt="" srcset="" />
                                                    <div class="name_price">
                                                        <h6 class="text-center">
                                                            <Link to="/product" state={{ product, categoryProduct }} className='linkdesign'>
                                                                {product.Product_Name}
                                                            </Link></h6>
                                                        <p class="text-center"> {product.Producut_Price} /-</p>
                                                        <i class="fas fa-heart" onClick={() => { addwish(product) }}></i>
                                                        <i class="fas fa-cart-plus cartt" onClick={() => { addcart(product) }}></i>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            {/* <!--Relative end--> */}

        </div>
    )
}

export default withCookies(Product)

