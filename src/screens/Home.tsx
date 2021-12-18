import React from 'react';
import {View, Button} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '.';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const Home = ({navigation}: Props) => {
  return (
    <View>
      <Button title="New Game" onPress={() => navigation.navigate('NewGame')} />
      <Button
        title="Settings"
        onPress={() => navigation.navigate('Settings')}
      />
      <Button title="About" onPress={() => navigation.navigate('About')} />
    </View>
  );
};

export default Home;
