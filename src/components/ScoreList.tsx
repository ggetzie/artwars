import React from 'react';
import {View, FlatList, Text} from 'react-native';
import {HighScore} from '../util/types';
import BaseStyle from '../styles/base';

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
                ? {fontWeight: 'bold'}
                : {fontWeight: 'normal'}
            }>
            {item.player} - {new Date(item.date).toLocaleDateString()} -{' '}
            {item.score.toLocaleString()}
          </Text>
        )}
      />
    </View>
  );
};

export default ScoreList;
