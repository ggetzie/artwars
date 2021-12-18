import React from 'react';
import {View, Text, Linking, StyleSheet} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '.';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const About = (_: Props) => {
  return (
    <View>
      <Text>Developed by </Text>
      <Text
        style={styles.link}
        onPress={() => Linking.openURL('https://kotsf.com')}>
        Kotsf Limited
      </Text>
      <Text>in collaboration with </Text>
      <Text
        style={styles.link}
        onPress={() => Linking.openURL('https://msteinberg.art')}>
        Monica Steinberg
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  link: {
    color: 'blue',
  },
  container: {
    flex: 1,
    // paddingTop: StatusBar.currentHeight,
    marginHorizontal: 16,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
  },
  header: {
    fontSize: 32,
    backgroundColor: '#fff',
  },
  itemText: {
    fontSize: 16,
  },
});

export default About;
