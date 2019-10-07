import React from 'react';
import './styles/SignIn.scss';
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react'
import axios from 'axios';

class SignIn extends React.Component{
  constructor(){
    super()
    this.state = {
      email: '',
      passwort:'',
      mitzeichnerliste_name: 1,
    }
  }

  handleChange = event => {
    let name= event.target.name
    this.setState({
      [name]: event.target.value
    });
    console.log(this.state)
  }
  handleSubmit = event =>{
    event.preventDefault();
    const user ={
      email: this.state.email,
      passwort:this.state.passwort,
      mitzeichnerliste_name: this.state.mitzeichnerliste_name
    }
    let params = new URLSearchParams();
    params.append("email", user.email);
    params.append("passwort", user.passwort);
    params.append("mitzeichnerliste_name", user.mitzeichnerliste_name);

    axios.post('https://germany-diplomatic-petition.appspot.com/signin',params).then(res=>console.log(res))
  }
  render(){
    return(
      <Grid id="petition-page" textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 450 , border: '1px solid #000', borderRadius:'5px'}}>
      <Header as='h2' color='black' textAlign='center'>
        Step 3 : 立即連署
      </Header>
      <Form size='large' onSubmit={this.handleSubmit}>
        <Segment stacked>
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

          <input type="radio" name="mitzeichnerliste_name" value="1" onChange={this.handleChange} ></input><span className="radio-text">我想在請願名單列表中列出全名和姓氏</span>
          <br></br>
          <input type="radio" name="mitzeichnerliste_name" value="0" onChange={this.handleChange}></input><span className="radio-text">我不想列出名字，列出註冊時自動創建的連署人編號即可</span>
        </div>
          <Button className="petition-btn" fluid size='large' type="submit">
           送出連署
          </Button>
        </Segment>
      </Form>
    </Grid.Column>
  </Grid>
    )
  }
}

export default SignIn