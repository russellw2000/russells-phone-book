import React, { Component } from "react";
import Header from "./components/Header";
import DataController from "./components/DataController";
import Login from "./components/Login";
import axios from "axios";
import { config } from "./utils";

class App extends Component {
  state = { loggedIn: false, token: "" };

  login = (username, password) => {
    //login logic

    try {
      axios
        .post(config.server + "/auth", { username, password })
        .then((result) => {
          if (result.data.status === 1) {
            this.setState({ loggedIn: true, token: result.data.token });
          }
        });
    } catch (error) {}
  };

  render() {
    return (
      <>
        <div className="mainContainer">
          <Header />
          {!this.state.loggedIn ? (
            <Login login={this.login} />
          ) : (
            <div>
              <DataController token={this.state.token} />
            </div>
          )}
        </div>
      </>
    );
  }
}

export default App;
