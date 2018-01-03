import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Bins } from '../../../imports/collections/bins';
import { Link } from 'react-router';

class BinsList extends Component {
    constructor(props) {
        super(props);

    }

    addDelButton(bin) {
        if (bin.ownerId == Meteor.userId()) {
            return (
                <span className="pull-right">
                    <button
                        className="btn btn-danger"
                        onClick={() => this.onBinRemove(bin)}>
                        Remove
                    </button>
                </span>
            )
        } else {
            if (bin.owner) {
                return (
                    <span className="pull-right center-vertically">
                        <em>Owner:</em> {bin.owner.email}
                    </span>
                );
            }

        }
    }

    onBinRemove(bin) {
        if( confirm(`Are you sure you want to delete bin ${bin._id}?`) ) {
            Meteor.call('bins.remove', bin);
        } else {
            return;
        }

    }
    renderList() {
        return this.props.bins.map(bin => {
            const url = `/bins/${bin._id}`;
            return (
                <li className="list-group-item" key={bin._id}>
                    <Link to={url}>Bin {bin._id}</Link>
                    {this.addDelButton(bin)}
                </li>
            );
        });
    }

    render() {
        return (
            <ul className="list-group">
                {this.renderList()}
            </ul>
        );
    }
}

export default createContainer(() => {
    Meteor.subscribe('bins');
    Meteor.subscribe('sharedBins');

    return { bins: Bins.find({}).fetch() };
}, BinsList);
