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
import {ArtWork, considerOffer, Transaction} from '../../../util';
import {ArtItem} from '../../../components';
import BaseStyle from '../../../styles/base';
import {CollectorStackParamList} from '.';
import Buy from './Buy';

type Props = BottomTabNavigationProp<GameTabParamList, 'Collector'>;

const CollectorStack = createNativeStackNavigator();

type ListProps = NativeStackScreenProps<CollectorStackParamList, 'List'>;

const CollectorList = ({navigation}: ListProps) => {
  const game = useAppSelector(state => state.game);
  const npc = currentNPC(game);
  const artworks = filterArtWorks(
    game,
    new ArtWorkFilter({owner: o => o === npc.name}),
  );
  return (
    <View style={BaseStyle.container}>
      <View>
        <Text>{npc.bio}</Text>
        <Text>Likes: {npc.preference}</Text>
      </View>
      <View>
        <Text style={BaseStyle.heading1}>Collection</Text>
        <FlatList
          data={artworks}
          renderItem={({item}) => (
            <ArtItem
              artwork={item}
              onPress={() => navigation.navigate('Buy', {artwork: item})}
            />
          )}
        />
      </View>
    </View>
  );
};

const Collector = (_: Props) => {
  return (
    <CollectorStack.Navigator>
      <CollectorStack.Screen
        name="List"
        component={CollectorList}
        options={{headerShown: false}}
      />
      <CollectorStack.Screen
        name="Buy"
        component={Buy}
        options={{presentation: 'modal', headerShown: false}}
      />
    </CollectorStack.Navigator>
  );
};

export default Collector;
