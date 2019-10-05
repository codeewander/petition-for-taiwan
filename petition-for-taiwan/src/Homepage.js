import React from 'react';
import * as moment from 'moment'
import './styles/Homepage.scss';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import SignIn from './SignIn.js';
import LogIn from './LogIn.js';

class Homepage extends React.Component {
  constructor(){
    super()
    this.state = ({
      countDownDays: 0,
      countDownHours: 0,
      countDownMinutes:0,
      currentStep: 0,
    })
  }
  componentDidMount(){
    setInterval(this.countDownTimer, 1000)
  }

  countDownTimer = ()=>{
    const countDownDate = new Date("Oct 10, 2019 00:00:00 GMT+02:00").getTime()
    let now = new Date().getTime()
    let distance = countDownDate - now
    let days = Math.floor(distance / (1000 * 60 * 60 * 24))
    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60) )
    this.setState({
      countDownDays: days,
      countDownHours: hours,
      countDownMinutes:minutes
    })
  }

  render() {
    const {countDownDays,countDownHours,countDownMinutes} = this.state
    const home = (
      <div className="App-header">
        <h1>自己的外交自己救</h1>
        <p><span>倒數</span>{countDownDays} 天 {countDownHours} 小時 {countDownMinutes} 分鐘 </p>
        <Link to="/step1">開始連署</Link>
      </div>
    )
    return(
    <Router>
    <div className="App">
      {/* {home} */}
      <SignIn />
      {/* <LogIn/> */}
    </div>
    <Route path="/step1" component={SignIn} />
    <Route path="/step3" component={LogIn} />
    </Router>
    )}
}

export default Homepage;
