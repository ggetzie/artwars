import React, {useState} from 'react';
import {View, Text, TextInput, StyleSheet, Button} from 'react-native';
import {useLinkTo} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {RootStackParamList} from '.';
import {setGame, defaultGame} from '../reducers/game';
import {useAppDispatch} from '../hooks';
import {Dropdown} from '../components';

import BaseStyle from '../styles/base';

type Props = NativeStackScreenProps<RootStackParamList, 'NewGame'>;

const NewGame = (_: Props) => {
  const dispatch = useAppDispatch();
  const linkTo = useLinkTo();
  let newGame = defaultGame();
  const [name, setName] = useState(newGame.player);
  const [turns, setTurns] = useState(newGame.maxTurns);
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
          onValueChange={(itemValue: number, _: number) => {
            setTurns(itemValue);
          }}
          style={styles}
        />
      </View>
      <Button
        title="Start"
        onPress={() => {
          if (name === 'MoneyBags') {
            newGame.balance = 100_000_000_000;
            newGame.messages = [
              `Cheat code activated! Balance set to $${newGame.balance.toLocaleString()}`,
            ];
          }
          newGame.player = name;
          newGame.maxTurns = turns;
          dispatch(setGame(newGame));
          linkTo('/game/city/');
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
    textAlignVertical: 'center',
  },
  control: {
    flex: 3,
  },
});

export default NewGame;
