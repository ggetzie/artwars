import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Platform} from 'react-native';
import {useLinkProps} from '@react-navigation/native';

const LinkButtonStyle = StyleSheet.create({
  outer: {
    backgroundColor: '#f57179',
    marginHorizontal: '10%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    height: 50,
  },
  text: {
    color: 'white',
    fontSize: 18,
    textAlignVertical: 'center',
  },
});

const LinkButton = ({to, action, children, ...rest}: any) => {
  const {onPress, ...props} = useLinkProps({to, action});

  // const [isHovered, setIsHovered] = React.useState(false);

  if (Platform.OS === 'web') {
    return (
      <View
        onClick={onPress}
        // onMouseEnter={() => setIsHovered(true)}
        // onMouseLeave={() => setIsHovered(false)}
        style={LinkButtonStyle.outer}
        {...props}
        {...rest}>
        <Text style={LinkButtonStyle.text}>{children}</Text>
      </View>
    );
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      {...props}
      {...rest}
      style={LinkButtonStyle.outer}>
      <Text style={LinkButtonStyle.text}>{children}</Text>
    </TouchableOpacity>
  );
};

export default LinkButton;
