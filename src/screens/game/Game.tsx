import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '..';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import City from './City';
import Portfolio from './portfolio/';
import Collector from './collector';
import Auction from './auction/';
import {useAppSelector} from '../../hooks';
import {currentNPC, selectCity} from '../../reducers/game';

const ACTIVE_COLOR = 'dodgerblue';
const INACTIVE_COLOR = 'gray';

const Tab = createBottomTabNavigator();
type Props = NativeStackScreenProps<RootStackParamList, 'Game'>;

const Game = ({route}: Props) => {
  const game = useAppSelector(state => state.game);
  const city = selectCity(game);
  const npc = currentNPC(game);
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
      <Tab.Screen name="City" component={City} options={{title: city}} />
      <Tab.Screen name="Portfolio" component={Portfolio} />
      <Tab.Screen
        name="Collector"
        component={Collector}
        options={{title: npc.name, unmountOnBlur: true}}
      />
      <Tab.Screen
        name="Auctions"
        component={Auction}
        options={{unmountOnBlur: true}}
      />
    </Tab.Navigator>
  );
};

export default Game;
