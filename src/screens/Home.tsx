import React from 'react';
import {View, StyleSheet} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '.';
import BaseStyle from '../styles/base';
import {LinkButton} from '../components';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const Home = (_: Props) => {
  return (
    <View style={[BaseStyle.container, styles.menu]}>
      <LinkButton to={{screen: 'NewGame'}}>New Game</LinkButton>
      <LinkButton to={{screen: 'Continue'}}>Continue</LinkButton>
      <LinkButton to={{screen: 'HighScores'}}>High Scores</LinkButton>
      <LinkButton to={{screen: 'About'}}>About</LinkButton>
    </View>
  );
};

const styles = StyleSheet.create({
  menu: {
    justifyContent: 'space-around',
    marginVertical: '50%',
  },
});

export default Home;
