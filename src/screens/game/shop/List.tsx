import React from 'react';
import {
  View,
  Text,
  FlatList,
  GestureResponderEvent,
  TouchableHighlight,
  StyleSheet,
} from 'react-native';
import {useLinkTo} from '@react-navigation/native';
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
  listItem: {
    minHeight: 20,
    marginBottom: 5,
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
  const canAfford = powerUp.price < balance;

  return (
    <TouchableHighlight onPress={onPress} disabled={!canAfford}>
      <View style={PowerUpStyles.listItem}>
        <View style={PowerUpStyles.textRow}>
          <Text style={!canAfford && PowerUpStyles.disabledText}>
            {powerUp.name}
          </Text>
          <Text>${powerUp.price.toLocaleString()}</Text>
        </View>
        {!canAfford && <Text>You don't have enough cash to buy this item</Text>}
      </View>
    </TouchableHighlight>
  );
};

const List = (_: Props) => {
  const game = useAppSelector(state => state.game);
  const linkTo = useLinkTo();
  const powerUps = listPowerUps(game).filter(p => !p.purchased);
  const purchased = listPowerUps(game).filter(p => p.purchased);
  const balance = selectBalance(game);

  return (
    <View style={BaseStyle.container}>
      <Text style={BaseStyle.heading1}>PowerUps for Sale</Text>
      <Text>Current Balance: ${balance.toLocaleString()}</Text>
      <FlatList
        data={powerUps}
        renderItem={({item}) => (
          <PowerUpItem
            powerUp={item}
            onPress={() => linkTo(`/game/shop/${item.name}`)}
            balance={balance}
          />
        )}
      />
      {purchased.length > 0 && (
        <>
          <Text style={BaseStyle.heading1}>Purchased</Text>
          <FlatList
            data={purchased}
            renderItem={({item}) => <Text>{item.name}</Text>}
          />
        </>
      )}
    </View>
  );
};

export default List;
