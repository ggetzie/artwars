import React, {useState} from 'react';

import {View, Text, FlatList, Button} from 'react-native';

import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {ArtWork, bidIncrement, otherBidders, Transaction} from '../../../util';
import {ArtItem, CloseButton} from '../../../components';
import {useAppDispatch, useAppSelector} from '../../../hooks';
import {
  currentHot,
  filterArtWorks,
  selectBalance,
  selectCity,
  selectPlayer,
  transact,
  updateArtwork,
} from '../../../reducers/game';
import {AuctionStackParamList} from '.';
import BaseStyle from '../../../styles/base';
import {ArtWorkFilter} from '../../../util/awFilter';

type Props = NativeStackScreenProps<AuctionStackParamList, 'SellSelect'>;

const SellSelect = ({navigation}: Props) => {
  const game = useAppSelector(state => state.game);
  const city = selectCity(game);
  const player = selectPlayer(game);

  const couldAuction = filterArtWorks(
    game,
    new ArtWorkFilter({
      owner: o => o === player,
      city: c => c === city,
      destroyed: d => d === false,
    }),
  );

  return (
    <View style={BaseStyle.container}>
      <Text>Select an artwork to sell at auction</Text>
      <FlatList
        data={couldAuction}
        renderItem={({item}) => (
          <ArtItem
            artwork={item}
            onPress={() => navigation.navigate('Sell', {artwork: item})}
          />
        )}
        ListEmptyComponent={() => (
          <Text>You have no art works available to sell in this city.</Text>
        )}
      />
    </View>
  );
};

export default SellSelect;
