import React from 'react';
import {
  View,
  Text,
  FlatList,
  GestureResponderEvent,
  TouchableHighlight,
  StyleSheet,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {listPowerUps, selectBalance} from '../../../reducers/game';
import {PowerUp} from '../../../util/types';
import {ShopStackParamList} from '.';

type Props = NativeStackScreenProps<ShopStackParamList, 'List'>;

import {useAppSelector} from '../../../hooks';
import BaseStyle from '../../../styles/base';

const PowerUpStyles = StyleSheet.create({
  disabledText: {
    fontWeight: '100',
    textDecorationLine: 'line-through',
    color: 'darkgray',
  },
  textRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

const PowerUpItem = ({
  powerUp,
  onPress,
  balance,
}: {
  powerUp: PowerUp;
  onPress: (event: GestureResponderEvent) => void;
  balance: number;
}) => {
  const disabled = powerUp.purchased || powerUp.price > balance;
  return (
    <TouchableHighlight onPress={onPress} disabled={disabled}>
      <View>
        <View style={PowerUpStyles.textRow}>
          <Text style={disabled && PowerUpStyles.disabledText}>
            {powerUp.name}
          </Text>
          <Text>${powerUp.price.toLocaleString()}</Text>
        </View>
        {disabled && powerUp.purchased ? (
          <Text>You already own this item</Text>
        ) : (
          <Text>You don't have enough cash to buy this.</Text>
        )}
      </View>
    </TouchableHighlight>
  );
};

const List = ({navigation}: Props) => {
  const game = useAppSelector(state => state.game);
  const powerUps = listPowerUps(game);
  const balance = selectBalance(game);

  return (
    <View style={BaseStyle.container}>
      <Text>PowerUp list</Text>
      <FlatList
        data={powerUps}
        renderItem={({item}) => (
          <PowerUpItem
            powerUp={item}
            onPress={() => navigation.navigate('Buy', {name: item.name})}
            balance={balance}
          />
        )}
      />
    </View>
  );
};

export default List;
