import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

const withAuthRedirect = (WrappedComponent) => {
    return (props) => {
        const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

        if (!isLoggedIn) {
            return <Redirect to="/login" />;
        }

        return <WrappedComponent {...props} />;
    };
};

export default withAuthRedirect;
