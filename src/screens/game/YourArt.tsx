import React from 'react';
import {View, Text, Button} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {useAppSelector} from '../../hooks';
import {selectCity} from '../../reducers/game';
import {RootStackParamList} from '..';

type Props = NativeStackScreenProps<RootStackParamList, 'YourArt'>;

const YourArt = ({navigation}: Props) => {
  const game = useAppSelector(state => state);
  const city = selectCity(game);
  return (
    <View>
      <Text>In {city}</Text>
      <Text>Elsewhere</Text>
      <Button title="Back" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default YourArt;
