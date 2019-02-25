import React, { Component } from 'react';
import AppWrapper from "./containers/AppWrapper";
import SearchContainer from "./containers/SearchContainer";

class App extends Component {
  render() {
      // console.log(constructGraph());
      // console.log(getPaths("Tuas Link", "Oasis"));
    return (
        <AppWrapper>
            <SearchContainer/>
        </AppWrapper>
    );
  }
}

export default App;
