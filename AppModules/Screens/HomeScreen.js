import React, {useEffect} from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-paper';
import styles from '../Styles/HomeStyleSheet';
import {useDispatch, useSelector} from 'react-redux';
import {filterStores} from '../Redux/Reducers/HomeReducer';
import {stat} from '@babel/core/lib/gensync-utils/fs';
const HomeScreen = () => {
  const dispatch = useDispatch();
  const storesFromAPI = useSelector(state => state.home.storeListApi);
  const userStores = useSelector(state => state.home.userStoreList);
  const stores = useSelector(state => state.home.stores)
  const loggedInUser = useSelector(state => state.login.loggedInUser)
  useEffect(() => {
    var filteredItems = {};
    for (var i = 0; i < userStores.length; i++) {
      var id = userStores[i];
      if (storesFromAPI.hasOwnProperty(id)) {
        filteredItems[id] = storesFromAPI[id];
      }
    }
    dispatch(filterStores(filteredItems));
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>Logged User: {loggedInUser.name}</Text>
    </View>
  );
};
export default React.memo(HomeScreen);
