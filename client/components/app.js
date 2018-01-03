import React from 'react';
import Header from './header';

export default (props) => {
    return (
        <div>
            <Header />
            <div className="side-padding">
                {props.children}
            </div>

        </div>
    );
};
