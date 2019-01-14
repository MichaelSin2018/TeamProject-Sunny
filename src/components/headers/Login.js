import React, { Component } from "react";
import '../../App.css'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <div>
        <a href='http://13.125.111.99/auth/kakao' id='kakao-login-btn'>카카오 로그인</a>
      </div>

    );
  }
}

export default Login
