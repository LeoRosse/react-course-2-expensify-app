import React from 'react';
import {connect }from 'react-redux';
import { NavLink } from 'react-router-dom';
import { startLogout } from '../actions/auth';

export const Header = ({ startLogout }) => (
    <header>
        <h1>Expensify</h1>
        <div>
            <NavLink to="/dashboard" activeClassName="is-active">Dashboard</NavLink>
            <NavLink to="/create" activeClassName="is-active">Create Expense</NavLink>
            {/* <NavLink to="/edit" activeClassName="is-active">Edit Expense</NavLink> */}
            {/* <NavLink to="/help" activeClassName="is-active">Help</NavLink> */}
            <button onClick={startLogout}>Logout</button>
        </div>
    </header>
);


const mapDispatchToProps = (dispatch) => ({
    startLogout: () => dispatch(startLogout())
});

export default connect(undefined, mapDispatchToProps)(Header);

