import React, { Component } from "react";
import Data from "./Data";
import axios from "axios";
import { config } from "../utils";
import Controls from "./Controls";

class DataController extends Component {
  state = { payload: [], sortOrder: "DESC", filter: "" };

  componentDidMount() {
    //get data
    this.getData();
  }

  deleteEntry = async (id) => {
    try {
      axios
        .delete(config.server + "/book/" + id, {
          headers: { token: this.props.token },
        })
        .then((result) => {
          this.getData();
        });
    } catch (error) {}
  };

  editEntry = async (id, name, number) => {
    try {
      axios
        .put(
          config.server + "/book/" + id,
          { name, number },
          {
            headers: { token: this.props.token },
          }
        )
        .then((result) => {});
    } catch (error) {}
  };

  addEntry = async (name, number) => {
    try {
      axios
        .post(
          config.server + "/book",
          { name, number },
          {
            headers: { token: this.props.token },
          }
        )
        .then((result) => {
          this.getData();
        });
    } catch (error) {}
  };
  r;
  getData = async (sortOrder = this.state.sortOrder) => {
    //a bit hackey and inefficent
    this.setState({ sortOrder });

    try {
      axios
        .get(config.server + "/book/" + sortOrder, {
          headers: { token: this.props.token },
        })
        .then((result) => {
          this.setState({ payload: result.data });
        });
    } catch (error) {}
  };

  changeListener = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  render() {
    const controls = {
      getData: this.getData,
      deleteEntry: this.deleteEntry,
      editEntry: this.editEntry,
      addEntry: this.addEntry,
    };

    const payload = this.state.payload.filter((item) =>
      item.name.includes(this.state.filter)
    );

    return (
      <>
        <Controls
          changeListener={this.changeListener}
          filter={this.state.filter}
          getData={this.getData}
        />
        <Data payload={payload} controls={controls} />
      </>
    );
  }
}

export default DataController;
