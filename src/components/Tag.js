import React from 'react';
import "./Tag.scss";

function getLineColor(line) {
    switch (line) {
        case "CC":
        case "CE":
            return "ccl";
        case "DT":
            return "dtl";
        case "EW":
        case "CG":
            return "#009645";
        case "JE":
        case "JS":
        case "JW":
            return "#0099aa";
        case "NE":
            return "#9900aa";
        case "NS":
            return "#d42e12";
        case "PE":
            break;
        case "BP":
        case "SE":
        case "SW":
            return "#999999";
            break;
        case "TE":
            return "#784008";
        default:
            return "#999999";

    }
}


export default ({ line }) => (
    <span className={`tag has-text-white has-text-weight-bold`} style={{backgroundColor: `${getLineColor(line)}`}}>{line}</span>
)
