import React from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-paper';
import styles from "../Styles/HomeStyleSheet";
const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
    </View>
  )
}
export default React.memo(HomeScreen);
