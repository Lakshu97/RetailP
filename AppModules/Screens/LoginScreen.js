import React from "react";
import { View } from "react-native";
import styles from "../Styles/LoginStyles";
import { Text } from "react-native-paper";


const LoginScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Login Screen</Text>
    </View>
  )
}
export default React.memo(LoginScreen);
