import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {AWIcon} from '.';

const QuitButton = ({navigation}: {navigation: any}) => (
  <TouchableOpacity
    style={QuitButtonStyle.outer}
    onPress={() => navigation.navigate('Home')}>
    <AWIcon name={'times-circle'} color={'red'} style={QuitButtonStyle.icon} />
  </TouchableOpacity>
);

const QuitButtonStyle = StyleSheet.create({
  outer: {
    maxWidth: 40,
  },
  icon: {
    fontSize: 20,
  },
});

export default QuitButton;
