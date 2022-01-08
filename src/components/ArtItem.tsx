import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  GestureResponderEvent,
} from 'react-native';
import {useAppSelector} from '../hooks';
import {currentHot} from '../reducers/game';
import {ArtWork} from '../util';

const ArtItem = ({
  artwork,
  onPress,
}: {
  artwork: ArtWork;
  onPress?: (event: GestureResponderEvent) => void;
}) => {
  const value = artwork.value.toLocaleString('en-US');
  const game = useAppSelector(state => state.game);
  const hot = currentHot(game);
  return (
    <TouchableHighlight onPress={onPress}>
      <View style={styles.card}>
        <Text>{artwork.title}</Text>
        <Text>by {artwork.artist}</Text>
        <Text>Value: ${value}</Text>
        <Text>
          Category:{' '}
          <Text style={hot === artwork.category ? styles.hot : {}}>
            {artwork.category}
          </Text>
        </Text>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  card: {
    paddingBottom: 10,
    paddingHorizontal: 10,
  },
  hot: {
    color: 'red',
  },
});

export default ArtItem;
