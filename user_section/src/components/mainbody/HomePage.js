import React, { Component } from 'react';
import apiurl from '../ApiUrl.json';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import { Link } from 'react-router-dom';

class HomePage extends Component {
    
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props);
        const { cookies } = this.props;

        this.state = {
            allShops: [],
            ownerimage: apiurl.Image_URL + "shopuserImage/",
            allCategoryName: [],
            allProducts: [],
            productimage: apiurl.Image_URL + "productImage/",
            isLoaded: false,
            wishItems: cookies.get('wishlist')||[],
            cartItems: cookies.get('cartlist')||[]
        }

    }

    componentDidMount() {

        let url = apiurl.SERVER_URL + "getAllProduct";
        fetch(url).then((response) => {
            response.json().then((result) => {
                var productarrayobject = result[0];
                this.setState({
                    allProducts: productarrayobject,
                    allCategoryName: Object.keys(productarrayobject),
                    isLoaded: true,
                });

                // console.warn(this.state.allCategoryName)
            })
        }).catch(err => {
        })

    }

    componentDidUpdate() {

        //console.warn(this.state.wishItems)
        // localStorage.setItem('wishlist', JSON.stringify(this.state.wishItems));
        // localStorage.setItem('cartlist', JSON.stringify(this.state.cartItems));
    }

    wishlist(product) {
        const { cookies } = this.props;

        var wishlist = this.state.wishItems;
        if (this.state.wishItems.length > 0) {
            var check = false;
            for (var i = 0; i < this.state.wishItems.length; i++) {
                if (product.Category_Id === wishlist[i].Category_Id &&
                    product.Product_Id === wishlist[i].Product_Id &&
                    product.User_ID === wishlist[i].User_ID) {
                    check = false;
                    break;
                } else {
                    check = true;
                }
            }
            if (check) {

                this.setState({ wishItems: this.state.wishItems.concat(product) })
                cookies.set('wishlist', this.state.wishItems.concat(product), { path: '/' })

            } else {
                console.warn("product already have");
            }
        } else {
            this.setState({ wishItems: this.state.wishItems.concat(product) })
            cookies.set('wishlist', this.state.wishItems.concat(product), { path: '/' })
        }

    }
 
    cartlist(product) {
        const { cookies } = this.props;
        const target = { Order_Quantaty: 1 };
        const returnedTarget = Object.assign(target, product);

        var cartlist = this.state.cartItems;
        if (this.state.cartItems.length > 0) {
            var check = false;
            for (var i = 0; i < this.state.cartItems.length; i++) {
                if (product.Category_Id === cartlist[i].Category_Id &&
                    product.Product_Id === cartlist[i].Product_Id &&
                    product.User_ID === cartlist[i].User_ID) {
                    check = false;
                    break;
                } else {
                    check = true;
                }
            }
            if (check) {
                this.setState({ cartItems: this.state.cartItems.concat(returnedTarget) })
                cookies.set('cartlist', this.state.cartItems.concat(returnedTarget), { path: '/' })
            } else {
                console.warn("product already have");
            }
        } else {
            this.setState({ cartItems: this.state.cartItems.concat(returnedTarget) })
            cookies.set('cartlist', this.state.cartItems.concat(returnedTarget), { path: '/' })
        }
    }

    render() {
        return (
            <div>
                {
                    this.state.isLoaded ?
                        this.state.allCategoryName.map((item, i) => {
                            return (
                                <div class="container-fluid ">
                                    <div class="container mt-3 mb-3 pt-3 pb-3 bg-light">

                                        <div class=" container-fluid mt-2">
                                            <div class="container">
                                                <div class="row">
                                                    <div class="col">
                                                        <h2>{item}</h2>
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
                                                        this.state.allProducts[item].length ?
                                                            this.state.allProducts[item].slice(0, 11).map((product, index) => {
                                                                    const categoryProduct=this.state.allProducts[item];
                                                                return (
                                                                    <div class="col-md-4 col-lg-2 col-sm-6 mt-2">
                                                                        <div class="card">
                                                                            <img src={this.state.productimage + '' + product.Producut_Images} class="img-fluid" alt="" srcset="" />
                                                                            <div class="name_price">
                                                                                <h6 class="text-center">
                                                                                    <Link to="/product" state={{product,categoryProduct}} className='linkdesign'>
                                                                                        {product.Product_Name}
                                                                                    </Link></h6>
                                                                                <p class="text-center"> {product.Producut_Price} /-</p>
                                                                                <i class="fas fa-heart" onClick={() => this.wishlist(product)}></i>
                                                                                <i class="fas fa-cart-plus cartt" onClick={() => this.cartlist(product)}></i>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                )
                                                            }) :
                                                            2
                                                    }
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            )

                        })
                        :
                        <p>No Data Found</p>
                }
            </div >
        );
    }

}

HomePage.propTypes = {

};

export default withCookies(HomePage);