// AuthRoute.jsx
import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { AuthContext } from '../context/Authcontext'; // สร้าง AuthContext เพื่อให้สามารถตรวจสอบสถานะการเข้าสู่ระบบได้

const AuthRoute = ({ component: Component, ...rest }) => {
    const { currentUser } = useContext(AuthContext);

    return (
        <Route
            {...rest}
            render={(props) =>
                currentUser ? <Component {...props} /> : <Navigate to="/login" />
            }
        />
    );
};

export default AuthRoute;
