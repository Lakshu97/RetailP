import React, {useCallback, useEffect, useState} from 'react';
import {Dimensions, FlatList, Pressable, View} from 'react-native';
import {Button, Divider, MD2Colors, Text, TextInput} from 'react-native-paper';
import styles from '../Styles/HomeStyleSheet';
import {useDispatch, useSelector} from 'react-redux';
import {filterStores} from '../Redux/Reducers/HomeReducer';
import StoreCard from './Components/StoreCard';
import {Provider as PaperProvider} from 'react-native-paper';

import {useNavigation} from '@react-navigation/native';
import FilterModal from './Components/FilterModal';
const width = Dimensions.get('window').width;
const HomeScreen = () => {
  const dispatch = useDispatch();
  const storesFromAPI = useSelector(state => state.home.storeListApi);
  const userStores = useSelector(state => state.home.userStoreList);
  const stores = useSelector(state => state.home.stores);
  const loggedInUser = useSelector(state => state.login.loggedInUser);
  const [data, setData] = useState([]);
  const [modal, setModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const onChangeSearch = query => {
    let filtered = data.filter(item =>
      item.name.toLowerCase().includes(query.toLowerCase()),
    );
    setData(filtered);
    setSearchQuery(query);
  };
  const clearSearch = () => {
    setData(Object.values(stores));
    setSearchQuery('');
  };
  useEffect(() => {
    setData(Object.values(stores));
  }, [stores]);
  //const mock = stores.slice(0,5)
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
  const renderStoreItem = item => <StoreCard storeData={item.item} />;
  return (
    <PaperProvider>
      <View style={styles.container}>
        <Text style={styles.textStyle}>Logged User: {loggedInUser.name}</Text>
        <Divider style={styles.dividerStyle} />
        <TextInput
          placeholder="Search..."
          style={{width: width * 0.9}}
          onChangeText={onChangeSearch}
          value={searchQuery}
          mode={'outlined'}
        />
        {searchQuery.length > 0 && (
          <Pressable onPress={clearSearch} style={styles.clearSearch}>
            <Text style={styles.clearSearchTextStyle}> Clear Search </Text>
          </Pressable>
        )}
        <View style={styles.flatList}>
          <FlatList
            data={data}
            maxToRenderPerBatch={20}
            initialNumToRender={15}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            renderItem={renderStoreItem}
            ListHeaderComponent={() => (
              <View>
                <Text style={styles.headingTextStyle}> Store List </Text>
                <Button onPress={() => setModal(true)} mode={'outlined'} textColor={MD2Colors.black}>
                 Apply Filters
                </Button>
              </View>
            )}
          />
        </View>

        <FilterModal
          isVisible={modal}
          onDismiss={() => setModal(false)}
          applyFilters={() => {}}
        />
      </View>
    </PaperProvider>
  );
};
export default React.memo(HomeScreen);
