import React from 'react';
import {View, Text, Button, StyleSheet, SectionList} from 'react-native';

import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {GameTabParamList} from '..';

import {useAppSelector} from '../../../hooks';
import {filterArtWorks, selectCity, selectPlayer} from '../../../reducers/game';
import {ArtWorkFilter} from '../../../util/awFilter';
import {Cities, ArtByCityItem, ArtWork} from '../../../util';
import {ArtItem, CloseButton} from '../../../components';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: StatusBar.currentHeight,
    marginHorizontal: 16,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
  },
  header: {
    fontSize: 32,
    backgroundColor: '#fff',
  },
  itemText: {
    fontSize: 16,
  },
});

export default Portfolio;
