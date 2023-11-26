import React from 'react';
import {Button, Modal, Portal, Text} from 'react-native-paper';
import {StyleSheet} from 'react-native';

const FilterModal = ({isVisible, onDismiss, applyFilters, resetFilters}) => {
  return (
    <Portal>
      <Modal
        visible={isVisible}
        onDismiss={onDismiss}
        contentContainerStyle={styles.modalContainer}>
        <Button onPress={applyFilters}>Apply Filters</Button>
        <Button onPress={resetFilters}>Reset Filters</Button>
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
  // ... (other styles)
});
export default FilterModal;
