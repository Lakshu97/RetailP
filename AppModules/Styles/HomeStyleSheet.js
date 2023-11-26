import {StyleSheet} from 'react-native';
import {MD2Colors} from 'react-native-paper';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  textStyle: {
    color: MD2Colors.black,
    fontSize: 13,
    fontWeight: 'bold',
  },
  dividerStyle: {
    margin: 5,
    height: 5,
  },
  headingTextStyle: {
    fontSize: 17,
    color: MD2Colors.black,
    fontWeight: 'normal',
    marginVertical: 5,
  },
  flatList: {
    flex: 1,
    marginHorizontal: 5,
    marginVertical: 5,
    backgroundColor: MD2Colors.grey200,
  },
  separator: {
    height: 1.8,
    backgroundColor: MD2Colors.grey50,
  },
  clearSearch: {
    marginVertical: 10,
    padding: 5,
    borderWidth: 1.1,
    borderRadius: 4,
    borderColor: MD2Colors.orange800,
    color:MD2Colors.black
  },
  clearSearchTextStyle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
