import React from 'react';
import './styles/SignIn.scss';
import { BrowserRouter as Switch, Link } from "react-router-dom";
import { Button, Form, Grid, Header, Segment,Checkbox, Select,Icon,Popup } from 'semantic-ui-react'
import axios from 'axios';


class SignIn extends React.Component{
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
      _charset_:'UTF-8',
      JavaScriptEnable: true,
      btAbsendenMitRegistrieren:'Jetzt registrieren'
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

  handleSubmit = event => {
    event.preventDefault();
    const user = {
      email: this.state.email
    };
    const corsHeader = {
      origin: ["*"],
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": "true",
        'Content-Type' :'application/x-www-form-urlencoded'
    },
      withCredentials: false,
    };
    axios({
      method: 'post',
      url: 'https://germany-diplomatic-petition.appspot.com/register',
      data: {
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
      _charset_:'UTF-8',
      JavaScriptEnable: true,
      btAbsendenMitRegistrieren:'Jetzt registrieren'
      },
      config: corsHeader
    }).then (res=>{
      console.log(res)
    })
  }
  render(){
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
          <Segment stacked style={{margin: '1rem'}}>
          <Header as='h3'>帳戶資訊</Header>
          <Form.Field required>
            <label htmlFor="email">E-mail</label>
            <input type="text" name="email" placeholder="請填入未註冊過的E-mail" onChange={this.handleChange} />
          </Form.Field>
          <Form.Group widths='equal'>
          <Form.Field required>
            <label style={{display:'inline-block'}}htmlFor="passwort">密碼</label>
            <Popup
          trigger={<Icon name='question circle outline' color='red' size='small'/>}
          content='1. 密碼必須含有至少一個大寫和小寫字母以及一個數字或特殊符號 2. 長度至少超過8個字元'
          position='top left'
        />
            <input type="password" autoComplete="false" name="passwort" placeholder="請設定符合規格的密碼" onChange={this.handleChange}/>
          </Form.Field>
          <Form.Field required>
            <label htmlFor="passwort_wiederholen">確認密碼</label>
            <input type="password" name="passwort_wiederholen"
            autoComplete="false" placeholder="請再次輸入密碼" onChange={this.handleChange}/>
          </Form.Field>
          </Form.Group>
          <Form.Field required>
      <Checkbox name="datenschutz_ok" value="1" label='了解並閱讀隱私權政策' checked/>
    </Form.Field>
    <Form.Field required>
      <Checkbox name="nutzungsbed_ok" value="1" label='同意使用條款' checked/>
    </Form.Field>
          </Segment>
          <Segment stacked>
          <Header as='h3'>個人資訊<span style={{fontSize:"14px"}}>(請使用英文填寫)</span></Header>
          < Form.Group widths='equal'>
          <Form.Field required>
            <label htmlFor="vorname">名字</label>
            <input type="text" name="vorname" placeholder="" onChange={this.handleChange}/>
          </Form.Field>
          <Form.Field required>
            <label htmlFor="nachname">姓氏</label>
            <input type="text" name="nachname" placeholder="" onChange={this.handleChange}/>
          </Form.Field>
          </Form.Group>
          <Form.Field required>
            <label style={{display:'inline-block'}} htmlFor="str_nr">地址</label>
            <input type="text" name="str_nr" id="str_nr"  placeholder="請輸入行政區域/街道名/門牌號碼" onChange={this.handleChange}/>
          </Form.Field>
          <Form.Field required>
            <label htmlFor="ort">城市</label>
            <input type="text" name="ort" placeholder="" onChange={this.handleChange}/>
          </Form.Field>
          <Form.Field required>
          <label htmlFor="land">國家</label>
          <Form.Select name="land" placeholder='國家' options={countryOptions} onChange={this.handleChange}/>
          </Form.Field>
          <Form.Field required>
            <label htmlFor="plz">郵遞區號</label>
            <input type="text" name="plz" placeholder="" onChange={this.handleChange}/>
          </Form.Field>
          </Segment>
          <input type="hidden" name="sectimestamp" value=""/>
          <input type="hidden" name="_charset_" value="UTF-8" />
        <input type="hidden" name="JavaScriptEnable" id="JavaScriptEnable" value="true"/>
        {/* <Link to="/step2" > */}
        <Button style={{width:'200px',margin:'0 auto',backgroundColor:'#000',color:'#fff549'}}className="signin-btn" fluid size='large'
        type="submit" >
             送出註冊
            </Button>
        </Form>
            {/* </Link> */}
      </Grid.Column>
    </Grid>
    )
  }
}

export default SignIn