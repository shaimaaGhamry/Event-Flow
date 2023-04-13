import React from 'react';

function NavTabs({ currentPage, handlePageChange }) {
    return (
        <nav class="navbar" role="navigation" aria-label="main navigation" >
            <div class="navbar-brand">
                <a class="navbar-item" href="./">
                    <img src="./logo192.png" class="nav-logo"></img>
                </a>

                <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>

            <div class="space-nav">&nbsp;</div>

            <div id="navbarBasicExample" class="navbar-menu">
                <div class="navbar-start">
                    <div class="buttons">
                        <a class="button is-light" href="./myevents">
                            My Events
                        </a>
                        <a class="button is-light" href="./mytasks">
                            My Tasks
                        </a>
                        <a class="button is-light" href="./testing">
                            test environment
                        </a>
                    </div>
                </div>

                <div class="navbar-end">
                    <div class="navbar-item">
                        <div class="buttons">
                            <a class="button is-primary">
                                <strong>Sign up</strong>
                            </a>
                            <a class="button is-light">
                                Log in
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </nav >
    );
}

export default NavTabs;