import React from "react";
import './404.css';

const NotFound = () => {
    return (
        <div className="not-found">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-3 d-flex justify-content-center">
                        <h1>404</h1>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-lg-3 d-flex justify-content-center">
                        <h2>Page not found</h2>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default NotFound;