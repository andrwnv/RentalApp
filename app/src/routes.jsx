import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import Reg from './pages/Reg/Reg';
import Login from './pages/Login/Login';
import NewObject from './pages/New/NewObject';
import Dashboard from './pages/Dashboard/Dashboard';


const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path = "/register" exact component = {Reg} />
                <Route path = "/" exact component = {Login} />
                <Route path = "/dashboard" component = {Dashboard} />
                <Route path = "/new" component = {NewObject} />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes