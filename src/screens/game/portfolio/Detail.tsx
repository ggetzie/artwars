import React, {useEffect} from 'react';
import {View, Text, Button, StyleSheet, SectionList} from 'react-native';

import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {GameTabParamList} from '..';

import {useAppSelector} from '../../../hooks';
import {
  currentHot,
  filterArtWorks,
  selectCity,
  selectPlayer,
} from '../../../reducers/game';
import {ArtWorkFilter} from '../../../util/awFilter';
import {Cities, ArtByCityItem, ArtWork} from '../../../util';
import {ArtItem, CloseButton} from '../../../components';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {PortfolioStackParamList} from '.';
import BaseStyles from '../../../styles/base';

type Props = NativeStackScreenProps<PortfolioStackParamList, 'Detail'>;

const Detail = ({navigation, route}: Props) => {
  const artwork = route.params.artwork;
  const game = useAppSelector(state => state.game);
  const hot = currentHot(game);
  const value = Math.round(artwork.value).toLocaleString();
  useEffect(() => {
    navigation.setOptions({title: artwork.title});
  }, [artwork]);

  return (
    <View style={BaseStyles.container}>
      <Text>Artist: {artwork.artist}</Text>
      <Text>Value: ${value}</Text>
      <Text>
        Category:{' '}
        <Text style={hot === artwork.category ? BaseStyles.hot : {}}>
          {artwork.category}
        </Text>
      </Text>
      <Text style={BaseStyles.pickerLabel}>Move to city</Text>
    </View>
  );
};

export default Detail;
