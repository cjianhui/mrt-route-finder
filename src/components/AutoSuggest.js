import React from 'react';
import Select, { components } from 'react-select';
import Tag from "../components/Tag";
import './AutoSuggest.scss';
import { getStationJson } from "../api/findPaths";

const stations = Object.keys(getStationJson());
const options = stations.map(opt => ({ label: opt, value: opt }));

const SingleValue = ({ children, ...props }) => (
    <components.SingleValue {...props}>
        {children} {getTags(props.data.value)}
    </components.SingleValue>
);

const getTags = (station) => {
    const stationJson = getStationJson();
    const lines = stationJson[station];
    let tags = [];

    for (let line in lines) {
        tags.push(" ");
        tags.push(<Tag line={line}/>);
    }

    return tags;
};

const Option = props => {
    return (
        <components.Option {...props}>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
            {props.data.value}
                <div>{getTags(props.data.value)}</div>
            </div>
        </components.Option>
    );
};

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
                        components={{ Option, SingleValue }}
                        value={selectedOption}
                        onChange={onChange}
                        options={options}
                        name={name}
                        isClearable
                    />
                </div>
            </div>
);









