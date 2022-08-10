import React, { Component } from 'react';
import PropTypes from 'prop-types';

class FooterSection extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div>
                {/* <!--footer section start--> */}

                <div class="container-fluid bg-light p-5">
                    <div class="row pb-1 footerstyle" >
                        <div class="col pb-2">
                            <h1>logo here</h1>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero assumenda, ratione, alias expedita
                                aliquid unde porro atque temporibus facere culpa laudantium nisi beatae magni veritatis ex autem
                                necessitatibus, nostrum inventore!</p>
                        </div>

                        <div class="col pb-2">
                            <div class="row">
                                <div class="col">
                                    <h3 class="text-center">CATAGORY</h3>
                                    <a class="nav-link text-center" href="#">catagory 1</a>
                                    <a class="nav-link text-center" href="#">catagory 1</a>
                                    <a class="nav-link text-center" href="#">catagory 1</a>
                                    <a class="nav-link text-center" href="#">catagory 1</a>
                                    <a class="nav-link text-center" href="#">catagory 1</a>
                                </div>

                                <div class="col">
                                    <h3 class="text-center">Main menu</h3>
                                    <a class="nav-link text-center" href="/">Home</a>
                                    <a class="nav-link text-center" href="/product">About us</a>
                                    <a class="nav-link text-center" href="/">Contact Us</a>
                                    <a class="nav-link text-center" href="/">Cart</a>
                                    <a class="nav-link text-center" href="/">Wish List</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <a class="nav-link text-center mt-3" href="#">@ copyright-2022 made by MH Rana</a>
                </div>
                {/* <!--footer section end--> */}
            </div>
        );
    }
}

FooterSection.propTypes = {

};

export default FooterSection;