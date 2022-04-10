import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '.';
import BaseStyle from '../styles/base';
import {LinkButton} from '../components';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const Home = (_: Props) => {
  return (
    <View style={[BaseStyle.container, styles.menu]}>
      <LinkButton to={{screen: 'NewGame'}} style={styles.button}>
        <Text style={styles.menuText}>New Game</Text>
      </LinkButton>
      <LinkButton to={{screen: 'Continue'}} style={styles.button}>
        <Text style={styles.menuText}>Continue</Text>
      </LinkButton>
      <LinkButton to={{screen: 'HighScores'}} style={styles.button}>
        <Text style={styles.menuText}>High Scores</Text>
      </LinkButton>
      <LinkButton to={{screen: 'About'}} style={styles.button}>
        <Text style={styles.menuText}>About</Text>
      </LinkButton>
    </View>
  );
};

const styles = StyleSheet.create({
  menu: {
    justifyContent: 'space-around',
    marginVertical: '50%',
  },
  menuText: {
    color: 'white',
    fontSize: 18,
    textAlignVertical: 'center',
  },
  button: {
    backgroundColor: '#f57179',
    marginHorizontal: '10%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    height: 50,
  },
});

export default Home;
