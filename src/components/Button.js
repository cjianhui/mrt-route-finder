import React from 'react';
import './Button.scss';
export default (props) => (
    <button
        onClick={props.onclick}
        className="btn-hover gradient"
        style={props.style}
    >
        <i className={props.icon} style={{fontSize: 16, marginRight: 8}}/>
        {props.text}

    </button>
);
