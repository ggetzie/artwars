import React from 'react';
import {View, Text, Button} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '..';
import {useAppSelector} from '../../hooks';

type Props = NativeStackScreenProps<RootStackParamList, 'CityMain'>;

const CityMain = ({navigation}: Props) => {
  const gameState = useAppSelector(state => state.game);
  return (
    <View>
      <Text>{gameState.player}</Text>
      <Button title="Your Art" />
      <Button title="Auctions" />
      <Button title="Collector" />
      <Button onPress={() => navigation.navigate('Home')} title="Quit" />
    </View>
  );
};

export default CityMain;
