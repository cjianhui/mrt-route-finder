import React, { Component } from "react";
import {ReactComponent as Logo} from "../resources/train.svg";
import Button from "../components/Button";
import AutoSuggest from "../components/AutoSuggest";
import "./SearchContainer.scss";

export default class SearchContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container has-text-centered">
                <Logo style={{width:80, height:80}}/>
                <h1 className="title is-1 has-text-light">
                    MRT Route Finder
                </h1>

                <p className="subtitle has-text-light">
                    Plan your trips with <span className="has-text-weight-bold">ease</span>
                </p>

                <AutoSuggest label="From"/>
                <AutoSuggest label="To"/>

                <Button text="NAVIGATE"/>

            </div>
        )
    }
}
