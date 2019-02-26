import React, { Component } from 'react';
import AppWrapper from "./containers/AppWrapper";
import SearchContainer from "./containers/SearchContainer";
import ResultContainer from "./containers/ResultContainer";

class App extends Component {
  render() {
      // console.log(constructGraph());
      // console.log(getPaths("Tuas Link", "Oasis"));
      /*<SearchContainer/>*/
    return (
        <AppWrapper>

            <ResultContainer/>
        </AppWrapper>
    );
  }
}

export default App;
