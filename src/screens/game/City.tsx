import React from 'react';
import {View, Text, FlatList} from 'react-native';

import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {GameTabParamList} from '.';
import {
  setCity,
  selectCity,
  selectPlayer,
  selectBalance,
  currentHot,
  portfolioValue,
  processTurn,
  getMessages,
  currentTurn,
  getMaxTurns,
} from '../../reducers/game';
import {Dropdown} from '../../components';
import {Cities} from '../../util';
import {useAppDispatch, useAppSelector} from '../../hooks';
import BaseStyle from '../../styles/base';
import {CityName} from '../../util/types';

type Props = BottomTabNavigationProp<GameTabParamList, 'City'>;

const City = (_: Props) => {
  const game = useAppSelector(state => state.game);
  const dispatch = useAppDispatch();
  const city = selectCity(game);
  const player = selectPlayer(game);
  const balance = selectBalance(game);
  const hot = currentHot(game);
  const totalValue = portfolioValue(game);
  const messages = getMessages(game);
  const turn = currentTurn(game);
  const maxTurns = getMaxTurns(game);
  const onValueChange = (itemValue: CityName, _: number) => {
    dispatch(setCity(itemValue));
    dispatch(processTurn());
  };

  return (
    <View style={BaseStyle.container}>
      <Text>Hello, {player}!</Text>
      <Text>Cash on hand: ${balance.toLocaleString()}</Text>
      <Text>Portfolio Value: ${totalValue.toLocaleString()}</Text>
      <Text>
        <Text style={BaseStyle.hot}>{hot}</Text> is SO HOT right now!
      </Text>

      {turn < maxTurns && (
        <Dropdown
          selectedValue={city}
          itemList={Object.values(Cities).map(v => [v, v])}
          onValueChange={onValueChange}
          label="Change City"
        />
      )}

      <Text style={BaseStyle.heading1}>Messages</Text>
      <FlatList
        data={messages}
        renderItem={({item}) => <Text>{item}</Text>}
        ListEmptyComponent={() => <Text>No New Messages</Text>}
      />
    </View>
  );
};

export default City;
