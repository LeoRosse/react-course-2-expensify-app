//Higher Order Component (HOC) - A component () that renders another component
//Reuse Code
//Render hijacking
//Prop manupulation
//Abstract state

import React from 'react';
import ReactDOM from 'react-dom';

const Info = (props) => (
    <div>
        <h1>Info</h1>
        <p>The info is:{props.info}</p>
    </div >
);

const withAdminWarning = (WrappedComponent) => {
    return (props) => (
        <div>
            {props.isAdmin && <p>This is private info. Please don't share!</p>}
            <WrappedComponent {...props} />
        </div>
    );
};

//require Authentication
const requireAuthentication = (WrappedComponent) => {
    return (props) => (
        <div>
            {/* COSI' ANDAVA BENE, LO SCRIVO COME LUI CHE E' PIU' COINCISO ED ELEGANTE            
            {props.isAuthenticated === true && <p>This is private info. Please don't share!</p>}
            {props.isAuthenticated === true && <WrappedComponent {...props} />}
            {props.isAuthenticated === false && <p>Please paste the credential and login!</p>} */}
            {props.isAuthenticated ? (
                <WrappedComponent {...props} />
            ) : (
                    <p>Please login to view the info</p>
                )}
        </div>
    )
}
const AdminInfo = withAdminWarning(Info);
const AuthInfo = requireAuthentication(Info);

// ReactDOM.render(<AdminInfo isAdmin={true} info="This is the details" />, document.getElementById('app'));
ReactDOM.render(<AuthInfo isAuthenticated={true} info="This is the details" />, document.getElementById('app'));