import React, { Component } from 'react';
import { instanceOf } from 'prop-types';
import { useLocation, Link } from 'react-router-dom';
import { withCookies, Cookies } from 'react-cookie';


class HeaderSection extends Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            wishList: [],
            cartList: []
        }
    }

    componentDidMount() {
        const { cookies } = this.props;
        this.update = setInterval(() => {
            this.setState({
                wishList: cookies.get('wishlist'),
                cartList: cookies.get('cartlist')
            })

        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.update);
    }


    render() {
        return (
            <div>
                {/* <!--top nav start--> */}
                <div class="nav">
                    <div class="email-area">
                        <p>  <i class="fas fa-phone-alt"></i>+8801820989992</p>
                        <p> <i class="fas fa-envelope"></i> sfd.mhrana@gmail.com</p>
                    </div>
                    <div class="search-area">
                        <input type="text" placeholder="search here" /><i class="fas fa-search"></i>
                    </div>
                    <div class="icon-area">
                        <a href="#"><i class="fab fa-facebook"></i></a>
                        <a href="#"><i class="fab fa-linkedin"></i></a>
                        <a href="https://www.youtube.com/channel/UCjNPHexkmO5tYrnl7ESyXJg" target="_blank"><i class="fab fa-youtube"></i></a>
                        <a href="#"><i class="fab fa-instagram"></i></a>
                    </div>
                </div>
                {/* <!--top nav end--> */}

                {/* <!--nav menu start--> */}
                <nav class="navbar navbar-expand-lg bg-light">
                    <div class="container">
                        <Link to="/" className='navbar-brand'>
                            <img src="img/favicon.ico" alt="" srcset="" />Home Market
                        </Link>
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                            aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse main-menu" id="navbarSupportedContent">
                            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                                <li class="nav-item">
                                    <Link to="/" className='nav-link active text-dark font-weight-bold'>
                                        Home
                                    </Link>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link text-dark font-weight-bold" href="#">About us</a>
                                </li>

                                <li class="nav-item">
                                    <a class="nav-link text-dark font-weight-bold">Contact us</a>
                                </li>
                            </ul>

                            <form class="d-flex main-nav-icon ecommrce-icon" role="search">
                                <Link to="/wish" className='linkdesign'>
                                    <i class="fas fa-heart number">
                                        <strong class="number_st">{this.state.wishList != null ? this.state.wishList.length : 0}</strong>
                                    </i>
                                </Link>
                                <Link to="/cart" className='linkdesign'>
                                    <i class="fas fa-cart-plus number">
                                        <strong class="number_st">{this.state.cartList != null ? this.state.cartList.length : 0}</strong>
                                    </i>
                                </Link>
                                <img src="img/first.png" class="profile_i" alt="" />

                            </form>

                        </div>
                    </div>
                </nav>
                {/* <!--nav menu end--> */}

            </div>
        );
    }
}

HeaderSection.propTypes = {

};

export default withCookies(HeaderSection);