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

            <div className="tabs nav-tabs is-centered is-boxed">
                <ul>
                    <Link to="/myevents" className={currentPage === 'MyEvents' ? 'nav-link is-current' : 'nav-link'}>
                        <li>
                            <a onClick={() => handlePageChange('MyEvents')}>
                                <span className="icon is-medium"><img src="./events.png" className="fas" aria-hidden="true"></img></span>
                                <span><strong>My Events</strong></span>
                            </a>
                        </li>
                    </Link>
                    <Link to='/mytasks' className={currentPage === 'MyTasks' ? 'nav-link is-current' : 'nav-link'}>
                        <li>
                            <a onClick={() => handlePageChange('MyTasks')}>
                                <span className="icon is-medium"><img src="./tasks.png" className="fas" aria-hidden="true"></img></span>
                                <span><strong>My Tasks</strong></span>
                            </a>
                        </li>
                    </Link>
                    <Link to='/testing' className={currentPage === 'TestEnv' ? 'nav-link is-current' : 'nav-link'}>
                        <li>
                            <a onClick={() => handlePageChange('TestEnv')}>
                                <span className="icon is-medium"><i className="fas fa-film" aria-hidden="true"></i></span>
                                <span><strong>test environment</strong></span>
                            </a>
                        </li>
                    </Link>
                </ul>
            </div>

            <div id="navbarBasicExample" className="navbar-menu">
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