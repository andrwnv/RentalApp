import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Reg from './pages/Reg/Reg';
import Login from './pages/Login/Login';
import NewObject from './pages/NewObject/NewObject';
import Dashboard from './pages/Dashboard/Dashboard';
import ObjectPage from './pages/ObjectPage/ObjectPage';
import PlannedTrip from './pages/PlannedTrip/PlannedTrip';
import UserProfile from './pages/UserProfile/UserProfile';
import ProtectedRoute from './components/CustomRoute/ProtectedRoute';


const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path = '/register' exact component = {Reg} />
                <Route path = '/' exact component = {Login} />
                <ProtectedRoute path = '/current_user' component = {UserProfile} />
                <ProtectedRoute path = '/ad/:objectId' component = {ObjectPage} />
                <ProtectedRoute path = '/dashboard' component = {Dashboard} />
                <ProtectedRoute path = '/new' component = {NewObject} />
                <ProtectedRoute path = '/plane_trip' component = {PlannedTrip} />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;
