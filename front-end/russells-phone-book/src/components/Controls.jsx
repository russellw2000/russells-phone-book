import React, { Component } from "react";

class Controls extends Component {
  render() {
    return (
      <div>
        <label>Search</label>
        <input
          onChange={this.props.changeListener}
          id="filter"
          value={this.props.filter}
        ></input>
        <button
          onClick={() => {
            this.props.getData("ASC");
          }}
        >
          Sort Accending
        </button>
        <button
          onClick={() => {
            this.props.getData("DESC");
          }}
        >
          Sort Decending
        </button>
      </div>
    );
  }
}

export default Controls;
