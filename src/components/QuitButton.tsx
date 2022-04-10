import React from 'react';
import {StyleSheet} from 'react-native';
import {AWIcon} from '.';
import {LinkButton} from '.';

const QuitButton = () => (
  <LinkButton style={QuitButtonStyle.outer} to={{screen: 'Home'}}>
    <AWIcon name={'times-circle'} color={'red'} style={QuitButtonStyle.icon} />
  </LinkButton>
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
