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
import {ARTWORKS} from '../util';
import {Artwork, ArtworkData} from '../util/types';
import BaseStyle from '../styles/base';

const ArtItem = ({
  artwork,
  onPress,
}: {
  artwork: Artwork;
  onPress?: (event: GestureResponderEvent) => void;
}) => {
  const value = Math.round(artwork.data.currentValue).toLocaleString();
  const game = useAppSelector(state => state.game);
  const hot = currentHot(game);
  return (
    <TouchableHighlight onPress={onPress}>
      <View style={styles.card}>
        <Text>{artwork.static.title}</Text>
        <Text>by {artwork.static.artist}</Text>
        <Text>Value: ${value}</Text>
        <Text>
          Category:{' '}
          <Text style={hot === artwork.static.category ? BaseStyle.hot : {}}>
            {artwork.static.category}
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
});

export default ArtItem;
