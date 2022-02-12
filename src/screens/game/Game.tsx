import React, {useState, useEffect} from 'react';
import {View, Button} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '..';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import City from './City';
import Portfolio from './portfolio/';
import Collector from './collector';
import Auction from './auction/';
import {useAppSelector} from '../../hooks';
import {
  currentNPC,
  selectCity,
  currentTurn,
  getMaxTurns,
} from '../../reducers/game';
import {TouchableOpacity} from 'react-native';
import {saveGame} from '../../util';

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

  const QuitButton = () => (
    <TouchableOpacity
      style={{maxWidth: 40}}
      onPress={() => navigation.navigate('Home')}>
      <FontAwesome5 name={'times-circle'} color={'red'} size={20} />
    </TouchableOpacity>
  );

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <QuitButton />,
      title: `Art Wars - ${turn} / ${maxTurns}`,
    });
  }, [turn, maxTurns]);

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
      </Tab.Navigator>
      {turn >= maxTurns && (
        <View>
          <Button
            title="End Game"
            onPress={() => navigation.navigate('GameOver')}
          />
        </View>
      )}
    </>
  );
};

export default Game;
