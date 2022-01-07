import React, { Component } from "react";

class Vehicle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vehicle: {},
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.reload();
  }

  loadedId = 0;

  loading = false;

  reload() {
    const id = this.props.match.params.vehicleId;
    if (this.loadedId !== id) {
      this.loadedId = id;
      this.loading = true;
      this.forceUpdate();
      fetch(`https://www.swapi.tech/api/vehicles/${id}/`)
        .then((response) => response.json())
        .then((json) => {
          this.loading = false;
          this.setState({ vehicle: json.result.properties });
        });
    }
  }

  render() {
    const { vehicle } = this.state;
    if (this.loading) {
      return <>Loading...</>;
    }

    return (
      <>
        <h3>Name: {vehicle.name}</h3>
        <p>Model: {vehicle.model}</p>
        <p>Manufacturer: {vehicle.manufacturer}</p>
        <p>URL: {vehicle.url}</p>
      </>
    );
  }
}

export default Vehicle;
