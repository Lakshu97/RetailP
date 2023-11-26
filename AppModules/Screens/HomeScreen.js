import React, {useCallback, useEffect, useState} from 'react';
import {Dimensions, FlatList, Pressable, View} from 'react-native';
import {Button, Divider, MD2Colors, Text, TextInput} from 'react-native-paper';
import styles from '../Styles/HomeStyleSheet';
import {useDispatch, useSelector} from 'react-redux';
import {filterStores} from '../Redux/Reducers/HomeReducer';
import StoreCard from './Components/StoreCard';
import {Provider as PaperProvider} from 'react-native-paper';

import FilterModal from './Components/FilterModal';
const width = Dimensions.get('window').width;
const HomeScreen = () => {
  const dispatch = useDispatch();
  const storesFromAPI = useSelector(state => state.home.storeListApi);
  const userStores = useSelector(state => state.home.userStoreList);
  const stores = useSelector(state => state.home.stores);
  const noStores = useSelector(state => state.home.noOfStores);
  const loggedInUser = useSelector(state => state.login.loggedInUser);
  const [data, setData] = useState([]);
  const [searchList, setSearchList] = useState(0);
  const [searchListquery, setSearchListquery] = useState(0);
  const [modal, setModal] = useState(false);
  const [reset, setReset] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const onChangeSearch = query => {
    let filtered = data.filter(item =>
      item.name.toLowerCase().includes(query.toLowerCase()),
    );
    setSearchListquery(filtered.length);
    setData(filtered);
    setSearchQuery(query);
  };
  const clearSearch = () => {
    setData(Object.values(stores));
    setSearchQuery('');
    setSearchListquery(0);
  };
  const resetFilters = () => {
    setData(Object.values(stores));
    setReset(false);
    setSearchList(0);
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
        {searchQuery.length > 0 ? (
          <View>
            <Pressable onPress={clearSearch} style={styles.clearSearch}>
              <Text style={styles.clearSearchTextStyle}>
                Clear Search & Go Back
              </Text>
            </Pressable>
            <Text style={styles.clearSearchTextStyle}>
              {searchListquery} Results
            </Text>
          </View>
        ) : null}
        {reset ? (
          <View>
            <Pressable onPress={resetFilters} style={styles.clearSearch}>
              <Text style={styles.clearSearchTextStyle}>
                Reset Filters & Go Back
              </Text>
            </Pressable>
            <Text style={styles.clearSearchTextStyle}>
              {searchList} Results
            </Text>
          </View>
        ) : null}
        <View style={styles.flatList}>
          <FlatList
            data={data}
            maxToRenderPerBatch={20}
            initialNumToRender={15}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            renderItem={renderStoreItem}
            ListHeaderComponent={() => (
              <View style={styles.filters}>
                <Text style={styles.headingTextStyle}>
                  Store List: {noStores} Stores{' '}
                </Text>
                <Button
                  style={styles.applyFilters}
                  onPress={() => setModal(true)}
                  mode={'outlined'}
                  textColor={MD2Colors.black}>
                  Apply Filters
                </Button>
              </View>
            )}
          />
        </View>

        <FilterModal
          isVisible={modal}
          onDismiss={() => setModal(false)}
          applyFilters={query => {
            const filteredData = data.filter(item =>
              query.includes(item.route),
            );
            setModal(false);
            setData(filteredData);
            setReset(true);
            setSearchList(filteredData.length);
          }}
        />
      </View>
    </PaperProvider>
  );
};
export default React.memo(HomeScreen);
