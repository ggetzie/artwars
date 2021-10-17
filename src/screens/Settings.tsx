import React from 'react';
import {View, Button} from 'react-native';

const Settings: React.FC<{
  navigation: any;
}> = ({navigation}) => {
  return (
    <View>
      <Button title="Home" onPress={() => navigation.navigate('Home')} />
    </View>
  );
};

export default Settings;
