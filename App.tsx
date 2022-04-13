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

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {store} from './src/store';
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
} from './src/screens';
import {RootStackParamList} from './src/screens';

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
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
