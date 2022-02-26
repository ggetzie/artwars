import React from 'react';
import {View, Text, Image} from 'react-native';
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
    <View style={{flexDirection: 'row', marginTop: 5}}>
      <Image source={NPCImages[image]} style={PicStyle.small} />
      <View
        style={{
          flex: 1,
          marginLeft: 3,
          borderStyle: 'solid',
          borderColor: 'dodgerblue',
          padding: 2,
          borderRadius: 5,
          borderWidth: 1,
        }}>
        <Text>{dialogue}</Text>
      </View>
    </View>
  );
};

export default NPCDialog;
