import React from 'react';
import {View, Text, Button} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '..';
import {
  setCity,
  selectCity,
  selectPlayer,
  selectBalance,
} from '../../reducers/game';
import {Picker} from '@react-native-picker/picker';
import {Cities} from '../../util';
import {useAppDispatch, useAppSelector} from '../../hooks';

type Props = NativeStackScreenProps<RootStackParamList, 'City'>;

const City = ({navigation}: Props) => {
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
      <Button
        title="Portfolio"
        onPress={() => navigation.navigate('Portfolio')}
      />
      <Button title="Auctions" />
      <Button
        title="Collector"
        onPress={() => navigation.navigate('Collector')}
      />
      <Button onPress={() => navigation.navigate('Home')} title="Quit" />
    </View>
  );
};

export default City;
