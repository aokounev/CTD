import React, { Component } from 'react'

class Vehicle extends Component {


  constructor(props) {
    super(props)

    this.state = {
      vehicle: {}
    }
  }

  componentDidMount() {
    const id = this.props.match.params.vehicleId
    fetch(`https://www.swapi.tech/api/vehicles/${id}/`)
      .then(response => response.json())
      .then(json => {
        this.setState({ vehicle: json.result.properties })
      })
  }

  render() {
    const { vehicle } = this.state
    return (
      <>
      <h3>Name: {vehicle.name}</h3>
      <p>Model: {vehicle.model}</p>
      <p>Manufacturer: {vehicle.manufacturer}</p>
      <p>URL: {vehicle.url}</p>
      </>
    )
  }
}

export default Vehicle