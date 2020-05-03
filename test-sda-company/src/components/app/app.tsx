import React from 'react';
import Header from '../header';
import {Route, Switch, Redirect, RouteComponentProps} from 'react-router-dom';
import LoginPage from "../../pages/login/login-page";
import UsersPage from "../../pages/users/users-page";
import ProfileContainer from "../../containers/profile-container/profile-container";
import MessageContainer from "../../containers/messages-container/messages-container";
import jwt_decode from 'jwt-decode';
import PostsPage from "../../pages/posts-page/posts-page";
import NotFoundPage from "../../pages/404/not-found-page";
import {JWTDecodeType} from "../../types";

const App = () => {

    let token: string | null = localStorage.getItem('token');
    let hasToken = !!token;
    let userId;
    if (hasToken) {
        if (token != null) {
            let decoded: JWTDecodeType = jwt_decode(token);
            userId = decoded.userId;
        }
    }

    return (
        <>
            <section className="app-wrapper">
                <Header />
                <MessageContainer/>
                <Switch>
                    <Route exact path='/'>
                        {hasToken && userId ? <Redirect to={`/users/${userId}`} /> : <Redirect to='/auth' /> }
                    </Route>
                    <Route exact path='/posts' render={() => <PostsPage/>}/>
                    <Route path='/auth' render={() => <LoginPage/>}/>
                    <Route exact path='/users' render={() => <UsersPage/>}/>
                    <Route path='/users/:id' render={({match}: RouteComponentProps<{id: string}>) => {
                        let id: string  = match.params.id;
                        return <ProfileContainer id={id}/>
                    }}/>
                    <Route render={() => <NotFoundPage/>}/>
                </Switch>
            </section>
        </>
    )
};

export default App;