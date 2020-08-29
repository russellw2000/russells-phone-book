import React, { Component } from "react";
import DataEntry from "./DataEntry";

class Data extends Component {
  state = { inputName: "", inputNumber: "", valid: false };

  changeListener = (e) => {
    this.setState({ [e.target.id]: e.target.value });

    //validate input box content
    if (this.state.inputName.length > 3 && this.state.inputNumber.length > 3) {
      this.setState({ valid: true });
    } else {
      this.setState({ valid: false });
    }
  };

  addEntry = () => {
    this.props.controls.addEntry(this.state.inputName, this.state.inputNumber);
    this.setState({ inputName: "", inputNumber: "", valid: false });
  };

  render() {
    return (
      <div>
        <div>
          <div className="bold">Add entry</div>
          <label>Name</label>
          <input
            value={this.state.inputName}
            id="inputName"
            onChange={this.changeListener}
          ></input>
          <label>Number</label>

          <input
            value={this.state.inputNumber}
            id="inputNumber"
            onChange={this.changeListener}
          ></input>
          <button disabled={!this.state.valid} onClick={this.addEntry}>
            Save
          </button>
        </div>

        <div>
          <div className="bold">Contacts</div>
          {this.props.payload.length > 0
            ? this.props.payload.map((entry) => (
                <DataEntry
                  key={entry.id}
                  entry={entry}
                  controls={this.props.controls}
                />
              ))
            : "No contacts found, try adding one or change the search query!"}
        </div>
      </div>
    );
  }
}

export default Data;
