import React, {useState} from 'react';
import {View, Text, Button, FlatList, Modal, TextInput} from 'react-native';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

import {useAppDispatch, useAppSelector} from '../../../hooks';
import {
  currentNPC,
  filterArtWorks,
  selectBalance,
  selectCity,
  selectPlayer,
  transact,
} from '../../../reducers/game';

import {ArtWorkFilter} from '../../../util/awFilter';
import {ArtItem} from '../../../components';
import BaseStyle from '../../../styles/base';
import {CollectorStackParamList} from '.';

type Props = NativeStackScreenProps<CollectorStackParamList, 'SellSelect'>;
const SellSelect = ({navigation}: Props) => {
  const game = useAppSelector(state => state.game);
  const city = selectCity(game);
  const player = selectPlayer(game);
  const forSale = filterArtWorks(
    game,
    new ArtWorkFilter({owner: o => o === player, city: c => c === city}),
  );
  return (
    <View style={BaseStyle.container}>
      <Text>Oh you want to sell me something? Let's see what you've got.</Text>
      <FlatList
        data={forSale}
        renderItem={({item}) => (
          <ArtItem
            awd={item}
            onPress={() => navigation.navigate('Sell', {artworkId: item.id})}
          />
        )}
        ListEmptyComponent={<Text>You don't have anything to sell.</Text>}
      />
    </View>
  );
};

export default SellSelect;
