import React from 'react';
import SearchInput from './components/SearchInput';
import getImageForWeather from './utils/getImageForWeather';
import { fetchLocationId, fetchWeather } from './utils/api';
import { StyleSheet, StatusBar, ActivityIndicator, View, ImageBackground, Text, Platform, KeyboardAvoidingView } from 'react-native';

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
    })


  }

  render() {

    const { location, error, loading, weather, temperature } = this.state;

    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <StatusBar barStyle="light-content" />
        <ImageBackground source={getImageForWeather(weather)}
          style={styles.imageContainer}
          imageStyle={styles.image}>
          <View style={styles.containerDetails}>
            <ActivityIndicator animating={loading} color="white" size="large" />
            {!loading && (
              <View>
                {error && (
                  <Text style={[styles.largeText, styles.textStyle]}>Could not load weather, please try a different city
                  </Text>
                )}
                {!error && (
                  <View>
                    <Text style={[styles.largeText, styles.textStyle]}>{location}</Text>
                    <Text style={[styles.smallText, styles.textStyle]}>{weather}</Text>
                    <Text style={[styles.largeText, styles.textStyle]}>{`${Math.round(temperature)}°`}</Text>
                  </View>
                )}
                <SearchInput placeholder="Search for city" onSubmit={this.handleUpdateLocation} />
              </View>
            )}
          </View>
        </ImageBackground>
      </KeyboardAvoidingView >

    )

  }

}
const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#34495E',
  },

  containerDetails: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.2)",
    paddingHorizontal: 20,
  },

  textStyle: {
    color: 'white',
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'AvenirNext-Regular' : 'Roboto'
  },
  largeText: {
    fontSize: 44

  },
  smallText: {
    fontSize: 18
  },

  imageContainer: {
    flex: 1,

  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: "cover"
  }

});
