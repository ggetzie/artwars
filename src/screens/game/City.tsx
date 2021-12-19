import React from 'react';
import {View, Text} from 'react-native';

import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {GameTabParamList} from '.';
import {
  setCity,
  selectCity,
  selectPlayer,
  selectBalance,
} from '../../reducers/game';
import {Picker} from '@react-native-picker/picker';
import {Cities} from '../../util';
import {useAppDispatch, useAppSelector} from '../../hooks';

type Props = BottomTabNavigationProp<GameTabParamList, 'City'>;

const City = (_: Props) => {
  const game = useAppSelector(state => state.game);
  const dispatch = useAppDispatch();
  const city = selectCity(game);
  const player = selectPlayer(game);
  const balance = selectBalance(game);

  return (
    <View>
      <Text>{player}</Text>
      <Text>{balance}</Text>
      <Picker
        selectedValue={city}
        onValueChange={(itemValue, _) => dispatch(setCity(itemValue))}>
        {Object.entries(Cities).map(([k, v]) => (
          <Picker.Item key={k} label={v} value={v} />
        ))}
      </Picker>
    </View>
  );
};

export default City;
