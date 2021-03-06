import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import AppWrapper from "./containers/AppWrapper";
import SearchContainer from "./containers/SearchContainer";
import ResultContainer from "./containers/ResultContainer";

class App extends Component {
  render() {
    return (
        <AppWrapper>
            <Route path="/" exact component={SearchContainer}/>
            <Route path="/navigate" exact component={ResultContainer}/>
        </AppWrapper>
    );
  }
}

export default App;
