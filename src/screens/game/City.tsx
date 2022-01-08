import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {GameTabParamList} from '.';
import {
  setCity,
  selectCity,
  selectPlayer,
  selectBalance,
  currentHot,
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
  const hot = currentHot(game);

  return (
    <View>
      <Text>{player}</Text>
      <Text>{balance}</Text>
      <Text>
        Welcome to {city}! <Text style={styles.hot}>{hot}</Text> artworks are SO
        HOT right now!
      </Text>
      <Picker
        accessibilityLabel="Change city"
        selectedValue={city}
        onValueChange={(itemValue, _) => dispatch(setCity(itemValue))}>
        {Object.entries(Cities).map(([k, v]) => (
          <Picker.Item key={k} label={v} value={v} />
        ))}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  hot: {
    color: 'red',
  },
});

export default City;
