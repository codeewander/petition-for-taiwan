import React from 'react';
import './styles/Register.scss';
import { BrowserRouter as Switch, Link } from "react-router-dom";
import { Button, Form, Grid, Header, Segment,Checkbox, Select,Icon,Popup } from 'semantic-ui-react'
import axios from 'axios';
import {withRouter} from "react-router-dom";


class Register extends React.Component{
  constructor(){
    super()
    this.state ={
      email:'',
      passwort:'',
      passwort_wiederholen:'',
      datenschutz_ok: 1,
      nutzungsbed_ok: 1,
      vorname:'',
      nachname:'',
      str_nr:'',
      ort:'',
      land:'TW',
      plz:'',
      sectimestamp:'',
      isLoading: false,
      responseMessage:'',
      registerSuccess: false
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
  handleChange = event => {
    let name= event.target.name
    this.setState({
      [name]: event.target.value
    });
    console.log(this.state)
  }

  handleModal = ()=>{
    let loadingStatus = this.state.isLoading
    this.setState({
      isLoading:!loadingStatus
    })
  }

  handleSubmit = event => {
    event.preventDefault();
    this.setState({
      isLoading: true
    })
    const user = {
      email: this.state.email,
      passwort:this.state.passwort,
      passwort_wiederholen:this.state.passwort_wiederholen,
      datenschutz_ok:this.state.datenschutz_ok,
      nutzungsbed_ok:this.state.nutzungsbed_ok,
      vorname:this.state.vorname,
      nachname:this.state.nachname,
      str_nr:this.state.str_nr,
      ort:this.state.ort,
      land:this.state.land,
      plz:this.state.plz,
      sectimestamp:this.state.sectimestamp,
      _charset_:'UTF-8',
      JavaScriptEnable:true,
      btAbsendenMitRegistrieren:"Jetzt registrieren"
    };

    axios.post('https://germany-diplomatic-petition.appspot.com/register',user).then(res=> {
      console.log(res)
      if('email' in res.data){
        this.setState({
          errorMessage: res.data.email
        })
      }else if('passwort' in res.data ){
        this.setState({
          errorMessage: res.data.passwort
        })
      }else if('passwort_wiederholen' in res.data ){
        this.setState({
          errorMessage: res.data.passwort_wiederholen
        })
      }else if(res.data.message && res.data.message.includes('registered')){
        this.setState({
          errorMessage: '請確認信箱是否已經註冊過'
        })
      }else if(res.data.message && res.data.message.includes('successfully')){
        this.setState({
          registerSuccess: true
        })
        setTimeout(() => {
          this.props.history.push("/step2")
        }, 2000);
      }else{
        this.setState({
          errorMessage: res.data.message
        })
      }
    }
    ).catch(error=>console.log(error))
   }
  render(){
    let modalContent;
    const{errorMessage,isLoading,registerSuccess} = this.state;
    if(isLoading && registerSuccess){
      modalContent =(<React.Fragment>
        <Icon name="thumbs up outline" size="huge" color="yellow"/>
        <p className="model-text">註冊成功！</p>
      </React.Fragment>)
    }else if(isLoading && !errorMessage){
      modalContent =(<React.Fragment>
        <Icon loading name='spinner' color='yellow' size='huge'/>
          <p className="model-text">處理中...</p>
      </React.Fragment>)
    } else if(isLoading && errorMessage){
      modalContent =(<React.Fragment>
        <Icon name="times circle" size='huge' color='yellow'/>
        <p className="model-text">註冊失敗 :{errorMessage}</p>
      </React.Fragment>)
    }
    const countryOptions = [
      { key: 'TW', value: 'TW', text: '台灣' }
    ]
    return(
      <Grid id="registration-page" textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
      <Grid.Column style={{  border: '1px solid #000', borderRadius:'5px'}}>
        <Header as='h2' color='black' textAlign='center' style={{marginTop:'20px'}}>
          Step 1 : 立即註冊
        </Header>
        <Form size='large' className="form-container" onSubmit={this.handleSubmit}>
          <Segment stacked style={{margin: '1rem',height:'430px',width: '480px'}}>
          <Header as='h3'>帳戶資訊</Header>
          <Form.Field required>
            <label htmlFor="email">E-mail</label>
            <input type="text" name="email" placeholder="請填入未註冊過的E-mail" onChange={this.handleChange} required="required"
            />
          </Form.Field>
          <Form.Group widths='equal'>
          <Form.Field required>
            <label style={{display:'inline-block'}}htmlFor="passwort">密碼</label>
            <Popup
          trigger={<Icon name='question circle outline' color='red' size='small'/>}
          content='1. 密碼必須含有至少一個大寫和小寫字母以及一個數字或特殊符號 2. 長度至少超過8個字元'
          position='top left'
        />
            <input type="password" autoComplete="false" name="passwort" placeholder="請設定符合規格的密碼" onChange={this.handleChange} required/>
          </Form.Field>
          <Form.Field required>
            <label htmlFor="passwort_wiederholen">確認密碼</label>
            <input type="password" name="passwort_wiederholen"
            autoComplete="false" placeholder="請再次輸入密碼" onChange={this.handleChange}required/>
          </Form.Field>
          </Form.Group>
          <Form.Field required>
      <Checkbox name="datenschutz_ok" value="1" label='了解並閱讀隱私權政策' checked/>
    </Form.Field>
    <Form.Field required>
      <Checkbox name="nutzungsbed_ok" value="1" label='同意使用條款' checked/>
    </Form.Field>
          </Segment>
          <Segment stacked style={{minHeight:'430px', width:'480px'}}>
          <Header as='h3'>個人資訊<span style={{fontSize:"14px"}}>(請使用英文填寫)</span></Header>
          < Form.Group widths='equal'>
          <Form.Field required>
            <label htmlFor="vorname">名字</label>
            <input type="text" name="vorname" placeholder="" onChange={this.handleChange} required="required"/>
          </Form.Field>
          <Form.Field required>
            <label htmlFor="nachname">姓氏</label>
            <input type="text" name="nachname" placeholder="" onChange={this.handleChange} required/>
          </Form.Field>
          </Form.Group>
          <Form.Field required>
            <label style={{display:'inline-block'}} htmlFor="str_nr">地址</label>
            <input type="text" name="str_nr" id="str_nr"  placeholder="請輸入行政區域/街道名/門牌號碼" onChange={this.handleChange} required/>
          </Form.Field>
          <Form.Field required>
            <label htmlFor="ort">城市</label>
            <input type="text" name="ort" placeholder="" onChange={this.handleChange} required/>
          </Form.Field>
          <Form.Field required>
          <label htmlFor="land">國家</label>
          <Form.Select name="land" placeholder='國家' options={countryOptions} onChange={this.handleChange}/>
          </Form.Field>
          <Form.Field required>
            <label htmlFor="plz">郵遞區號</label>
            <input type="text" name="plz" placeholder="" onChange={this.handleChange} required/>
          </Form.Field>
          </Segment>
        <Button style={{width:'200px',margin:'0 200px',backgroundColor:'#000',color:'#fff549'}} className="signin-btn" fluid size='large'
        type="submit" >
             送出註冊
            </Button>
        </Form>
        <div className="modal" style={{visibility: this.state.isLoading? "visible":"hidden"}}>
          <div className="modal-content">
            <Icon name="close" className="modal-close" size="small" onClick={this.handleModal} circular inverted/>
            {modalContent}
          </div>
          </div>
      </Grid.Column>
    </Grid>
    )
  }
}

export default withRouter(Register)