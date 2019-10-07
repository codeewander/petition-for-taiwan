import React from 'react';
import './styles/ConfirmMail.scss';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { Button, Form, Grid, Header, Image, Segment } from 'semantic-ui-react'
import mail from './images/mail.svg'
class ConfirmMail extends React.Component{
  state = {}
  handleChange = (e, { value }) => this.setState({ value })
  render(){
    return(
      <Grid id="petition-page" textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 450 , border: '1px solid #000', borderRadius:'5px'}}>
      <Header as='h2' color='black' textAlign='center'>
        Step 2 : 收信確認
      </Header>
      <Form size='large'>
        <Segment stacked>
        <Image src={mail} size='small' style={{margin:'0 auto'}}/>
        <p style={{fontSize:'20px',marginTop:'1em'}}>請前往註冊信箱收取<span style={{color: 'red'}}>官方確認信(德文)</span>，並點擊信件內中的超連結來啟動帳號</p>
        <Link to="/step3" ><Button className="petition-btn" fluid size='large'>
         確認完畢
          </Button></Link>
        </Segment>
      </Form>
    </Grid.Column>
  </Grid>
    )
  }
}

export default ConfirmMail