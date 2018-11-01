import React, { Component } from 'react';
import './App.css';
import CellRow from "./Components/CellRow";

class App extends Component {
  sideLength = 20;

  state = {
    matrix : []
  }

  componentWillMount() {
		this.setState({
      matrix : this.makeMatrix(this.sideLength)
    });
	}

  step = (newMatrix) => {

  }

  makeMatrix = (sideLength) => {
    let matrix = [];
    for(let i = 0; i < sideLength; i++){
      matrix[i] = [];
      for(let j = 0; j < sideLength; j++){
        matrix[i][j] = {
          alive : false,
          i: i,
          j: j
        };
      }
    }

    return matrix;
  }

  handleClick = (cell) => {
    console.log(cell);
    let matrix = this.state.matrix;
    matrix[cell.i][cell.j].alive = !matrix[cell.i][cell.j].alive;
    this.setState({
      matrix: matrix
    });
  }

  render() {
    let divs = this.state.matrix.map((row) => {
        return(
          <CellRow handleClick={this.handleClick} row={row}></CellRow>
        );
    });

    return (
      <div className="App">
        {divs}
      </div>
    );
  }
}

export default App;
