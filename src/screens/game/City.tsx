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
} from '../../reducers/game';
import {Picker} from '@react-native-picker/picker';
import {Cities} from '../../util';
import {useAppDispatch, useAppSelector} from '../../hooks';
import BaseStyle from '../../styles/base';

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

  return (
    <View style={BaseStyle.container}>
      <Text>Hello, {player}!</Text>
      <Text>Cash on hand: ${balance.toLocaleString()}</Text>
      <Text>Portfolio Value: ${totalValue.toLocaleString()}</Text>
      <Text>
        <Text style={BaseStyle.hot}>{hot}</Text> is SO HOT right now!
      </Text>
      <Text style={BaseStyle.pickerLabel}>Change City</Text>
      <Picker
        accessibilityLabel="Change city"
        selectedValue={city}
        onValueChange={(itemValue, _) => {
          dispatch(setCity(itemValue));
          dispatch(processTurn());
        }}>
        {Object.entries(Cities).map(([k, v]) => (
          <Picker.Item key={k} label={v} value={v} />
        ))}
      </Picker>
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
