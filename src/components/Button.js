import React from 'react';
import './Button.scss';
export default (props) => (
    <button onClick={props.onclick} className="btn-hover gradient"><i className="fas fa-location-arrow" style={{fontSize: 16, marginRight: 8}}/>{props.text}</button>
);
