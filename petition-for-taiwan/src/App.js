import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Homepage from './Homepage'
import SignIn from './SignIn'
import ConfirmMail from './ConfirmMail'
import Register from './Register'

class App extends React.Component{
  render(){
    return(
      <Router>
      <Switch>
      <Route exact path="/" component={Homepage} />
      <Route path="/step1" component={Register} />
      <Route path="/step2" component={ConfirmMail} />
      <Route path="/step3" component={SignIn} />
      </Switch>
      </Router>
    )
  }
}

export default App