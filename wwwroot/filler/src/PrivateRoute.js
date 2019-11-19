import React from 'react';
import AuthService from './services/AuthService';
import { Route, Redirect } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage/DashboardPage';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={
        (props) => (
            AuthService.tokenExist()
        ? <DashboardPage {...props} />
        : <Redirect to='/' />
        )
    } />
)

export default PrivateRoute;