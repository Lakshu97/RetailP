import React, {useCallback} from 'react';
import {Card, Title, Paragraph} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

const StoreCard = ({storeData}) => {
  const navigation = useNavigation();
  const {type, name, route, area, address} = storeData;
  const handlePress = useCallback(() => {
    navigation.navigate('Upload', {
      data: storeData,
    });
  }, [navigation, storeData]);
  return (
    <Card onPress={handlePress}>
      <Card.Content>
        <Title>{name}</Title>
        <Paragraph>Type: {type}</Paragraph>
        <Paragraph>Route: {route}</Paragraph>
        <Paragraph>Area: {area}</Paragraph>
        <Paragraph>Address: {address}</Paragraph>
      </Card.Content>
    </Card>
  );
};
export default React.memo(StoreCard);
