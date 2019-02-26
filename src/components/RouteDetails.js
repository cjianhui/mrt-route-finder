import React from 'react';
import './RouteDetails.scss';
import Tag from '../components/Tag';
import '../../node_modules/bulma-o-steps/bulma-steps.sass';
import {Accordion, AccordionItem, AccordionItemBody, AccordionItemTitle} from "react-accessible-accordion";


function createRouteSummary(steps) {
    let summary = [];
    let totalStops = 0;
    for (let i = 0; i < steps.length; i++) {
        totalStops += steps["num_stops"];
        if (!(i+1) === steps.length) {
            summary.push(`<Tag line="${steps["line"]}"/>`);
            summary.push(` <i class="fas fa-caret-right"/> `);
        } else {
            summary.push(`<Tag line="${steps["line"]}"/>`);
        }
    }
    summary.push(`<h1 className="has-text-weight-bold" style={{marginTop: 5}}>${totalStops}</h1>`);

    return summary;
}

function createRouteDetails(routes) {


}


export default ({ routes }) => (
        <Accordion>
        <AccordionItem>
            <AccordionItemTitle>
                <h3 className="u-position-relative">
                    <Tag line="NS"/> < i className="fas fa-caret-right"/> <Tag line="EW"/>
                    <div className="accordion__arrow" role="presentation" />
                </h3>

            </AccordionItemTitle>
            <AccordionItemBody>
                <p>
                    Accessible Accordion component for React. Inspired by{' '}
                    <a
                        href="https://github.com/react-component/collapse"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        rc-collapse
                    </a>{' '}
                    and{' '}
                    <a
                        href="https://github.com/daviferreira/react-sanfona"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        react-sanfona
                    </a>
                    .
                </p>
            </AccordionItemBody>
        </AccordionItem>
        <AccordionItem className="accordion__item">
            <AccordionItemTitle>
                <h3 className=" u-position-relative u-margin-bottom-s">
                    Components
                    <div className="accordion__arrow" role="presentation" />
                </h3>
                <div>See all the components from this package</div>
            </AccordionItemTitle>
            <AccordionItemBody>
                <ul className="steps is-thin is-vertical">
                    <li className="steps-segment is-active">
                        <span className="steps-marker"  style={{backgroundColor: 'red'}}></span>
                        <div className="steps-content">
                            <p className="is-size-4">Step 1</p>
                            <p>This is the first step, which means you start here.</p>
                        </div>
                    </li>
                    <li className="steps-segment">
                        <span className="steps-marker" style={{backgroundColor: 'red'}}></span>
                    </li>
                    <li className="steps-segment is-active">
                        <span className="steps-marker"></span>
                    </li>
                    <li className="steps-segment">
                        <span className="steps-marker"></span>
                    </li>
                    <li className="steps-segment">
                        <span className="steps-marker"></span>
                    </li>
                    <li className="steps-segment">
                        <span className="steps-marker"></span>
                    </li>
                    <li className="steps-segment">
                        <span className="steps-marker"></span>
                    </li>
                    <li className="steps-segment">
                        <span className="steps-marker"></span>
                    </li>
                    <li className="steps-segment">
                        <span className="steps-marker"></span>
                    </li>
                </ul>
            </AccordionItemBody>
        </AccordionItem>
    </Accordion>
);
