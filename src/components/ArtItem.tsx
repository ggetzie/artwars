import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  GestureResponderEvent,
} from 'react-native';
import {ArtWork} from '../util';

const ArtItem = ({
  artwork,
  onPress,
}: {
  artwork: ArtWork;
  onPress: (event: GestureResponderEvent) => void;
}) => {
  const value = artwork.value.toLocaleString('en-US');
  return (
    <TouchableHighlight onPress={onPress}>
      <View style={styles.card}>
        <Text>{artwork.title}</Text>
        <Text>by {artwork.artist}</Text>
        <Text>Value: ${value}</Text>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  card: {
    paddingBottom: 10,
    paddingHorizontal: 10,
  },
});

export default ArtItem;
