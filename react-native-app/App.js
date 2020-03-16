import React from 'react';
import { fetchLocationId, fetchWeather } from './src/utils/api';
import Home from './src/components/Home';

export default class App extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
      error: false,
      loading: false,
      location: '',
      temperature: 0,
      weather: ''
    }
  }

  // lifecycle method: this method will fire after the component is mounted, used for asynchrouns requests
  componentDidMount() {
    this.handleUpdateLocation('Monastir');
  }

  handleUpdateLocation = async city => {

    if (!city) return;

    this.setState({ loading: true }, async () => {
      try {
        const loactionId = await fetchLocationId(city);
        const { location, weather, temperature } = await fetchWeather(loactionId);
        this.setState({
          loading: false,
          error: false,
          location,
          weather,
          temperature
        });
      } catch (error) {
        this.setState({
          loading: false,
          error: true
        });
      }
    });

  }
  render() {

    const { location, error, loading, weather, temperature } = this.state;
    return (
      <Home location={location} error={error} loading={loading} weather={weather} temperature={temperature} handleSearch={this.handleUpdateLocation} />
    )

  };

};


