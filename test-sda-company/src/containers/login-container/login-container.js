import React from "react";
import LoginForm from "../../components/login-form";
import {connect} from 'react-redux';
import {loginUserThunk} from '../../actions/users.actions'


const LoginContainer = (props) => <LoginForm login={props.login}/>;

let mapDispatchToProps = (dispatch) => {
    return {
        login: (email, history) => dispatch(loginUserThunk(email, history))
    }
};

export default connect(null, mapDispatchToProps)(LoginContainer)