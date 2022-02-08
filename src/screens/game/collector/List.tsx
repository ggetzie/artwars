import React, {useState} from 'react';
import {View, Text, Button, FlatList, Modal, TextInput} from 'react-native';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

import {GameTabParamList} from '..';

import {useAppDispatch, useAppSelector} from '../../../hooks';
import {
  currentNPC,
  filterArtWorks,
  selectBalance,
  selectPlayer,
  transact,
} from '../../../reducers/game';

import {ArtWorkFilter} from '../../../util/awFilter';
import {ArtItem} from '../../../components';
import BaseStyle from '../../../styles/base';
import {CollectorStackParamList} from '.';
import {ArtworkData} from '../../../util/types';

type Props = NativeStackScreenProps<CollectorStackParamList, 'List'>;

const List = ({navigation}: Props) => {
  const game = useAppSelector(state => state.game);
  const npc = currentNPC(game);
  const artworksData: ArtworkData[] = filterArtWorks(
    game,
    new ArtWorkFilter({owner: o => o === npc.character.name}),
  );
  return (
    <View style={BaseStyle.container}>
      <View>
        <Text>{npc.character.bio}</Text>
        <Text>Likes: {npc.data.preference}</Text>
      </View>
      <View>
        <Button
          title="Sell"
          onPress={() => navigation.navigate('SellSelect')}
        />
      </View>
      <View>
        <Text style={BaseStyle.heading1}>Collection</Text>
        <FlatList
          data={artworksData}
          renderItem={({item}) => (
            <ArtItem
              awd={item}
              onPress={() => navigation.navigate('Buy', {artworkId: item.id})}
            />
          )}
        />
      </View>
    </View>
  );
};

export default List;
