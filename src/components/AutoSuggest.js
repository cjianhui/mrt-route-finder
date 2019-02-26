import React from 'react';
import Select from 'react-select';
import './AutoSuggest.scss';
import { getStationJson } from "../api/findPaths";

const stations = Object.keys(getStationJson());
const options = stations.map(opt => ({ label: opt, value: opt }));

export default ({ label, labelWidth=80, onChange, name, selectedOption, placeholder}) => (
            <div className="field has-addons has-addons-centered">
                <p className="control">
                    <a className="button is-static is-info has-text-white" style={{width: labelWidth, height: 39}}>
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









