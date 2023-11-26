import React, {useCallback, useEffect, useState} from 'react';
import {ToastAndroid, View} from 'react-native';
import styles from '../Styles/LoginStyles';
import {MD2Colors, Text, TextInput, Button} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {getLoginData, sendLoginData} from '../Redux/Reducers/LoginReducer';
import {useNavigation} from '@react-navigation/native';
import {addStoreList} from '../Redux/Reducers/HomeReducer';

const LoginScreen = () => {
  const [text, setText] = useState('');
  const [pass, setPass] = useState('');
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const userData = useSelector(state => state.login.loginData);
  useEffect(() => {
    dispatch(getLoginData());
  }, []);
  const submitButton = useCallback(() => {
    let result = Object.values(userData).find(
      item => item.name === text.trim(),
    );
    if (result && pass.trim() === 'Password') {
      dispatch(sendLoginData(result));
      dispatch(addStoreList(result.stores));
      console.log(`Length of store = ${result.stores.length}`);
      ToastAndroid.showWithGravity(
        'Login SuccessFull',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
      setTimeout(() => {
        navigation.navigate('Home');
      }, 980);
    } else {
      // console.log("UnSuccessfull")
      ToastAndroid.showWithGravity(
        'Invalid Credentials',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    }
  }, [dispatch, navigation, pass, text, userData]);
  return (
    <View style={styles.container}>
      <Text style={styles.loginText}>Login</Text>
      <TextInput
        label="UserName"
        value={text}
        style={styles.textInput}
        onChangeText={text => setText(text)}
        mode={'outlined'}
        textColor={MD2Colors.black}
        autoComplete={'name'}
      />
      <TextInput
        label="Password"
        value={pass}
        style={styles.textInput}
        onChangeText={text => setPass(text)}
        mode={'outlined'}
        textColor={MD2Colors.black}
        autoComplete={'name'}
        secureTextEntry
      />
      <Button
        mode="contained"
        style={styles.buttonStyle}
        onPress={submitButton}>
        Login
      </Button>
    </View>
  );
};
export default React.memo(LoginScreen);
