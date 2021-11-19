import React from 'react';
import {View, Button} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '.';

type Props = NativeStackScreenProps<RootStackParamList, 'Settings'>;

const Settings = ({navigation}: Props) => {
  return (
    <View>
      <Button title="Home" onPress={() => navigation.navigate('Home')} />
    </View>
  );
};

export default Settings;
