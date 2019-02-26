import React, { Component } from "react";
import {ReactComponent as Logo} from "../resources/train.svg";
import Button from "../components/Button";
import AutoSuggest from "../components/AutoSuggest";
import Fade from "../components/Fade";
import "./SearchContainer.scss";

export default class SearchContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOrigin: null,
            selectedDestination: null,
            error: null
        };

    }

    handleOriginChange = (selectedOrigin) => {
        this.setState({ selectedOrigin });
        //console.log(`Origin selected:`, selectedOrigin);
    };

    handleDestinationChange = (selectedDestination) => {
        this.setState({ selectedDestination });
        //console.log('Destination selected:', selectedDestination);
    };


    handleOnClick = () => {
        const { selectedOrigin, selectedDestination } = this.state;
        if (selectedOrigin === null || selectedDestination === null) {
            this.setState({error: "Please enter an origin and destination."});
        } else if (selectedOrigin === selectedDestination) {
            this.setState({error: "Origin and destination has to be different."})
        } else {
            this.props.history.push('/navigate', { origin: selectedOrigin.value, destination: selectedDestination.value});
        }

    };

    render() {
        const { selectedOrigin, selectedDestination, error } = this.state;
        return (
            <div className="container has-text-centered">
                <Fade>
                    <Logo style={{width:80, height:80}}/>
                    <h1 className="title is-1 has-text-light">
                        MRT Route Finder
                    </h1>

                    <p className="subtitle has-text-light">
                        Plan your trips with <span className="has-text-weight-bold">ease</span>
                    </p>

                    <AutoSuggest
                        label="From"
                        name="source"
                        placeholder="Select origin"
                        onChange={this.handleOriginChange}
                        value={selectedOrigin}
                    />

                    <AutoSuggest
                        label="To"
                        name="destination"
                        placeholder="Select destination"
                        onChange={this.handleDestinationChange}
                        value={selectedDestination}
                    />

                    {error ? <p className="text-gradient-warm is-1 has-text-weight-bold">{error}</p> : null}


                    <Button text="NAVIGATE" icon="fas fa-location-arrow" onClick={this.handleOnClick}/>
                </Fade>
            </div>
        )
    }
}
