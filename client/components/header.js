import React, { Component } from 'react';
import Accounts from './accounts';
import { Link, browserHistory } from 'react-router';

class Header extends Component {
    onBinClick(event) {
        event.preventDefault();
        if (Meteor.user()) {
            Meteor.call('bins.insert', (error, binId) => {
                browserHistory.push(`/bins/${binId}`);
            });
        }
    }
    render() {
        return (
            <nav className="nav navbar-inverse navbar-fixed-top">
                <div className="container">
                    <div className="navbar-header">
                        <Link to="/" className="navbar-brand">Markbin</Link>
                    </div>
                    <ul className="nav navbar-nav">
                        <li>
                            <Accounts />
                        </li>
                        <li>
                            <a href="#" onClick={this.onBinClick.bind(this)}>Create Bin</a>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

export default Header;
