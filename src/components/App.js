import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import * as actions from '../actions';
import { connect } from 'react-redux';

import Header from './MainComponent/Header';
import Step1 from './Steps/Step1';
import Step2 from './Steps/Step2';
import ConfirmPage from './Steps/Confirm';

class App extends Component {

  async componentDidMount() {
 
   
    this.setState({loading: false})
  }

  state = {
    loading: true
  }

  
  path = [];

  render() {
    if (this.state.loading) return null;

    return (
      <div className="mainComponent">
        <BrowserRouter>
           <Header path="/" key={7} props={this.props} />
        
        <div className="stepComponent">
          <Switch>
            <Route exact path='/' component={Step1} />
            <Route exact path='/finish' component={ConfirmPage} />
            <Route exact path='/details' component={Step2} />
           
          </Switch>
      </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);