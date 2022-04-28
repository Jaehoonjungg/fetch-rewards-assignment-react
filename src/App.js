import './App.css';
import React from 'react'

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      colVal: '',
      rowVal: '',
      X1: '',
      Y1: '',
      X2: '',
      Y2: '',
      X3: '',
      Y3: '',
      X4: '',
      Y4: '',
      calculation: [],
    }
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    this.calculatePoints = this.calculatePoints.bind(this);
  }
  
  async onChangeHandler (evt) {
   await this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  submitHandler(evt) {
    evt.preventDefault();
  }
  
  calculatePoints () {
    let { X1, X2, X3, X4, Y1, Y2, Y3, Y4, colVal, rowVal } = this.state
    let xCoordinate = [[X1, Y1], [X2, Y2], [X3, Y3], [X4, Y4]];
    const sortedCoordinate = xCoordinate.sort((a,b) => a[0] - b[0] || a[1] - b[1]);
    const bottomLeft = sortedCoordinate[0];
    const topLeft = sortedCoordinate[1];
    const bottomRight = sortedCoordinate[2];
    const topRight = sortedCoordinate[3];
    let solution = [];
    
    const xDifference = Math.abs((Number(topRight[0]) - Number(topLeft[0]))) / (Number(colVal) - 1);
    const yDifference = Math.abs((Number(topLeft[1]) - Number(bottomLeft[1]))) / (Number(rowVal) - 1);
    for(let y = Number(topLeft[1]); y >= Number(bottomLeft[1]); y -= Number(yDifference)) {
      let row = [];
      for(let x = Number(topLeft[0]); x <= Number(topRight[0]); x += Number(xDifference)) {
        let individualPoint = [];
        individualPoint.push(x.toFixed(1));
        individualPoint.push(y.toFixed(1));
        row.push(individualPoint);
      }
      solution.push(row);
    }
   
    let xTR = Number(topRight[0]);
    let yTR = Number(topRight[1]);
    let xBL = Number(bottomLeft[0]);
    let yBL = Number(bottomLeft[1]);
    let fixedXTR = xTR.toFixed(1);
    let fixedYTR = yTR.toFixed(1);
    let fixedXBL = xBL.toFixed(1);
    let fixedYBL = yBL.toFixed(1);
    
    if(Number(solution[0][solution[0].length-1][1]) == yTR && Number(solution[0][solution[0].length-1][0]) != xTR) {
      solution[0].push([fixedXTR, fixedYTR]);
      let yValue = Number(topRight[1]);
      for(let y = 1; y < solution.length; y++) {
        yValue -= yDifference;
        solution[y].push([fixedXTR, yValue.toFixed(1)]);
      }
    }
    
    if(Number(solution[solution.length-1][0][0]) == xBL && Number(solution[solution.length-1][0][1]) != yBL) {
      solution.push([[fixedXBL, fixedYBL]]);
      let xValue = Number(bottomLeft[0]);
      for(let x = 1; x < solution[0].length; x++) {
        xValue += xDifference;
        solution[solution.length-1].push([xValue.toFixed(1), fixedYBL])
      }
    }
    
    if(bottomRight[0] == solution[solution.length-1][solution[0].length-1][0] && bottomRight[1] == solution[solution.length-1][solution[0].length-1][1]) {
      console.log(true);
    }
    
   
    this.setState({
      calculation: solution
    })

  }
  
  render() {
    return (
       <div>
         <form onSubmit={this.submitHandler}>
          <h3>Dimensions</h3>
          <div>
            <label>Column:</label>
            <input type="number" name="colVal" onChange={this.onChangeHandler} value={this.state.colVal} required/>
          </div>
          <div>
            <label>Row:</label>
            <input type="number" name="rowVal" onChange={this.onChangeHandler} value={this.state.rowVal} required/>
          </div>
          <h3>Corner Points</h3>
           <div>
            <label>X1:</label>
            <input type="number" name="X1" onChange={this.onChangeHandler} value={this.state.X1} required/>
            <label>Y1:</label>
            <input type="number" name="Y1" onChange={this.onChangeHandler} value={this.state.Y1} required/>
          </div>
           <div>
            <label>X2:</label>
            <input type="number" name="X2" onChange={this.onChangeHandler} value={this.state.X2} required/>
            <label>Y2:</label>
            <input type="number" name="Y2" onChange={this.onChangeHandler} value={this.state.Y2} required/>
          </div>
           <div>
            <label>X3:</label>
            <input type="number" name="X3" onChange={this.onChangeHandler} value={this.state.X3} required/>
            <label>Y3:</label>
            <input type="number" name="Y3" onChange={this.onChangeHandler} value={this.state.Y3} required/>
          </div>
           <div>
            <label>X4:</label>
            <input type="number" name="X4" onChange={this.onChangeHandler} value={this.state.X4} required/>
            <label>Y4:</label>
            <input type="number" name="Y4" onChange={this.onChangeHandler} value={this.state.Y4} required/>
          </div>
          <div>
            <button type="submit" onClick={this.calculatePoints}>Submit</button>
          </div>
        </form>
        <div>
          <label>Calculated Points:</label>
          {this.state.calculation.map(row => {
            return (
              <div key={row}>
                [{row.map((point, idx) => {
                  return(
                    <span key={idx}>[{point[0]}, {point[1]}]</span>
                  )
                 })
                }]
              </div>
            )
          })}
        </div>
     </div>
    )
  }
}

export default App;
