import React from 'react';
import {View, Text, Button, TextInput} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '.';
import {selectPlayer, setPlayer} from '../reducers/game';
import {useAppDispatch, useAppSelector} from '../hooks';

type Props = NativeStackScreenProps<RootStackParamList, 'NewGame'>;

const NewGame = ({navigation}: Props) => {
  const game = useAppSelector(state => state);
  const player = selectPlayer(game);
  const dispatch = useAppDispatch();
  return (
    <View>
      <Text>Player Name:</Text>
      <TextInput
        value={player}
        onChangeText={value => dispatch(setPlayer(value))}
      />
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
