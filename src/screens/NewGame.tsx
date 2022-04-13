import React, {useState} from 'react';
import {View, Text, Button, TextInput, StyleSheet} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Picker} from '@react-native-picker/picker';

import {RootStackParamList} from '.';
import {setGame, defaultGame} from '../reducers/game';
import {useAppDispatch} from '../hooks';

import BaseStyle from '../styles/base';

type Props = NativeStackScreenProps<RootStackParamList, 'NewGame'>;

const NewGame = ({navigation}: Props) => {
  const dispatch = useAppDispatch();
  let newGame = defaultGame();
  const [name, setName] = useState<string>(newGame.player);
  const [turns, setTurns] = useState<number>(30);
  return (
    <View style={BaseStyle.container}>
      <View style={styles.formRow}>
        <Text style={styles.formRowLabel}>Name:</Text>
        <TextInput
          value={name}
          style={styles.formRowInput}
          onChangeText={value => setName(value)}
        />
      </View>
      <View style={styles.formRow}>
        <Text style={styles.formRowLabel}>Turns:</Text>
        <Picker
          accessibilityLabel="Number of Turns"
          selectedValue={turns}
          style={styles.formRowInput}
          onValueChange={(itemValue, _) => setTurns(itemValue)}>
          {[5, 30, 50, 75, 100].map(i => (
            <Picker.Item key={i} value={i} label={i.toString()} />
          ))}
        </Picker>
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
  formRow: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  formRowLabel: {
    flex: 1,
  },
  formRowInput: {
    flex: 3,
  },
});

export default NewGame;
