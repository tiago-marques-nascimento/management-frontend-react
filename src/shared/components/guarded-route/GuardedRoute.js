import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import './GuardedRoute.css';
import {
    Redirect
} from "react-router-dom";

class GuardedRoute extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    verify() {
        if (!this.props.user.token) {
            return {enable: false, redirect: '/login'};
        }
        const routeClaims = this.props.claims;
        const userClaims = this.props.user.claims;
        const access = routeClaims.filter(routeClaim => userClaims.filter(userClaim => userClaim === routeClaim).length > 0).length > 0;
        if (!access) {
            return {enabled: false, redirect: '/unauthorized'};
        }
        return {enabled: true};
    }

    render() {
        const children = this.props.children;
        const access = this.verify();
        return (
        <div>
            {access.enabled ? children : <Redirect to={access.redirect}/>}
        </div>
        );
    }
}

GuardedRoute.propTypes = {
    user: PropTypes.shape({
        token: PropTypes.string,
        subject: PropTypes.string,
        claims: PropTypes.array
    }),
    claims: PropTypes.array,
    children: PropTypes.object
};

const mapStateToProps = state => ({
    user: {
        token: state.jwt.token,
        subject: state.jwt.subject,
        claims: state.jwt.claims
    }
});

export default connect(mapStateToProps)(GuardedRoute);
