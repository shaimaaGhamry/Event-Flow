import React from 'react';

import { Link } from "react-router-dom";

const isLoggedIn = true;

function NavTabs({ currentPage, handlePageChange }) {
    return (
        <nav className="navbar" role="navigation" aria-label="main navigation" >
            <div className="navbar-brand">
                <a className="navbar-item" href="./">
                    <img src="./logo192.png" className="nav-logo"></img>
                </a>

                <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>

            <div className="space-nav">&nbsp;</div>

            <div id="navbarBasicExample" className="navbar-menu">
                <div className="navbar-start">
                    <div className="buttons">
                        <a className="button is-light" href="./myevents">
                            My Events
                        </a>
                        <a className="button is-light" href="./mytasks">
                            My Tasks
                        </a>
                        <a className="button is-light" href="./testing">
                            test environment
                        </a>
                    </div>
                </div>

                <div className="navbar-end">
                    <div className="navbar-item">
                        {isLoggedIn
                            ? <div className="buttons">
                                <span className='username'>username</span>
                                <a className="button is-light">Log out</a>
                            </div>
                            : <div className="buttons">
                                <Link to='/SignUp'>
                                    <a className="button is-primary">
                                        <strong>Sign up</strong>
                                    </a>
                                </Link>
                                <Link to='/LoginForm'>
                                    <a className="button is-light">Log in</a>
                                </Link>
                            </div>
                        }

                    </div>
                </div>
            </div>
        </nav >
    );
}

export default NavTabs;