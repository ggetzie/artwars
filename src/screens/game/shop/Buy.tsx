import React from 'react';
import {
  View,
  Text,
  Button,
  FlatList,
  Image,
  GestureResponderEvent,
  TouchableHighlight,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {getPowerUp, buyPowerUp} from '../../../reducers/game';
import {ShopStackParamList} from '.';
import {useAppSelector, useAppDispatch} from '../../../hooks';
import BaseStyle from '../../../styles/base';

type Props = NativeStackScreenProps<ShopStackParamList, 'Buy'>;

const Buy = ({navigation, route}: Props) => {
  const game = useAppSelector(state => state.game);
  const powerUp = getPowerUp(game, route.params.name);
  const dispatch = useAppDispatch();

  return (
    <View style={BaseStyle.container}>
      <Text>{powerUp.name}</Text>
      <Text>{powerUp.description}</Text>
      <View style={BaseStyle.buttonRow}>
        <Button title="Cancel" onPress={() => navigation.goBack()} />
        <Button
          title="Buy"
          onPress={() => dispatch(buyPowerUp(powerUp.name))}
        />
      </View>
    </View>
  );
};

export default Buy;
