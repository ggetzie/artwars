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

type Props = NativeStackScreenProps<RootStackParamList, 'CityMain'>;

const CityMain = ({navigation}: Props) => {
  const game = useAppSelector(state => state);
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
        <Picker.Item label={Cities.HongKong} value={Cities.HongKong} />
        <Picker.Item label={Cities.London} value={Cities.London} />
        <Picker.Item label={Cities.LosAngeles} value={Cities.LosAngeles} />
        <Picker.Item label={Cities.Moscow} value={Cities.Moscow} />
        <Picker.Item label={Cities.NewYork} value={Cities.NewYork} />
        <Picker.Item label={Cities.Riyadh} value={Cities.Riyadh} />
        <Picker.Item label={Cities.SanFrancisco} value={Cities.SanFrancisco} />
      </Picker>
      <Button title="Your Art" />
      <Button title="Auctions" />
      <Button title="Collector" />
      <Button onPress={() => navigation.navigate('Home')} title="Quit" />
    </View>
  );
};

export default CityMain;
