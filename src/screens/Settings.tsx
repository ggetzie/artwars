import React from 'react';
import {View, Text} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '.';
import {LinkButton} from '../components';
import BaseStyle from '../styles/base';

type Props = NativeStackScreenProps<RootStackParamList, 'Settings'>;

const Settings = () => {
  return (
    <View>
      <LinkButton to={{screen: 'Home'}} style={BaseStyle.navButton}>
        <Text style={BaseStyle.navButtonText}>Home</Text>
      </LinkButton>
    </View>
  );
};

export default Settings;
