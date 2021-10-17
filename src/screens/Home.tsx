import React from 'react';
import {View, Button} from 'react-native';

const Home: React.FC<{
  navigation: any;
}> = ({navigation}) => {
  return (
    <View>
      <Button
        title="Settings"
        onPress={() => navigation.navigate('Settings')}
      />
    </View>
  );
};

export default Home;
