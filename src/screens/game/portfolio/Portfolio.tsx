import React from 'react';

import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {GameTabParamList} from '..';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import List from './List';
import Detail from './Detail';
import Confirm from './Confirm';

type Props = BottomTabNavigationProp<GameTabParamList, 'Portfolio'>;

const PortfolioStack = createNativeStackNavigator();

const Portfolio = (_: Props) => {
  return (
    <PortfolioStack.Navigator>
      <PortfolioStack.Screen
        name={'List'}
        component={List}
        options={{headerShown: false}}
      />
      <PortfolioStack.Screen name={'Detail'} component={Detail} />
      <PortfolioStack.Screen
        name={'Confirm'}
        component={Confirm}
        options={{title: 'Confirm Move'}}
      />
    </PortfolioStack.Navigator>
  );
};

export default Portfolio;
