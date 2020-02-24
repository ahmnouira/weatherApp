/* eslint-disable global-require */

const images = {
  Clear: require('../assets/weather/clear.png'),
  Hail: require('../assets/weather/hail.png'),
  'Heavy Cloud': require('../assets/weather/heavy-cloud.png'),
  'Light Cloud': require('../assets/weather/light-cloud.png'),
  'Heavy Rain': require('../assets/weather/heavy-rain.png'),
  'Light Rain': require('../assets/weather/light-rain.png'),
  Showers: require('../assets/weather/showers.png'),
  Sleet: require('../assets/weather/sleet.png'),
  Snow: require('../assets/weather/snow.png'),
  Thunder: require('../assets/weather/thunder.png'),
};

export default weather => images[weather];
