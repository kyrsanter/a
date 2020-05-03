import React, {FC} from "react";
import LoginForm from "../../components/login-form";
import {connect} from 'react-redux';
import {loginUserThunk} from '../../actions/users.actions'
import {RootStateType} from "../../store/store";
import {DispatchType} from "./types";
import { History } from 'history';

const LoginContainer: FC<DispatchType> = (props: DispatchType) => {
    return <LoginForm login={props.login} />;
};

let mapDispatchToProps = (dispatch: any) => {
    return {
        login: (email:string, history: History) => dispatch(loginUserThunk(email, history))
    }
};

export default connect<{}, DispatchType, {}, RootStateType>(null, mapDispatchToProps)(LoginContainer)