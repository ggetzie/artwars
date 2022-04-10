import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '..';

import City from './City';
import Portfolio from './portfolio/';
import Collector from './collector';
import Auction from './auction/';
import Shop from './shop';
import {useAppSelector} from '../../hooks';
import {
  currentNPC,
  selectCity,
  currentTurn,
  getMaxTurns,
} from '../../reducers/game';
import {saveGame} from '../../util/persist';
import {QuitButton, AWIcon, LinkButton} from '../../components';
import BaseStyle from '../../styles/base';

const ACTIVE_COLOR = 'dodgerblue';
const INACTIVE_COLOR = 'gray';

const Tab = createBottomTabNavigator();
type Props = NativeStackScreenProps<RootStackParamList, 'Game'>;

const Game = ({navigation}: Props) => {
  const game = useAppSelector(state => state.game);
  const city = selectCity(game);
  const npc = currentNPC(game);
  const turn = currentTurn(game);
  const maxTurns = getMaxTurns(game);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <QuitButton />,
      title: `Art Wars - ${turn} / ${maxTurns}`,
    });
  }, [turn, maxTurns, navigation]);

  // save whenever game state updated
  useEffect(() => {
    saveGame(game).catch(err =>
      console.log(`Error saving ${game.id} - ${err}`),
    );
  }, [game]);

  return (
    <>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, size}) => {
            let iconName;
            if (route.name === 'City') {
              iconName = 'city';
            } else if (route.name === 'Portfolio') {
              iconName = 'briefcase';
            } else if (route.name === 'Collector') {
              iconName = 'user-tie';
            } else if (route.name === 'Auctions') {
              iconName = 'gavel';
            } else if (route.name === 'Shop') {
              iconName = 'store';
            } else {
              iconName = 'question';
            }

            return (
              <AWIcon
                name={iconName}
                color={focused ? ACTIVE_COLOR : INACTIVE_COLOR}
                style={{fontSize: size}}
              />
            );
          },
          tabBarActiveTintColor: ACTIVE_COLOR,
          tabBarInactiveTintColor: INACTIVE_COLOR,
          tabBarStyle: {paddingBottom: 3, paddingTop: 5},
        })}>
        <Tab.Screen name="City" component={City} options={{title: city}} />
        <Tab.Screen
          name="Portfolio"
          component={Portfolio}
          options={{unmountOnBlur: true}}
        />
        <Tab.Screen
          name="Collector"
          component={Collector}
          options={{title: npc.character.name, unmountOnBlur: true}}
        />
        <Tab.Screen
          name="Auctions"
          component={Auction}
          options={{unmountOnBlur: true}}
        />
        <Tab.Screen
          name="Shop"
          component={Shop}
          options={{unmountOnBlur: true}}
        />
      </Tab.Navigator>
      {turn >= maxTurns && (
        <View>
          <LinkButton to={{screen: 'GameOver'}} style={BaseStyle.navButton}>
            <Text style={BaseStyle.navButtonText}>End Game</Text>
          </LinkButton>
        </View>
      )}
    </>
  );
};

export default Game;
