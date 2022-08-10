import React from 'react'
import apiurl from '../ApiUrl.json';
import { withCookies, useCookies } from 'react-cookie';

function WishList(props) {
    const [cartlist, setCartlist] = useCookies(["cartlist"]);
    const [wishlist, setWishlist] = useCookies(["wishlist"]);
    const productimage = apiurl.Image_URL + "productImage/";

    const delP = (index) => {
        if (wishlist.wishlist.length === 1) {
            setWishlist('wishlist', [], { path: '/' })
        } else {
            var newArray = []
            for (var i = 0; i < wishlist.wishlist.length; i++) {
                if (i === index) {
                } else {
                    newArray.push(wishlist.wishlist[i]);
                }
            }
            setWishlist('wishlist', newArray, { path: '/' })
        }
    }

    const delWish = () => {
        setWishlist('wishlist', [], { path: '/' })
    }

    const addcart = (product) => {
        const quantity = { Order_Quantaty: 1 };
        const returnedTarget = Object.assign(quantity, product);
        if (cartlist.cartlist && cartlist.cartlist.length > 0) {
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

    }

    return (
        <div>
            <div class="container mt-5 mb-5">
                <div class="row">
                    <div class="col pb-3">
                        <p class="your_cart"> Your Wish List -</p>
                    </div>
                    <div class="col">
                    </div>
                </div>
                {wishlist.wishlist && wishlist.wishlist.length > 0 ?
                    <div>
                        <table class="my_table">
                            <thead>
                                <tr>
                                    <th scope="col">SI.No</th>
                                    <th scope="col">Image</th>
                                    <th scope="col">Product Name</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Option</th>
                                </tr>
                            </thead>
                            <tbody>
                                {wishlist.wishlist.map((product, item) => {
                                    return (
                                        <tr>
                                            <td scope="row">{item + 1}</td>
                                            <td><img src={productimage + '' + product.Producut_Images} class="cart_image" /></td>
                                            <td> {product.Product_Name}</td>
                                            <td> {product.Producut_Price}</td>
                                            <td class="wish_list_icons">
                                                <i class="fas fa-trash" onClick={() => { delP(item) }}></i>
                                                <i class="fas fa-cart-plus cartt" onClick={() => { addcart(product) }}></i>
                                            </td>
                                        </tr>
                                    )
                                })
                                }
                            </tbody>

                        </table>

                        <div class="row mt-5">
                            <div class="col-md-6 col-sm-12"></div>
                            <div class="col-md-6 col-sm-12">
                                <div class="row">
                                    <div class="col"><button class="btn btn-info w-100 " onClick={() => { delWish() }}><i class="fas fa-trash"></i>
                                        <small class="order_button"> Cancelled List</small></button> </div>
                                    <div class="col"><button class="btn btn-primary w-100 "><i class="fas fa-paper-plane"></i>
                                        <small class="order_button ml-5">Order Now</small> </button></div>
                                </div>

                            </div>
                        </div>
                    </div>
                    :
                    <div className='text-center fs-1'>No Wish List Found</div>
                }
            </div>
        </div>
    )

}

WishList.propTypes = {}

export default withCookies(WishList)
