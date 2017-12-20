import React, { Component } from 'react'
import './App.css'

import { SideBar } from './SideBar'
import { TvManager } from './TvManager'

class App extends Component {
  render() {
    return (
      <div className="app" {...this.props}>
        <SideBar/>
        <TvManager/>        
      </div>
    );
  }
}

export default App
