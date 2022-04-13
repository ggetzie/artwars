import React from 'react';
import {View, Button, StyleSheet} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '.';
import {useAppDispatch} from '../hooks';
import BaseStyle from '../styles/base';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const Home = ({navigation}: Props) => {
  return (
    <View style={[BaseStyle.container, styles.menu]}>
      <Button
        title="New Game"
        onPress={() => {
          navigation.navigate('NewGame');
        }}
      />
      <Button
        title="Continue"
        onPress={() => navigation.navigate('Continue')}
      />
      <Button
        title="High Scores"
        onPress={() => navigation.navigate('HighScores')}
      />
      <Button title="About" onPress={() => navigation.navigate('About')} />
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
