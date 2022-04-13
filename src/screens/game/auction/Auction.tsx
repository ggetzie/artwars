import React from 'react';

import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {GameTabParamList} from '..';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Buy from './Buy';
import List from './List';
import SellSelect from './SellSelect';
import Sell from './Sell';
import {useAppSelector} from '../../../hooks';
import {selectCity} from '../../../reducers/game';
type Props = BottomTabNavigationProp<GameTabParamList, 'Auction'>;

const AuctionStack = createNativeStackNavigator();

const Auction = (_: Props) => {
  const game = useAppSelector(state => state.game);
  const city = selectCity(game);
  return (
    <AuctionStack.Navigator>
      <AuctionStack.Screen
        name={'List'}
        component={List}
        options={{title: `Art for auction in ${city}`}}
      />
      <AuctionStack.Screen
        name={'Buy'}
        component={Buy}
        options={{presentation: 'modal'}}
      />
      <AuctionStack.Screen
        name={'SellSelect'}
        component={SellSelect}
        options={{title: 'Select a work to sell at auction'}}
      />
      <AuctionStack.Screen
        name={'Sell'}
        component={Sell}
        options={{presentation: 'modal', title: 'Sell'}}
      />
    </AuctionStack.Navigator>
  );
};

export default Auction;
