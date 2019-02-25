import React, { Component } from 'react';
import { ReactComponent as Logo } from './resources/train.svg';
import Button from '../src/components/Button';
import './sass/styles.scss';
import {getAllStations, getStationName, getPaths} from "./api/findPaths";
import {constructGraph} from "./api/buildGraph";

class App extends Component {
  render() {
      console.log(getAllStations());
      console.log(constructGraph());
      //console.log(getStationName({"CE": 33}));
      //console.log(getPaths("Kent Ridge", "Serangoon"));
    return (
        <section className="bg-gradient-cold hero is-fullheight">
      <div className="hero-body">
        <div className="container has-text-centered">
            <Logo style={{width:80, height:80}}/>
          <h1 className="title is-1 has-text-light">
              MRT Route Finder
          </h1>

          <p className="subtitle has-text-light">
              Plan your trips with <span className="has-text-weight-bold">ease</span>
          </p>

            <div className="field has-addons has-addons-centered">
                <p className="control">
                    <a className="button is-static is-info has-text-white" style={{width: 80}}>
                        From
                    </a>
                </p>
                <p className="control">
                    <input className="input" type="text" style={{width:300}}/>
                </p>

            </div>

            <div className="field has-addons has-addons-centered">
                <p className="control">
                    <a className="button is-static is-info has-text-white" style={{width: 80}}>
                        To
                    </a>
                </p>
                <p className="control">
                    <input className="input" type="text" style={{width:300}}/>
                </p>

            </div>

            <Button text="NAVIGATE"/>

        </div>
      </div>
        </section>
    );
  }
}

export default App;
