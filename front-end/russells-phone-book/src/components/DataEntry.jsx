import React, { Component } from "react";

class DataEntry extends Component {
  state = {
    inputName: this.props.entry.name,
    inputNumber: this.props.entry.number,
    hasChanged: false,
    disabled: false,
  };

  changeListener = (e) => {
    this.setState({ [e.target.id]: e.target.value, hasChanged: true });

    //validate input box content
    if (this.state.inputName.length > 3 && this.state.inputNumber.length > 3) {
      this.setState({ valid: true });
    } else {
      this.setState({ valid: false });
    }
  };

  render() {
    const { deleteEntry, getData, editEntry } = this.props.controls;
    const { id } = this.props.entry;

    return (
      <div className="entry">
        <input
          id="inputName"
          onChange={this.changeListener}
          type="text"
          value={this.state.inputName}
        ></input>
        <input
          id="inputNumber"
          onChange={this.changeListener}
          type="text"
          value={this.state.inputNumber}
        ></input>
        {this.state.hasChanged && (
          <button
            disabled={!this.state.valid}
            onClick={() => {
              editEntry(id, this.state.inputName, this.state.inputNumber);
              this.setState({ hasChanged: false });
            }}
          >
            Save update
          </button>
        )}
        <button onClick={() => deleteEntry(id)}>Delete</button>
      </div>
    );
  }
}

export default DataEntry;
