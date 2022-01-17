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
import List from './List';

type Props = BottomTabNavigationProp<GameTabParamList, 'Collector'>;

const CollectorStack = createNativeStackNavigator();

const Collector = (_: Props) => {
  return (
    <CollectorStack.Navigator>
      <CollectorStack.Screen
        name="List"
        component={List}
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
