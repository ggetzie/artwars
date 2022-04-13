import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import Buy from './Buy';
import List from './List';

import {GameTabParamList} from '..';

const ShopStack = createNativeStackNavigator();
type Props = BottomTabNavigationProp<GameTabParamList, 'Shop'>;

const Shop = (_: Props) => {
  return (
    <ShopStack.Navigator>
      <ShopStack.Screen name="List" component={List} />
      <ShopStack.Screen name="Buy" component={Buy} />
    </ShopStack.Navigator>
  );
};

export default Shop;
