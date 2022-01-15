import React, {useState} from 'react';
import {View, Text, StyleSheet, FlatList, Button} from 'react-native';

import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {ArtItem} from '../../../components';
import {useAppSelector} from '../../../hooks';
import {
  filterArtWorks,
  selectArtworks,
  selectCity,
} from '../../../reducers/game';
import {ArtWorkFilter} from '../../../util/awFilter';
import {AuctionStackParamList} from '.';
import BaseStyle from '../../../styles/base';

type Props = NativeStackScreenProps<AuctionStackParamList, 'List'>;

const List = ({navigation}: Props) => {
  const game = useAppSelector(state => state.game);
  const city = selectCity(game);
  const artworks = filterArtWorks(
    game,
    new ArtWorkFilter({
      auction: a => a === true,
      city: c => c === city,
      destroyed: d => d === false,
    }),
  );

  return (
    <View style={BaseStyle.container}>
      <Button title="Sell" onPress={() => navigation.navigate('SellSelect')} />
      <FlatList
        renderItem={({item}) => (
          <ArtItem
            artwork={item}
            onPress={() => navigation.navigate('Buy', {artwork: item})}
          />
        )}
        data={artworks}
        ListEmptyComponent={() => <Text>No works for auction</Text>}
      />
    </View>
  );
};

export default List;
