/**
 * Art Wars Game
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {Provider} from 'react-redux';
import {Text} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {store} from './store';
import {
  Home,
  Continue,
  Settings,
  NewGame,
  About,
  Game,
  GameDetail,
  GameOver,
  HighScores,
} from './screens';
import {RootStackParamList} from './screens';
import config from './linkConfig';

const Stack = createNativeStackNavigator<RootStackParamList>();

const linking = {
  prefixes: ['artwars://', 'https://artwars.art', 'http://localhost:3000'],
  config,
};

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer linking={linking} fallback={<Text>Loading...</Text>}>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{title: 'Art Wars!'}}
          />
          <Stack.Screen name="NewGame" component={NewGame} />
          <Stack.Screen name="Continue" component={Continue} />
          <Stack.Screen
            name="GameDetail"
            component={GameDetail}
            options={{title: 'Load Game'}}
          />
          <Stack.Screen name="Settings" component={Settings} />
          <Stack.Screen name="About" component={About} />
          <Stack.Screen
            name="Game"
            component={Game}
            options={{
              headerBackVisible: false,
              title: 'Art Wars',
            }}
          />
          <Stack.Screen
            name="GameOver"
            component={GameOver}
            options={{title: 'Game Over', headerBackVisible: false}}
          />
          <Stack.Screen
            name="HighScores"
            component={HighScores}
            options={{title: 'High Scores'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
