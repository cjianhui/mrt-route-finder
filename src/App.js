import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import AppWrapper from "./containers/AppWrapper";
import SearchContainer from "./containers/SearchContainer";
import ResultContainer from "./containers/ResultContainer";
import {getAllStations} from "./api/findPaths";

class App extends Component {
  render() {
      console.log(getAllStations());
      // console.log(constructGraph());
      // console.log(getPaths("Tuas Link", "Oasis"));
      /*<SearchContainer/>*/
    return (
        <AppWrapper>
            <Route path="/" exact component={SearchContainer}/>
            <Route path="/navigate" exact component={ResultContainer}/>
        </AppWrapper>
    );
  }
}

export default App;
