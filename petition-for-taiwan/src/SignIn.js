import React from 'react';
import './styles/SignIn.scss';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Button, Form, Grid, Header, Image, Message, Segment,Radio,Checkbox } from 'semantic-ui-react'


class SignIn extends React.Component{
  render(){
    return(
      <Grid id="registration-page" textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 , border: '1px solid #000', borderRadius:'5px'}}>
        <Header as='h2' color='black' textAlign='center'>
          Step 1 : 立即註冊
        </Header>
        <Form size='large'>
          <Segment stacked>
          <Header as='h3'>帳戶資訊</Header>
          <Form.Field required>
            <label for="email">E-mail</label>
            <input type="text" name="email" id="email" value="" placeholder="請填入未註冊的E-mail" />
          </Form.Field>
          <Form.Group widths='equal'>
          <Form.Field required>
            <label for="passwort">密碼</label>
            <input type="password" name="passwort" placeholder="請設定符合規格的密碼" value="" />
          </Form.Field>
          <Form.Field required>
            <label for="passwort_wiederholen">確認密碼</label>
            <input type="password" name="passwort_wiederholen" placeholder="請再次輸入密碼" value="" />
          </Form.Field>
          </Form.Group>
          <Form.Field required>
      <Checkbox name="datenschutz_ok" value="1" label='了解並閱讀隱私權政策' />
    </Form.Field>
    <Form.Field required>
      <Checkbox name="nutzungsbed_ok" value="1" label='同意使用條款' />
    </Form.Field>
          </Segment>
          <Segment stacked>
          <Header as='h3'>個人資訊</Header>
          <Form.Input fluid icon='user' name="email" iconPosition='left' placeholder='請輸入註冊信箱' value="" />
          </Segment>
        </Form>
        <Button className="petition-btn" fluid size='large'>
             送出連署
            </Button>
      </Grid.Column>
    </Grid>
    )
  }
}

export default SignIn