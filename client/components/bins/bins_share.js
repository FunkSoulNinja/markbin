import React, { Component } from 'react';

class BinsShare extends Component {

    showBinsShare() {
        if (Meteor.userId() === this.props.bin.ownerId) {
            return (
                <div className="input-group">
                    <input ref="email" className="form-control" />
                    <div className="input-group-btn">
                        <button
                            className="btn btn-default"
                            onClick={this.onShareClick.bind(this)}
                            >Share bin</button>
                        <button
                            className="btn btn-danger"
                            onClick={this.removeShare.bind(this)}
                            >UnShare bin</button>
                    </div>
                </div>
            );
        }
    }

    onShareClick() {
        const email = this.refs.email.value;
        const regex = /\s+/g
        if (regex.test(email) || email.length < 1 ) { return this.refs.email.value = ""; }
        Meteor.call('bins.share', this.props.bin, email);
        this.refs.email.value = "";

    }

    setInputFromEmailButton() {
        if (Meteor.userId() === this.button.props.bin.ownerId){
            this.button.refs.email.value = this.email;
        }

    }

    renderShareList() {
        const bin = this.props.bin;
        return this.props.bin.sharedWith.map(email => {
            return <button
                        key={email}
                        className="btn btn-default"
                        // onClick={this.setInputFromEmailButton.bind([this, email])}
                        onClick={this.setInputFromEmailButton.bind({button: this, email})}
                        >{email}
                    </button>
        });
    }


    removeShare() {
        const email  = this.refs.email.value;
        Meteor.call('bins.share.remove', this.props.bin, email);
        this.refs.email.value = '';
    }

    render() {
        return (
            <footer className="bins-share">
                {this.showBinsShare()}
                <div>
                    Shared With:
                </div>
                <div className="btn-group">
                    {this.renderShareList()}
                </div>
            </footer>
        )
    }
}

export default BinsShare;
