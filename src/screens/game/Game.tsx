import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '..';

import City from './City';
import Portfolio from './Portfolio';
import Collector from './Collector';
import AuctionList from './AuctionList';
const Tab = createBottomTabNavigator();

type Props = NativeStackScreenProps<RootStackParamList, 'Game'>;

const Game = (_: Props) => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="City" component={City} />
        <Tab.Screen name="Portfolio" component={Portfolio} />
        <Tab.Screen name="Collector" component={Collector} />
        <Tab.Screen name="Auctions" component={AuctionList} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Game;
