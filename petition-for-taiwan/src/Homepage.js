import React from 'react';
import './styles/Homepage.scss';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { Button} from 'semantic-ui-react'
class Homepage extends React.Component {
  constructor(){
    super()
    this.state = ({
      countDownDays: 0,
      countDownHours: 0,
      countDownMinutes:0,
      petitionNumber: 0,
      isLoaded: false
    })
  }
  componentDidMount(){
    setInterval(this.countDownTimer, 1000)
    axios.get(`https://germany-diplomatic-petition.appspot.com/petition`)
      .then(res => {
        // const jsonFormat = res.json();
        const data = res.data
        const petitionNumber = data.petition_count
        this.setState({
          petitionNumber: petitionNumber,
          isLoaded: true
        });
      })
  }

  countDownTimer = () =>{
    const countDownDate = new Date("Oct 10, 2019 00:00:00 GMT+02:00").getTime()
    let now = new Date().getTime()
    let distance = countDownDate - now
    let days = Math.floor(distance / (1000 * 60 * 60 * 24))
    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60) )
    this.setState({
      countDownDays: days,
      countDownHours: hours,
      countDownMinutes:minutes,
    })
  }
  nextStep = () =>{
    let currentStep = this.step.currentStep
    currentStep++
    this.setState({
      currentStep: currentStep
    })
  }
  render() {
    const {countDownDays,countDownHours,countDownMinutes, petitionNumber, isLoaded} = this.state
    let petitionData;
    if(isLoaded === false){
      petitionData = (<span>抓取中...</span>)
    }else{
      petitionData = (<span>{petitionNumber}</span>)
    }
    return(
      <div className="App-header">
        <h1>自己的外交自己救</h1>
        <p><span>倒數</span>{countDownDays} 天 {countDownHours} 小時 {countDownMinutes} 分鐘 </p>
          <Link className="petition-button" to="/step1" >開始連署</Link>
        <h2>目前連署人數：{petitionData}</h2>
      </div>
    )

  }
}

export default Homepage;
