import React, { Component } from 'react';
import './AutoSuggest.scss';

export default class AutoSuggest extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const {
            label,
            labelWidth=80,
            textInputWidth=300
        } = this.props;

        return (
            <div className="field has-addons has-addons-centered">
                <p className="control">
                    <a className="button is-static is-info has-text-white" style={{width: labelWidth}}>
                        {label}
                    </a>
                </p>
                <p className="control">
                    <input className="input" type="text" style={{width: textInputWidth}}/>
                </p>

            </div>
        );
    }
}
