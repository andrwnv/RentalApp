import React from 'react';
import {Route, Redirect} from 'react-router-dom';

import Cookies from '../../services/cookies';

export default function ProtectedRoute({component: Component, ...rest}) {
    return (
        <Route
            {...rest}
            render = {(props) => {
                const token = Cookies.get('token');

                if (token) {
                    return <Component {...props} />;
                } else {
                    return (
                        <Redirect
                            to = {{
                                pathname: '/',
                                state: {
                                    from: props.location
                                }
                            }}
                        />
                    )
                }
            }}
        />
    );
}
