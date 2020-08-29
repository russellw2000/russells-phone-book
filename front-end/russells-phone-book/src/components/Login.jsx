import React, { Component } from "react";

class Login extends Component {
  state = { username: "", password: "" };

  changeListener = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  render() {
    return (
      <>
        <div className="bold">Login!</div>
        <label>Username: </label>
        <input
          onChange={this.changeListener}
          id="username"
          value={this.state.username}
        ></input>
        <label>Password: </label>
        <input
          onChange={this.changeListener}
          id="password"
          value={this.state.password}
        ></input>
        <button
          onClick={() =>
            this.props.login(this.state.username, this.state.password)
          }
        >
          Login
        </button>
      </>
    );
  }
}

export default Login;
