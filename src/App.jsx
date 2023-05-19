import React, { Component } from 'react';
import Navber from "./components/Navber";
import News from './components/News';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';

 class App extends Component {
  pageSize = 9;
  apiKey = import.meta.env.VITE_REACT_APP_API_KEY;
  

  state = {
    progress: 0
  };

  setProgress = (progress) => {
    this.setState({ progress });
  };

  render() {
    const { setProgress } = this;


    return (
      <div>
        <BrowserRouter>
          <Navber />

          <LoadingBar
            height={3}
            color='#f11946'
            progress={this.state.progress}
          />

          <Routes>
            <Route exact path='/' element={<News apiKey={this.apiKey} setProgress={setProgress} key="home" pageSize={this.pageSize} country="in" category="general" />} />
            <Route exact path='/business' element={<News apiKey={this.apiKey} setProgress={setProgress} key="business" pageSize={this.pageSize} country="in" category="business" />} />
            <Route exact path='/entertainment' element={<News apiKey={this.apiKey} setProgress={setProgress} key="entertainment" pageSize={this.pageSize} country="in" category="entertainment" />} />
            <Route exact path='/general' element={<News apiKey={this.apiKey} setProgress={setProgress} key="general" pageSize={this.pageSize} country="in" category="general" />} />
            <Route exact path='/health' element={<News apiKey={this.apiKey} setProgress={setProgress} key="health" pageSize={this.pageSize} country="in" category="health" />} />
            <Route exact path='/science' element={<News apiKey={this.apiKey} setProgress={setProgress} key="science" pageSize={this.pageSize} country="in" category="science" />} />
            <Route exact path='/sports' element={<News apiKey={this.apiKey} setProgress={setProgress} key="sports" pageSize={this.pageSize} country="in" category="sports" />} />
            <Route exact path='/technology' element={<News apiKey={this.apiKey} setProgress={setProgress} key="technology" pageSize={this.pageSize} country="in" category="technology" />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
