import React from 'react';
import { encode } from "base-64";
import Header from '../components/header';
import './login.css';
import abgg from '../imgs/abgg.png';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.submitFetch = this.submitFetch.bind(this);
  }

  async submitFetch() {
    const { email, password } = this.state;
    const username = 'codenation'
    const password = '123'
    const encoded = encode(username + ":" + password);
    const formData = new FormData();
    formData.append('grant_type', 'password');
    formData.append('username', email);
    formData.append('password', password);
      const requestOptions = {
        method: 'POST',
        headers: new Header({
          'Content-Type': 'multipart/form-data',
          'Authorization': "Basic Y29kZW5hdGlvbjoxMjM="
        }),
        body: formData,
      }
      // https://cors-anywhere.herokuapp.com/https://codenation-central-de-erros-ca.herokuapp.com/
      const request = await fetch('https://cors-anywhere.herokuapp.com/https://codenation-central-de-erros-ca.herokuapp.com/', requestOptions);
      const response = await request.json();
      console.log(response);
      return response;
    
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  render(){
    const { email, password } = this.state;
    return(
      <div className="bodyF">
        <Header />
        <img className="logo" src={abgg} />
        <div className="login">
        <h2>Seja Bem Vindo.</h2>
          <p className="descrip">E-mail</p>
          <input
              type="email"
              name="email"
              value={ email }
              autocomplete="off"
              className="inputLogin"
              autocorrect="off"
              onChange={ this.handleChange }
            />
            <p className="descrip">Senha</p>
            <input
              type="password"
              name="password"
              value={ password }
              className="inputLogin"
              onChange={ this.handleChange }
            />
            <button
              type="button"
              className="button"
              onClick={ this.submitFetch }
            >
              Entrar
            </button>
            <a href="/cadastro">Não tem uma conta? Experimente grátis!</a>
        </div>
      </div>
    )
  }
}

export default Login;