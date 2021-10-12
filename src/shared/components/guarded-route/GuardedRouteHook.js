import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux'
import './GuardedRoute.css';
import {
    Redirect
} from "react-router-dom";

export default function GuardedRouteHook(props) {

    const user = {};
    user.token = useSelector(state => state.jwt.token);
    user.subject = useSelector(state => state.jwt.subject);
    user.claims = useSelector(state => state.jwt.claims);

    const verify = () => {
        if (!user.token) {
            return {enable: false, redirect: '/login'};
        }
        const routeClaims = props.claims;
        const userClaims = user.claims;
        const access = routeClaims.filter(routeClaim => userClaims.filter(userClaim => userClaim === routeClaim).length > 0).length > 0;
        if (!access) {
            return {enabled: false, redirect: '/unauthorized'};
        }
        return {enabled: true};
    }

    const children = props.children;
    const access = verify();
    return (
    <div>
        {access.enabled ? children : <Redirect to={access.redirect}/>}
    </div>
    );
}

GuardedRouteHook.propTypes = {
    user: PropTypes.shape({
        token: PropTypes.string,
        subject: PropTypes.string,
        claims: PropTypes.array
    }),
    claims: PropTypes.array,
    children: PropTypes.object
};
