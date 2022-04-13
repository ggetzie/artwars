import React, {useState} from 'react';
import {View, Text, Button, TextInput, StyleSheet} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {RootStackParamList} from '.';
import {setGame, defaultGame} from '../reducers/game';
import {useAppDispatch} from '../hooks';
import {Dropdown} from '../components';

import BaseStyle from '../styles/base';

type Props = NativeStackScreenProps<RootStackParamList, 'NewGame'>;

const NewGame = ({navigation}: Props) => {
  const dispatch = useAppDispatch();
  let newGame = defaultGame();
  const [name, setName] = useState<string>(newGame.player);
  const [turns, setTurns] = useState<number>(30);
  return (
    <View style={BaseStyle.container}>
      <View style={styles.outer}>
        <Text style={styles.label}>Name:</Text>
        <TextInput
          value={name}
          style={styles.control}
          onChangeText={value => setName(value)}
        />
      </View>
      <View style={styles.outer}>
        <Dropdown
          label="Turns:"
          selectedValue={turns}
          itemList={[5, 30, 50, 75, 100].map(i => [i, i.toString()])}
          onValueChange={(itemValue: number, _: number) => setTurns(itemValue)}
          style={styles}
        />
      </View>
      <Button
        title="Start"
        onPress={() => {
          navigation.navigate('Game');
          newGame.player = name;
          newGame.maxTurns = turns;
          if (name === 'MoneyBags') {
            newGame.balance = 100_000_000_000;
            newGame.messages = [
              `Cheat code activated! You now have $${newGame.balance.toLocaleString()}`,
            ];
          }
          dispatch(setGame(newGame));
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  outer: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  label: {
    flex: 1,
  },
  control: {
    flex: 3,
  },
});

export default NewGame;
