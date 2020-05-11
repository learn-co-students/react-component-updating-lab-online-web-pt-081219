import React, { Component } from 'react';

import Timer from './Timer'
import Controls from './Controls'

//no need to modify anything in this component
class App extends Component {

  state = {
    updateInterval: 1,
    timerIDs: []
  }

  componentDidMount() {
    console.log("App Component Did Mount")
    this.handleAddTimer()
  }

  render() {
    console.log("App Component Render")
    console.log(this.state.timerIDs);
    return (
      <div className="App">
        <header>
          <h1>MultiTimer</h1>
          <Controls updateIntervalSetting={this.updateIntervalSetting} updateInterval={this.state.updateInterval} handleAddTimer={this.handleAddTimer}/>
        </header>
        <div className="TimerGrid">
          {this.renderTimers()}
        </div>

      </div>
    );
  }

  // returns array of components written in JSX, mapped from this.state.timerIDs
  renderTimers = () => this.state.timerIDs.map(({id, updateInterval}) => <Timer key={id} id={id} removeTimer={this.removeTimer} updateInterval={updateInterval}/>)


  // adds a random number for timer ID
  handleAddTimer = () => {
    console.log("handleAddTimer (calls setState)")
    this.setState(prevState => ({
      timerIDs: [
        ...prevState.timerIDs,
        {
          updateInterval: prevState.updateInterval,
          id: Date.now()
        }
      ]
    }))
  }

  // removeTimer updates state, removing any timer that matches the provided author
  removeTimer = id => {
    console.log("removeTimer (calls setState)")
    this.setState(prevState => ({
      timerIDs: prevState.timerIDs.filter(timer => timer.id !== id)
    }))
  }

  updateIntervalSetting = increment => {
    console.log("updateIntervalSetting (calls setState)")
    this.setState(prevState => {
      if (prevState.updateInterval + increment <= 1) return { updateInterval: 1 }
      return {
        updateInterval: prevState.updateInterval + increment
      }
    })
  }

}

export default App;
