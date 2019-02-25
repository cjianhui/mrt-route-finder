import React, { Component } from "react";
import {ReactComponent as Logo} from "../resources/train.svg";
import Button from "../components/Button";
import AutoSuggest from "../components/AutoSuggest";
import "./SearchContainer.scss";

export default class SearchContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOrigin: null,
            selectedDestination: null
        };
    }

    handleOriginChange = (selectedOrigin) => {
        this.setState({ selectedOrigin });
        console.log(`Origin selected:`, selectedOrigin);
    };

    handleDestinationChange = (selectedDestination) => {
        this.setState({ selectedDestination });
        console.log('Destination selected:', selectedDestination);
    };



    render() {
        const { selectedOrigin, selectedDestination } = this.state;
        return (
            <div className="container has-text-centered">
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

                <Button text="NAVIGATE"/>

            </div>
        )
    }
}
