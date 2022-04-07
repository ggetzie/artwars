import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {NPCImages} from '../util';
import PicStyle from '../styles/pics';
import {NPCImageName} from '../util/types';

const NPCDialog = ({
  dialogue,
  image,
}: {
  dialogue: string;
  image: NPCImageName;
}) => {
  return (
    <View style={DialogStyle.outer}>
      <Image source={NPCImages[image]} style={PicStyle.small} />
      <View style={DialogStyle.inner}>
        <Text>{dialogue}</Text>
      </View>
    </View>
  );
};

const DialogStyle = StyleSheet.create({
  outer: {
    flexDirection: 'row',
    marginTop: 5,
  },
  inner: {
    flex: 1,
    marginLeft: 3,
    borderStyle: 'solid',
    borderColor: 'dodgerblue',
    padding: 2,
    borderRadius: 5,
    borderWidth: 1,
  },
});

export default NPCDialog;
