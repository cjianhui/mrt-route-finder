import React from 'react';
import "./Tag.scss";

function getLineColor(line) {
    switch (line) {
        case "CC":
        case "CE":
            return "#fa9e0d";
        case "DT":
            return "#005ec4";
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

function getTextColor(line) {
    if (line === "BP" || line === "SE" || line === "SW") {
        return "has-text-black";
    } else {
        return "has-text-white";
    }
}

export default ({ line }) => (
    <span className={`tag ${getTextColor(line)} has-text-weight-bold`}
          style={{backgroundColor: `${getLineColor(line)}`}}>
        {line}
    </span>
)
