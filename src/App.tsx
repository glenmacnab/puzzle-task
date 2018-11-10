import * as React from 'react';
import './App.css';
import Puzzle from './puzzle/Puzzle';


class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <Puzzle/>
      </div>
    );
  }
}

export default App;
