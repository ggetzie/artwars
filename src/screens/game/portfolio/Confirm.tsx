import React, {useEffect} from 'react';
import {View, Text, Button, StyleSheet, SectionList} from 'react-native';

import {useAppSelector} from '../../../hooks';
import {currentHot} from '../../../reducers/game';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {PortfolioStackParamList} from '.';
import BaseStyle from '../../../styles/base';

type Props = NativeStackScreenProps<PortfolioStackParamList, 'Confirm'>;

const Confirm = ({navigation, route}: Props) => {
  const {artwork, destination, duty} = route.params;

  return (
    <View style={BaseStyle.container}>
      <Text>Confirm screen</Text>
    </View>
  );
};
