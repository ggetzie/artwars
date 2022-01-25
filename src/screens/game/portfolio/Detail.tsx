import React, {useEffect} from 'react';
import {View, Text} from 'react-native';

import {useAppSelector} from '../../../hooks';
import {currentHot} from '../../../reducers/game';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {PortfolioStackParamList} from '.';
import BaseStyle from '../../../styles/base';

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
    <View style={BaseStyle.container}>
      <Text>Artist: {artwork.artist}</Text>
      <Text>Value: ${value}</Text>
      <Text>
        Category:{' '}
        <Text style={hot === artwork.category ? BaseStyle.hot : {}}>
          {artwork.category}
        </Text>
      </Text>
      <Text style={BaseStyle.pickerLabel}>Move to city</Text>
    </View>
  );
};

export default Detail;
