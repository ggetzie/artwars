import React from 'react';
import {View, TouchableOpacity, Platform} from 'react-native';
import {useLinkProps} from '@react-navigation/native';

const LinkButton = ({to, action, children, ...rest}: any) => {
  const {onPress, ...props} = useLinkProps({to, action});
  const {style} = rest;

  // const [isHovered, setIsHovered] = React.useState(false);

  if (Platform.OS === 'web') {
    return (
      <View
        onClick={onPress}
        // onMouseEnter={() => setIsHovered(true)}
        // onMouseLeave={() => setIsHovered(false)}
        style={style}
        {...props}
        {...rest}>
        {children}
      </View>
    );
  }

  return (
    <TouchableOpacity onPress={onPress} {...props} {...rest} style={style}>
      {children}
    </TouchableOpacity>
  );
};

export default LinkButton;
