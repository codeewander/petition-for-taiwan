import React from 'react';
import axios from 'axios';
import { Button, Form, Grid, Header, Segment, Icon } from 'semantic-ui-react'
import './styles/SignIn.scss';

class SignIn extends React.Component{
  constructor(){
    super()
    this.state = {
      email: '',
      passwort:'',
      mitzeichnerliste_name: 1,
      sectimestamp: null,
      _charset_:'UTF-8',
      isLoading: false,
      result: null,
      petitionNumber: 0,
    }
  }

  componentDidMount(){
    this.getTimeStamp()
  }

  getTimeStamp =()=>{
    let now = new Date().getTime()
    this.setState({
      sectimestamp: now
    })
  }
  getPetitionNumber= ()=>{
    axios.get(`https://germany-diplomatic-petition.appspot.com/petition`)
      .then(res => {
        const data = res.data
        const petitionNumber = data.petition_count
        this.setState({
          petitionNumber: petitionNumber,
        });
      })
  }
  handleModal = ()=>{
    let loadingStatus = this.state.isLoading
    this.setState({
      isLoading:!loadingStatus
    })
  }
  handleChange = event => {
    let name= event.target.name
    let value = event.target.value
    this.setState({
      [name]: value
    });
  }

  handleRadio = event =>{
    let name= event.target.name
    let value = parseInt(event.target.value)
    this.setState({
      mitzeichnerliste_name: value
    });
  }

  handleSubmit = event =>{
    event.preventDefault();
    const user ={
      email: this.state.email,
      passwort:this.state.passwort,
      mitzeichnerliste_name: this.state.mitzeichnerliste_name,
      sectimestamp:this.state.sectimestamp,
      _charset_:'UTF-8',
    }
    this.setState({
      isLoading: true
    })
    axios.post('https://germany-diplomatic-petition.appspot.com/signin',user).then(res=>{
      console.log(res)
     if(res.data.message.includes("success")){
      this.getPetitionNumber();
      this.setState({
        result: "success"
      })
      console.log('success')
     }else if(res.data.message.includes("failed")){
       this.setState({
        result: "fail"
       })
     }else{
       console.log(res.data.message)
     }
  })
}
  render(){
    let loadingContent;
    const {isLoading,result} = this.state
    if(isLoading && !result){
      loadingContent =(<React.Fragment>
        <Icon loading name='spinner' color='#fff549' size='huge'/>
          <p>處理中...</p>
      </React.Fragment>)
    }else if(isLoading && result === "fail"){
      loadingContent =(
        <React.Fragment>
        <Icon name="times circle" size='huge' color='#fff549'/>
        <p className="model-text">連署失敗，請重新確認註冊信箱及密碼</p>
      </React.Fragment>
      )
    }else if(isLoading && result === "success"){
      loadingContent =(
        <React.Fragment>
          <Icon name="thumbs up outline" size="huge" color="#fff549"/>
        <p className="model-text">連署成功！謝謝你的一份心意</p>
        <p>目前連署人數為：{this.state.petitionNumber}</p>
      </React.Fragment>
      )
    }
    return(
      <Grid id="petition-page" textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
    <Grid.Column style={{ width:'480px', borderRadius:'5px'}}>
      <Header as='h2' color='black' textAlign='center' style={{marginTop:'20px',paddingTop: '30px',color :'#fff' }}>
        Step 3 : 立即連署
      </Header>
      <Form size='large' onSubmit={this.handleSubmit}>
        <Segment stacked style={{backgroundColor: 'rgba(255,255,255,0.2)'}}>
          <Form.Input fluid icon='user' name="email" iconPosition='left' placeholder='請輸入註冊信箱' onChange={this.handleChange} required />
          <Form.Input
            fluid
            icon='lock'
            iconPosition='left'
            placeholder='請輸入密碼'
            type='password'
            autoComplete="false"
            name="passwort"
            required
            onChange={this.handleChange}
          />
          <div className="petition-way">
          <Header as='h4' color='black' textAlign='left'>選擇連署方式：</Header>

          <input type="radio" name="mitzeichnerliste_name" value="1" onChange={this.handleRadio} checked></input><span className="radio-text">我想在請願名單列表中列出全名和姓氏</span>
          <br></br>
          <input type="radio" name="mitzeichnerliste_name" value="0" onChange={this.handleRadio}></input><span className="radio-text">我不想列出名字，列出註冊時自動創建的連署人編號即可</span>
        </div>
          <Button className="petition-btn" fluid size='large' type="submit">
           送出連署
          </Button>
          <div className="modal" style={{visibility: this.state.isLoading? "visible":"hidden"}}>
          <div className="modal-content">
            <Icon name="close" className="modal-close" size="small" onClick={this.handleModal} circular inverted/>
            {loadingContent}
          </div>
          </div>
        </Segment>
      </Form>
    </Grid.Column>
  </Grid>
    )
  }
}

export default SignIn