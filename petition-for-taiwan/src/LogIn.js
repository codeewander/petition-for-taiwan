import React from 'react';
import './styles/LogIn.scss';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Button, Form, Grid, Header, Image, Message, Segment,Radio } from 'semantic-ui-react'

class LogIn extends React.Component{
  state = {}
  handleChange = (e, { value }) => this.setState({ value })
  render(){
    return(
      <Grid id="petition-page" textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 450 , border: '1px solid #000', borderRadius:'5px'}}>
      <Header as='h2' color='black' textAlign='center'>
        Step 3 : 立即連署
      </Header>
      <Form size='large'>
        <Segment stacked>
          <Form.Input fluid icon='user' name="email" iconPosition='left' placeholder='請輸入註冊信箱' value="" />
          <Form.Input
            fluid
            icon='lock'
            iconPosition='left'
            placeholder='請輸入密碼'
            type='password'
            ame="passwort"
          />
          <Form className="petition-name">
          <Form.Field>
          選擇連署方式：
        </Form.Field>
        <Form.Field>
          <Radio
            label='我想在請願名單列表中列出全名和姓氏'
            name='mitzeichnerliste_name'
            value='1'
            checked={this.state.value === '1'}
            onChange={this.handleChange}
          />
        </Form.Field>
        <Form.Field>
          <Radio
            label='我不想列出名字，列出註冊時自動創建的連署人編號即可'
            name='mitzeichnerliste_name'
            value='0'
            checked={this.state.value === '0'}
            onChange={this.handleChange}
          />
        </Form.Field>
        </Form>
          <Button className="petition-btn" fluid size='large'>
           送出連署
          </Button>
        </Segment>
      </Form>
    </Grid.Column>
  </Grid>
    )
  }
}

export default LogIn