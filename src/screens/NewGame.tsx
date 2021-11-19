import React from 'react';
import {View, Text, Button, TextInput} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '.';
import {setPlayer} from '../reducers/game';
import {useAppSelector} from '../hooks';

type Props = NativeStackScreenProps<RootStackParamList, 'NewGame'>;

const NewGame = ({navigation}: Props) => {
  const player = useAppSelector(state => state.game.player);
  return (
    <View>
      <Text>Player Name:</Text>
      <TextInput value={player} onChangeText={setPlayer} />
      <Button
        title="Start"
        onPress={() => {
          navigation.navigate('CityMain');
        }}
      />
    </View>
  );
};

export default NewGame;
