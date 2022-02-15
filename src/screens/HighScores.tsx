import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '.';
import {ScoreList} from '../components';
import {loadHighScores} from '../util';
import {HighScore} from '../util/types';
import BaseStyle from '../styles/base';

type Props = NativeStackScreenProps<RootStackParamList, 'HighScores'>;

const HighScores = (_: Props) => {
  const [loading, setLoading] = useState(false);
  const [scores, setScores] = useState<HighScore[]>([]);

  useEffect(() => {
    setLoading(true);
    loadHighScores()
      .then(s => setScores(s))
      .catch(err => console.log(`Error loading high scores: ${err}`))
      .finally(() => setLoading(false));
  }, []);
  return (
    <View style={BaseStyle.container}>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <ScoreList scores={scores} highlight={-1} />
      )}
    </View>
  );
};

export default HighScores;
