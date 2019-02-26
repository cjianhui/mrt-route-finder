import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {ReactComponent as Logo} from "../resources/location.svg";
import Button from "../components/Button";
import CSSTransitionGroup from 'react-addons-css-transition-group'
import Fade from "../components/Fade";
import "./ResultContainer.scss";

import {
    Accordion,
    AccordionItem,
    AccordionItemTitle,
    AccordionItemBody,
} from 'react-accessible-accordion';

export default class ResultContainer extends Component {
    constructor(props) {
        super(props)
    }

    render () {

        const { history } = this.props;

        return (

            <div className="container has-text-centered">
                <Fade>
                <Logo style={{width:70, height:70}}/>
                <h1 className="title is-4 has-text-light">
                    Suggested Routes
                </h1>
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <div className="result-box">
                            <Accordion>
                                <AccordionItem>
                                    <AccordionItemTitle>
                                        <h3 className="u-position-relative">
                                            Accessible Accordion
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
                                        <ul>
                                            <li>Accordion</li>
                                            <li>AccordionItem</li>
                                            <li>AccordionItemTitle</li>
                                            <li>AccordionItemBody</li>
                                        </ul>
                                    </AccordionItemBody>
                                </AccordionItem>
                            </Accordion>

                            <Button text="CHANGE" icon="fas fa-arrow-left" onClick={() => history.push('/')}/>
                        </div>
                    </div>
                </Fade>
            </div>

        )
    }

}
