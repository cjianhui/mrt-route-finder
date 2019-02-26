import React from 'react';
import { Accordion, AccordionItem, AccordionItemBody, AccordionItemTitle } from "react-accessible-accordion";
import './RouteDetails.scss';
import Tag from '../components/Tag';
import TransitDirectionLine from '../components/TransitDirectionsLine';


const RouteItem = ({ steps }) => (
    <AccordionItem>
        <AccordionItemTitle>
            <h3 className="u-position-relative">
                {createRouteSummary(steps.steps)}
                <div className="accordion__arrow" role="presentation" />
            </h3>

        </AccordionItemTitle>
        <AccordionItemBody>
            <TransitDirectionLine steps={steps.steps}/>
        </AccordionItemBody>
    </AccordionItem>
);


function createRouteSummary(steps) {
    let summary = [];
    let totalStops = 0;
    for (let i = 0; i < steps.length; i++) {
        if (steps[i]["type"] === 'ride') {
            totalStops += steps[i]["num_stops"];
            if (i+1 !== steps.length) {
                summary.push(<Tag line={steps[i]["line"]}/>);
                summary.push(" ");
                summary.push(<i className="fas fa-angle-right"/>);
                summary.push(" ");
            } else {
                summary.push(<Tag line={steps[i]["line"]}/>);
            }
        }
    }
    summary.push(<p><span className="tag has-text-black" style={{marginTop: 5, backgroundColor: '#C0C0C0'}}>{totalStops} stops</span></p>);

    return summary;
}

export default ({ routes }) => (
        <Accordion>
            {
               routes.map((route, i) => <RouteItem steps={route} key={i}/>)
            }
        </Accordion>
);
