import React from 'react';
import axios from 'axios';
import { BrowserRouter as Link } from "react-router-dom";
import { Button } from 'semantic-ui-react'
import '../styles/Homepage.scss';
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

  async componentDidMount(){
    this.timer = setInterval(
       this.countDownTimer, 1000
    )

    try{
      const response = await axios.get(`https://germany-diplomatic-petition.appspot.com/petition`)
      const petitionNumber = response.data.petition_count
      console.log(petitionNumber)
      if(petitionNumber){
        this.setState({
          petitionNumber,
          isLoaded: true
        })
      }else{
        throw new Error(`抓取失敗`)
      }
    }catch(e){
      console.log(e.message)
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
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
    let petitionData = isLoaded? (<span>{petitionNumber}</span>):(<span>抓取中...</span>)
    return(
      <div className="App-header">
        <h1>自己的外交自己救</h1>
        <div className="reason">德國國會可通過要求德國政府與臺灣建立正式外交關係，請願內容將予以公開後於國會討論，惟其先決條件須在4週內（自2019年9月11日起計至10月10日止）獲得全球5萬人以上之連署。</div>
        <p className='count-down'>{countDownDays} /{countDownHours} /{countDownMinutes}</p>
        <Link className="petition-button" to="/step1" >開始連署</Link>
        <h3>目前連署人數：{petitionData}</h3>
      </div>
    )

  }
}

export default Homepage;
