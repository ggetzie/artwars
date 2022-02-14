import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {RootStackParamList} from '.';
import {useAppSelector} from '../hooks';
import BaseStyle from '../styles/base';
import {
  getMaxTurns,
  portfolioValue,
  selectBalance,
  selectPlayer,
} from '../reducers/game';
import {useFocusEffect} from '@react-navigation/native';
import {
  deleteGame,
  insertNewHS,
  loadHighScores,
  saveHighScores,
  sortScoresDescending,
} from '../util';
import {HighScore} from '../util/types';
import {ScoreList, QuitButton} from '../components';

type Props = NativeStackScreenProps<RootStackParamList, 'GameOver'>;

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

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <QuitButton navigation={navigation} />,
    });
  }, []);

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
          deleteGame(game.id);
          saveHighScores(newScores).catch(err =>
            console.log(`Error saving high scores: ${err}`),
          );
        })
        .catch(err => console.log(`Error loading high scores: ${err}`))
        .finally(() => setLoading(false));
    }, [score]),
  );

  return (
    <View style={BaseStyle.container}>
      {loading ? (
        <Text>Loading</Text>
      ) : (
        <>
          <Text>Score: {score.toLocaleString()}</Text>
          {newHSIndex > -1 && (
            <Text>Congratulations! You achieved a new high score!</Text>
          )}
          {highScores.length > 0 && (
            <ScoreList scores={highScores} highlight={newHSIndex} />
          )}
        </>
      )}
    </View>
  );
};

export default GameOver;
