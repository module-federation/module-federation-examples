import React, { Component } from "react";

export default class DogName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "Images from https://placedog.net",
    };
  }

  render() {
    return (
      <>
        <h1>Look at these {this.props.name}</h1>
        <p>{this.state.message}</p>
      </>
    );
  }
}
