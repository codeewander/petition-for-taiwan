import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Homepage from './Homepage'
import SignIn from './SignIn'
import ConfirmMail from './ConfirmMail'
import LogIn from './LogIn'

class App extends React.Component{
  render(){
    return(
      <Router>
      <Switch>
      <Route exact path="/" component={Homepage} />
      <Route path="/step1" component={SignIn} />
      <Route path="/step2" component={ConfirmMail} />
      <Route path="/step3" component={LogIn} />
      </Switch>
      </Router>
    )
  }
}

export default App