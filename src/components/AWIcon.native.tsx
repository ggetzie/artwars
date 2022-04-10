import React from 'react';
import {StyleProp, TextStyle} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const AWIcon = ({
  name,
  color,
  style,
}: {
  name: string;
  color: string;
  style: StyleProp<TextStyle>;
}) => {
  return <FontAwesome5 name={name} color={color} style={style} />;
};

export default AWIcon;
