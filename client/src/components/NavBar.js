import React from 'react';
import { Link } from "react-router-dom";
// import { useQuery } from '@apollo/client';
import Auth from '../utils/auth';
// import { LOGGED_IN_USER } from '../utils/queries';

function NavTabs({ currentPage, handlePageChange }) {
    // const loggedinId = Auth.getProfile().data._id;
    // const { loading, data } = useQuery(LOGGED_IN_USER, {
    //     variables: { userId: loggedinId },
    //   });
    // const loggedinUsername = data?.LoggedinUser || "";
    // console.log(loggedinId);
    // console.log(loggedinUsername.userName);
    console.log(Auth.getToken());

    return (
        <nav className="navbar" role="navigation" aria-label="main navigation" >
            <div className="navbar-brand">
                <Link to="./" className="navbar-item">
                    <a onClick={() => handlePageChange('Home')}>
                    <img src="logo192.png" className="nav-logo"></img>
                    </a>
                </Link>

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
                        {Auth.loggedIn()
                            ? <div className="buttons">
                                <span className='username'>{Auth.getProfile().data.email}</span>
                                <Link to="" >
                                    <a className="button is-light" onClick={(Auth.logout) } >Logout</a>
                                </Link>
                            </div>
                            : <div className="buttons">
                                <Link to='/SignUp'>
                                    <a className="button is-primary" onClick={() => handlePageChange('SignUp')}>
                                        <strong>Sign up</strong>
                                    </a>
                                </Link>
                                <Link to='/LoginForm'>
                                    <a className="button is-light" onClick={() => handlePageChange('LoginForm')}>Log in</a>
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