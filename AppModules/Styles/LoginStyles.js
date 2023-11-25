import { Dimensions, StyleSheet } from "react-native";
import { MD2Colors } from "react-native-paper";
const width= Dimensions.get('window').width
export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems:'center',
    justifyContent:'center'
  },
  loginText:{
    fontSize:20,
    color: MD2Colors.black,
    fontWeight:'bold'
  },
  textInput:{
    width: width * 0.75,
    marginVertical: 10,
  },
  buttonStyle:{
    marginVertical:10,
    width:width * 0.48
  }
});
