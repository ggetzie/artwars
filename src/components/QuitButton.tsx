import React from 'react';
import {TouchableOpacity} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const QuitButton = ({navigation}: {navigation: any}) => (
  <TouchableOpacity
    style={{maxWidth: 40}}
    onPress={() => navigation.navigate('Home')}>
    <FontAwesome5 name={'times-circle'} color={'red'} size={20} />
  </TouchableOpacity>
);

export default QuitButton;
