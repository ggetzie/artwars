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
import Buy from './Buy';
import List from './List';
import SellSelect from './SellSelect';
import Sell from './Sell';

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
        options={{title: 'Make an offer'}}
      />
      <CollectorStack.Screen
        name="SellSelect"
        component={SellSelect}
        options={{title: 'Select a work to sell'}}
      />
      <CollectorStack.Screen name="Sell" component={Sell} />
    </CollectorStack.Navigator>
  );
};

export default Collector;
