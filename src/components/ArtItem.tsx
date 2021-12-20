import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {ArtWork} from '../util';
const ArtItem = ({artwork}: {artwork: ArtWork}) => {
  return (
    <View style={styles.card}>
      <Text>{artwork.title}</Text>
      <Text>{artwork.artist}</Text>
      <Text>{artwork.value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    paddingBottom: 10,
    paddingHorizontal: 10,
  },
});

export default ArtItem;
