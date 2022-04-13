import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '.';
import {useAppDispatch} from '../hooks';
import {setGame, gameState, portfolioValue} from '../reducers/game';
import BaseStyle from '../styles/base';
import {deleteGame} from '../util';

type Props = NativeStackScreenProps<RootStackParamList, 'GameDetail'>;

const GameDetail = ({navigation, route}: Props) => {
  const dispatch = useAppDispatch();
  const game = route.params.game;
  const started = new Date(game.started);

  return (
    <View style={BaseStyle.container}>
      <Text>{game.player}</Text>
      <Text>Started: {started.toLocaleString()}</Text>
      <Text>
        Turn {game.turn} of {game.maxTurns}
      </Text>
      <Text>Balance: ${game.balance.toLocaleString()}</Text>
      <Text>Portfolio Value: ${portfolioValue(game).toLocaleString()}</Text>
      <View
        style={[
          BaseStyle.buttonRow,
          {justifyContent: 'space-between', paddingHorizontal: '15%'},
        ]}>
        <TouchableOpacity
          style={[BaseStyle.button, BaseStyle.dangerButton]}
          onPress={() => {
            deleteGame(game.id).then(() => navigation.navigate('Continue'));
          }}>
          <Text style={[BaseStyle.buttonText, {color: 'white'}]}>Delete</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[BaseStyle.button, {backgroundColor: 'green'}]}
          onPress={() => {
            dispatch(setGame(game));
            navigation.navigate('Game');
          }}>
          <Text style={[BaseStyle.buttonText, {color: 'white'}]}>Load</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default GameDetail;
