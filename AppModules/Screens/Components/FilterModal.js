import React, {useCallback, useState} from 'react';
import {Button, Chip, MD2Colors, Modal, Portal} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';

const areaFilter = ['Koramangala', 'HSR', 'MMG Road'];
const routeFilter = ['r1', 'r2', 'r3', 'r4', 'r5', 'r6'];
const FilterModal = ({isVisible, onDismiss, applyFilters, resetFilters}) => {
  const [selectedRoutes, setSelectedRoutes] = useState([]);
  const toggleRouteSelection = useCallback(
    route => {
      if (selectedRoutes.includes(route)) {
        setSelectedRoutes(
          selectedRoutes.filter(selectedRoute => selectedRoute !== route),
        );
      } else {
        setSelectedRoutes([...selectedRoutes, route]);
      }
    },
    [selectedRoutes],
  );
  return (
    <Portal>
      <Modal
        visible={isVisible}
        onDismiss={onDismiss}
        contentContainerStyle={styles.modalContainer}>
        <View style={{padding: 16}}>
          <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
            {routeFilter.map(route => (
              <Chip
                key={route}
                style={{margin: 4}}
                selected={selectedRoutes.includes(route)}
                onPress={() => toggleRouteSelection(route)}>
                {route}
              </Chip>
            ))}
          </View>
          <Button
            onPress={() => applyFilters(selectedRoutes)}
            textColor={MD2Colors.blue600}>
            Apply Filters
          </Button>
          <Button onPress={resetFilters} textColor={MD2Colors.blue600}>
            Reset Filters
          </Button>
        </View>
      </Modal>
    </Portal>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 16,
  },
});
export default React.memo(FilterModal);
