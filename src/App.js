import React, { Component } from 'react';
import './App.css';
import CellRow from "./Components/CellRow";

class App extends Component {
  sideLength = 20; //number of cells on each side(with and height are the same.)

  state = {
    matrix : [], //the array which stores the state of each cell
    timerStarted: false, //is the timer started or not
    timerHandler: null, //the handler that can be used to stop the timer
    steps: 0 //number of steps already taken.
  }


  //initialize an empty matrix with the default side length when the component is mounted
  componentWillMount() {
		this.setState({
      matrix : this.makeMatrix(this.sideLength)
    });
	}


  //the function that runs on each evolution.
  step = () => {
    //separate the working and the reference matrix. This is done because the rules only hold up if you dont change the values on the same matrix that is used to calculate them.
    let oldMatrix = [...this.state.matrix];
    let newMatrix = this.makeMatrix(this.sideLength);

    for(let i = 0; i < this.sideLength; i++){
      for(let j = 0; j < this.sideLength; j++){
        newMatrix[i][j].alive = this.checkRules(oldMatrix, oldMatrix[i][j]);
      }
    }

    this.setState({
      matrix: newMatrix,
      steps: this.state.steps + 1
    });
  }

  checkRules = (matrix, cell) => {
    let neighborCount = 0;
    //loop through from matrix[i-1][j-1] all the way to matrix[i+1][j+1] and count the neighbors
    for(let i = -1; i < 2; i++){
      for(let j = -1; j < 2; j++){
        //hasOwnProperty has to be checked because the [cell.i + i] and [cell.j + j] may not be indexes(this means that the cell being checked is touching a border.)
        //i and j can not both be 0 because that means the element being considered is the same as the 'cell' variable, i.e. the element whose neighbors are being counted.
        if(
            matrix.hasOwnProperty(cell.i + i) && 
            matrix[cell.i + i].hasOwnProperty(cell.j + j) && 
            !(i === 0 && j === 0) && 
            matrix[cell.i + i][cell.j + j].alive
          ){
          neighborCount++;
        }
      }
    }
    
    //Dead cells with 3 neighbors come to life
    if(!cell.alive && neighborCount === 3) return true;

    //alive cells without exactly 2 or 3 neighbors die
    if(cell.alive && (neighborCount === 2 || neighborCount === 3)){
      return true;
    } else { 
      return false; 
    }
  }

  makeMatrix = (sideLength) => {
    //create a matrix of dead(same as false) cells with side length 'sideLength'
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

  //change cell state when user clicks on it.
  handleClick = (cell) => {
    let matrix = [...this.state.matrix];
    matrix[cell.i][cell.j].alive = !matrix[cell.i][cell.j].alive;
    this.setState({
      matrix: matrix
    });
  }


  //timer for automatic evolutions
  startTimer = () => {
    if(this.state.timerStarted){ 
      alert('The timer is already running.') ;
    } else {
      let timerHandler = setInterval(this.step, 300);
      this.setState({
        timerStarted: true,
        timerHandler: timerHandler //pass the handler to state so it can be used in the stopTimer function
      });
    }
  }

  stopTimer = () => {
    if(!this.state.timerStarted) { 
      alert('You have not started the timer yet.'); 
    } else {
      clearInterval(this.state.timerHandler);
      this.setState({
        timerStarted: false,
        timerHandler: null
      });
    }
  } 

  render() {
    let divs = this.state.matrix.map((row) => {
        return(
          //the handleClick function has to be passed down to each cell so they can call it.
          <CellRow handleClick={this.handleClick} row={row}></CellRow>
        );
    });

    return (
      <React.Fragment>
        <div className="App">
          {divs}
        </div>
        
        <button onClick={this.step}>Make 1 Step</button> <br />
        <button onClick={this.startTimer}>Start automatic evolution</button> <br />
        <button onClick={this.stopTimer}>Stop automatic evolution</button> <br />
        <span>{this.state.steps} Steps</span>
      </React.Fragment>
    );
  }
}

export default App;
