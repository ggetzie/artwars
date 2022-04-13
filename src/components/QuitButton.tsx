import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const QuitButton = ({navigation}: {navigation: any}) => (
  <TouchableOpacity
    style={QuitButtonStyle.outer}
    onPress={() => navigation.navigate('Home')}>
    <FontAwesome5 name={'times-circle'} color={'red'} size={20} />
  </TouchableOpacity>
);

const QuitButtonStyle = StyleSheet.create({
  outer: {
    maxWidth: 40,
  },
});

export default QuitButton;
