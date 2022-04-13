import React from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {View, StyleSheet, GestureResponderEvent} from 'react-native';

export default function CloseButton({
  onPress,
}: {
  onPress: (event: GestureResponderEvent) => void;
}) {
  return (
    <View>
      <FontAwesome5.Button
        name={'times-circle'}
        onPress={onPress}
        style={styles.close}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  close: {
    alignSelf: 'flex-end',
  },
});
