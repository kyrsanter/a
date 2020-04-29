import React from "react";
import './header.css';
import {NavLink, useHistory} from "react-router-dom";
import jwt_decode from 'jwt-decode';

const Header = () => {

    let history = useHistory();
    let token = localStorage.getItem('token');
    let hasToken = !!token;
    let userId;
    if (hasToken) {
        let decoded = jwt_decode(token);
        if ( decoded.exp > Math.floor(Date.now() / 1000) ) {
            userId = decoded.userId;
        }
    }

    const logoutHandler = () => {
        if (hasToken) {
            localStorage.removeItem('token');
        }
        history.push('/auth')
    };

    return (
        <header className="header">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6">
                        <nav className="navigation">
                            <ul className="navigation-list">
                                {
                                    hasToken && userId ? (
                                        <>
                                            <li className="navigation-list-item">
                                                <NavLink activeClassName='active-link' to='/users' exact={true}>Users</NavLink>
                                            </li>
                                            <li className="navigation-list-item">
                                                <NavLink activeClassName='active-link' to={`/users/${userId}`}>Profile</NavLink>
                                            </li>
                                            <li className="navigation-list-item">
                                                <NavLink activeClassName='active-link' to='/posts'>Posts</NavLink>
                                            </li>
                                            <li onClick={logoutHandler}
                                                className="navigation-list-item">
                                                <span>Logout</span>
                                            </li>
                                        </>
                                    ) : (
                                        <li className="navigation-list-item">
                                            <NavLink activeClassName='active-link' to='/auth'>Login</NavLink>
                                        </li>
                                    )
                                }
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    )
};

export default Header;