import React from 'react';
import {View, FlatList, Text, StyleSheet} from 'react-native';
import {HighScore} from '../util/types';

const ScoreList = ({
  scores,
  highlight,
}: {
  scores: HighScore[];
  highlight: number;
}) => {
  return (
    <View>
      <FlatList
        data={scores}
        renderItem={({item, index}) => (
          <Text
            style={
              index === highlight
                ? ScoreListStyle.highlight
                : ScoreListStyle.normal
            }>
            {item.player} - {new Date(item.date).toLocaleDateString()} -{' '}
            {item.score.toLocaleString()}
          </Text>
        )}
      />
    </View>
  );
};

const ScoreListStyle = StyleSheet.create({
  normal: {
    fontWeight: 'normal',
  },
  highlight: {
    fontWeight: 'bold',
  },
});

export default ScoreList;
