import React, {useState} from 'react';
import {View, Text, FlatList} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '.';
import {useAppDispatch, useAppSelector} from '../hooks';
import BaseStyle from '../styles/base';
import {
  getMaxTurns,
  portfolioValue,
  selectBalance,
  selectPlayer,
} from '../reducers/game';
import {useFocusEffect} from '@react-navigation/native';
import {
  insertNewHS,
  loadHighScores,
  saveHighScores,
  sortScoresDescending,
} from '../util';
import {HighScore} from '../util/types';

type Props = NativeStackScreenProps<RootStackParamList, 'GameOver'>;

const ScoreList = ({scores}: {scores: HighScore[]}) => {
  return (
    <View>
      <Text style={BaseStyle.heading1}>High Scores</Text>
      <FlatList
        data={scores}
        renderItem={({item}) => (
          <Text>
            {item.player} - {new Date(item.date).toLocaleDateString()} -{' '}
            {item.score}
          </Text>
        )}
      />
    </View>
  );
};

const GameOver = ({navigation}: Props) => {
  const game = useAppSelector(state => state.game);
  const player = selectPlayer(game);
  const balance = selectBalance(game);
  const value = portfolioValue(game);
  const maxTurns = getMaxTurns(game);
  const score = Math.round((balance + value) / maxTurns);
  const [loading, setLoading] = useState(false);
  const [highScores, setHighScores] = useState<HighScore[]>([]);
  const [newHSIndex, setNewHSIndex] = useState(-1);

  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);
      loadHighScores()
        .then(scores => {
          const oldScores = [...scores].sort(sortScoresDescending);
          const [newScores, index] = insertNewHS(oldScores, {
            player: player,
            score: score,
            date: new Date().toLocaleDateString(),
          });
          setHighScores(newScores);
          setNewHSIndex(index);
        })
        .catch(err => console.log(`Error with high scores: ${err}`))
        .finally(() => setLoading(false));
    }, [score]),
  );

  return (
    <View style={BaseStyle.container}>
      {loading ? (
        <Text>Loading</Text>
      ) : (
        <>
          <Text>Game Over</Text>
          <Text>Score: {score}</Text>
          {highScores.length > 0 && <ScoreList scores={highScores} />}
        </>
      )}
    </View>
  );
};

export default GameOver;
