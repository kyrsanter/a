import React from "react";
import LoginContainer from "../../containers/login-container/login-container";

const LoginPage = () => {
    return (
        <div className="login-page d-flex align-items-center justify-content-center">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-6">
                        <LoginContainer/>
                    </div>
                    <div className="col-lg-6">
                        <p>Shanna@melissa.tv</p>
                        <br/>
                        <p>Sincere@april.biz</p>
                        <br/>
                        <p>Nathan@yesenia.net</p>
                        <br/>
                        <p>Julianne.OConner@kory.org</p>
                        <br/>
                        <p>Lucio_Hettinger@annie.ca</p>
                        <br/>
                        <p>Karley_Dach@jasper.info</p>
                        <br/>
                        <p>Telly.Hoeger@billy.biz</p>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default LoginPage;

