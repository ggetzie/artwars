import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '..';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import City from './City';
import Portfolio from './Portfolio';
import Collector from './Collector';
import AuctionList from './AuctionList';

const ACTIVE_COLOR = 'dodgerblue';
const INACTIVE_COLOR = 'gray';

const Tab = createBottomTabNavigator();
type Props = NativeStackScreenProps<RootStackParamList, 'Game'>;

const Game = ({route}: Props) => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          if (route.name === 'City') {
            iconName = 'city';
          } else if (route.name === 'Portfolio') {
            iconName = 'briefcase';
          } else if (route.name === 'Collector') {
            iconName = 'user-tie';
          } else if (route.name === 'Auctions') {
            iconName = 'gavel';
          } else {
            iconName = 'question';
          }

          return (
            <FontAwesome5
              name={iconName}
              color={focused ? ACTIVE_COLOR : INACTIVE_COLOR}
              size={size}
            />
          );
        },
        tabBarActiveTintColor: ACTIVE_COLOR,
        tabBarInactiveTintColor: INACTIVE_COLOR,
        tabBarStyle: {paddingBottom: 3, paddingTop: 5},
      })}>
      <Tab.Screen name="City" component={City} />
      <Tab.Screen name="Portfolio" component={Portfolio} />
      <Tab.Screen name="Collector" component={Collector} />
      <Tab.Screen name="Auctions" component={AuctionList} />
    </Tab.Navigator>
  );
};

export default Game;
