import React, { useState } from 'react'
import apiurl from '../ApiUrl.json';
import { withCookies, useCookies } from 'react-cookie';
import axios from 'axios';

function CartList(props) {
    const [cartlist, setCartlist] = useCookies(["cartlist"]);
    const [wishlist, setWishlist] = useCookies(["wishlist"]);
    const productimage = apiurl.Image_URL + "productImage/";


    var carttotal = 0;

    const delP = (index) => {
        if (cartlist.cartlist.length == 1) {
            setCartlist('cartlist', [], { path: '/' })
        } else {
            var newArray = []
            for (var i = 0; i < cartlist.cartlist.length; i++) {
                if (i === index) {

                } else {
                    newArray.push(cartlist.cartlist[i]);
                }
            }
            setCartlist('cartlist', newArray, { path: '/' })
        }
    }

    const delCart = () => {
        setCartlist('cartlist', [], { path: '/' })
    }

    const wishList = (product) => {
        const wishProduct = Object.keys(product).reduce((object, key) => {
            if (key !== 'Order_Quantaty') {
                object[key] = product[key]
            }
            return object
        }, {})
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
                setWishlist('wishlist', wishlist.wishlist.concat(wishProduct), { path: '/' })
            } else {
                console.warn("product already have");
            }
        } else {
            setWishlist('wishlist', [wishProduct], { path: '/' })
        }
    }

    const ConfirmOrder = () => {
        let url = apiurl.SERVER_URL + "OrderList";
        var today = new Date(),
            ordate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate(),
            daliverydate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + (today.getDate() + 5);


        let formData = new FormData();
        formData.append('Order_List', JSON.stringify(cartlist.cartlist));
        formData.append('Invoice_No', 'cartOrder' + Math.random().toString(36).substring(2));
        formData.append('OderDate', ordate);
        formData.append('DaliveryDate', daliverydate);
        formData.append('Send', 'Cart');

        axios.post(apiurl.SERVER_URL + 'orderlist', formData)
            .then(response => { if (response.data == "OK") { delCart(); } });


    }

    return (
        <div>
            <div class="container mt-5 mb-5">
                <div class="row">
                    <div class="col pb-3">
                        <p class="your_cart"> Your Cart List -</p>
                    </div>
                    <div class="col">
                    </div>
                </div>
                {cartlist.cartlist && cartlist.cartlist.length > 0 ?
                    <div>
                        <table class="my_table">
                            <thead>
                                <tr>
                                    <th scope="col">SI.No</th>
                                    <th scope="col">Image</th>
                                    <th scope="col">Product Name</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">Total</th>
                                    <th scope="col">Option</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartlist.cartlist.map((product, item) => {
                                    carttotal += product.Producut_Price * product.Order_Quantaty
                                    return (
                                        <tr>
                                            <td scope="row">{item + 1}</td>
                                            <td><img src={productimage + '' + product.Producut_Images} class="cart_image" /></td>
                                            <td> {product.Product_Name}</td>
                                            <td> {product.Producut_Price}</td>
                                            <td> {product.Order_Quantaty}</td>
                                            <td> {product.Producut_Price * product.Order_Quantaty}</td>
                                            <td class="wish_list_icons">
                                                <i class="fas fa-trash" onClick={() => { delP(item) }}></i>
                                                <i class="fas fa-heart" onClick={() => { wishList(product) }}></i>
                                            </td>
                                        </tr>
                                    )

                                })}
                            </tbody>
                            <thead>
                                <tr>
                                    <th scope="row" colspan="5">Total Cart Amount :-</th>
                                    <th colspan="2" style={{ textAlign: 'left' }}>{
                                        carttotal
                                    } /-</th>
                                </tr>
                            </thead>
                        </table>
                        <div class="row mt-5">
                            <div class="col-md-6 col-sm-12"></div>
                            <div class="col-md-6 col-sm-12">
                                <div class="row">
                                    <div class="col"><button class="btn btn-info w-100 " onClick={() => { delCart(); }}>
                                        <i class="fas fa-trash mr-3"></i>
                                        <small class="order_button"> Cancelled Cart</small></button>
                                    </div>
                                    <div class="col"><button class="btn btn-primary w-100 " onClick={() => { ConfirmOrder(); }}>
                                        <i class="fas fa-paper-plane mr-3"></i>
                                        <small class="order_button">Confirm Order</small> </button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    :
                    <div className='text-center fs-1'>No Cart Found</div>
                }

            </div>

        </div>
    )

}

CartList.propTypes = {}

export default withCookies(CartList)
