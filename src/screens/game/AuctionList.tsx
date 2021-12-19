import React from 'react';

import {View, Text} from 'react-native';

import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {GameTabParamList} from '.';

type Props = BottomTabNavigationProp<GameTabParamList, 'AuctionList'>;

const AuctionList = (_: Props) => {
  return (
    <View>
      <Text>Auction List</Text>
    </View>
  );
};

export default AuctionList;
