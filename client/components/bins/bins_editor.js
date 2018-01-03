import React, { Component } from 'react';
import CodeMirror from 'react-codemirror';
import 'codemirror/mode/markdown/markdown';

class BinsEditor extends Component {
    onEditorChange(content) {
        Meteor.call('bins.update', this.props.bin, content);
    }
    render() {
        return (
            <div className="col-xs-8">
                <p>Owner: <strong>{this.props.bin.owner.email}</strong></p>
                <p><em>{this.props.bin.createdAt.toDateString()}</em></p>
                <h5>Input</h5>
                <CodeMirror
                defaultValue={this.props.bin.content}
                onChange={this.onEditorChange.bind(this)}
                options={{ mode: 'markdown', lineNumbers: true}} />
            </div>
        )
    }
}

export default BinsEditor;
