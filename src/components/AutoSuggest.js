import React, { Component } from 'react';
import Select from 'react-select';
import './AutoSuggest.scss';
import { getStationJson } from "../api/findPaths";

const stations = Object.keys(getStationJson());
const options = stations.map(opt => ({ label: opt, value: opt }));

export default class AutoSuggest extends Component {
    constructor(props) {
        super(props);
    }



    render() {
        const {
            label,
            labelWidth=80,
            onChange,
            name,
            selectedOption,
            placeholder
        } = this.props;

        return (
            <div className="field has-addons has-addons-centered">
                <p className="control">
                    <a className="button is-static is-info has-text-white" style={{width: labelWidth}}>
                        {label}
                    </a>
                </p>

                <div className="control" style={{width: 350}}>
                    <Select
                        style={{width: 300}}
                        placeholder={placeholder}
                        value={selectedOption}
                        onChange={onChange}
                        options={options}
                        name={name}
                        isClearable
                    />
                </div>
            </div>
        );
    }

    /*
    render() {

        /*
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
    */

}







