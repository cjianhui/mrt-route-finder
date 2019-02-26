import React from 'react';
import '../../node_modules/bulma-o-steps/bulma-steps.sass';
import { getLineColor } from "./Tag";


function getInstructionString(step) {
    if (step.type === 'ride') {
        if (step.num_stops > 1) {
            return `Take ${step.num_stops} stops from ${step.from} to ${step.to}.`
        } else {
            return `Take ${step.num_stops} stop from ${step.from} to ${step.to}.`
        }

    } else if (step.type === 'change') {
        return `Change from ${step.from} line to ${step.to} line.`
    }
}

function getColor(step) {
    if (step.type === 'ride') {
        return getLineColor(step.line);
    } else {
        return getLineColor(step.to);
    }
}

function getCurrentStation(step) {
    if (step.type === 'ride') {
        return step.from;
    } else {
        return step.station;
    }
}

const StepSegment = ({ step }) => (
    <li className="steps-segment is-active">
        <span className="steps-marker"  style={{backgroundColor: getColor(step)}}/>
        <div className="steps-content">
            <p className="is-size-4">{getCurrentStation(step)}</p>
            <p>{getInstructionString(step)}</p>
        </div>
    </li>
);

const StepEnd = ({ step }) => (
    <li className="steps-segment is-active">
        <span className="steps-marker"  style={{backgroundColor: getColor(step)}}/>
        <div className="steps-content">
            <p className="is-size-4">{step.to}</p>
            <p>You have arrived at your destination.</p>
        </div>
    </li>
);


export default ({steps}) => (
    <ul className="steps is-thin is-vertical">
        {
            steps.map((step, i) => <StepSegment step={step} key={i}/>)
        }
        {
            <StepEnd step={steps[steps.length-1]}/>
        }
    </ul>
);
