import Reactotron from 'reactotron-react-native';
import {reactotronRedux} from 'reactotron-redux';
const AppReactotron = Reactotron.configure({
  name: 'RetailPulse App',
}) // controls connection & communication settings
  .useReactNative() // add all built-in react native plugins
  .use(reactotronRedux()) // Redux Support// Saga Support
  .connect();
export default AppReactotron;
