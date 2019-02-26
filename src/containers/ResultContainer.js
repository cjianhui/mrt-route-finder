import React, { Component } from 'react';
import {ReactComponent as Logo} from "../resources/location.svg";
import Button from "../components/Button";
import Fade from "../components/Fade";
import RouteDetails from "../components/RouteDetails";
import "./ResultContainer.scss";


import {
    Accordion,
    AccordionItem,
    AccordionItemTitle,
    AccordionItemBody,
} from 'react-accessible-accordion';
import getRouteSuggestions from "../api/findPaths";

export default class ResultContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            routes: null
        };
    }

    componentDidMount() {
        const { origin, destination } = this.props.location.state;
        this.setState({routes: getRouteSuggestions( origin, destination)});

        setTimeout(
            function() {
                this.setState({loading: false});
            }.bind(this),
            800
        );

    }

    getRouteSummary(route) {

    }

    getRouteDetails(route) {

    }

    render () {

        const { history } = this.props;
        const { routes } = this.state;

        return (
            this.state.loading ?
                <div className="container has-text-centered">
                    <i className="fas fa-spinner fa-spin fa-3x" style={{color: 'white', marginBottom: 10}}/>
                    <h1 className="has-text-white is-1">Crunching Routes..</h1>
                </div>
                :
                <div className="container has-text-centered">
                <Fade>
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <div className="result-box">
                            <Logo style={{width:70, height:70}}/>
                            <h1 className="title is-4 has-text-black">
                                Suggested Routes
                            </h1>
                            <RouteDetails/>

                            <Button text="CHANGE" icon="fas fa-arrow-left" onClick={() => history.push('/')}/>
                        </div>
                    </div>
                </Fade>
            </div>
        )
    }

}
