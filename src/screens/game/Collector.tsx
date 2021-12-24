import React, {useState} from 'react';
import {View, Text, Button, FlatList, Modal, TextInput} from 'react-native';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {GameTabParamList} from '.';

import {useAppSelector} from '../../hooks';
import {
  currentNPC,
  filterArtWorks,
  selectCity,
  selectNPC,
  selectPlayer,
  // selectPlayer,
} from '../../reducers/game';

import {ArtWorkFilter} from '../../util/awFilter';
import {ArtWork} from '../../util';
import {ArtItem} from '../../components';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

type Props = BottomTabNavigationProp<GameTabParamList, 'Collector'>;

const CollectorStack = createNativeStackNavigator();
type CollectorStackParamList = {
  List: undefined;
  Offer: {artwork: ArtWork};
};

type OfferProps = NativeStackScreenProps<CollectorStackParamList, 'Offer'>;
type ListProps = NativeStackScreenProps<CollectorStackParamList, 'List'>;

const Offer = ({navigation, route}: OfferProps) => {
  const artwork = route.params.artwork;
  const value = artwork.value.toLocaleString('en-US');
  const game = useAppSelector(state => state.game);
  const player = selectPlayer(game);
  return (
    <View>
      <Text>{artwork.title}</Text>
      <Text>Value: ${value}</Text>
      <TextInput placeholder="Enter offer amount" keyboardType="numeric" />
      <Button title="Make Offer" />
      <Button title="Cancel" onPress={() => navigation.goBack()} />
    </View>
  );
};

const CollectorList = ({navigation}: ListProps) => {
  const game = useAppSelector(state => state.game);
  const npc = currentNPC(game);
  const artworks = filterArtWorks(
    game,
    new ArtWorkFilter({owner: o => o === npc.name}),
  );
  // const player = selectPlayer(game);
  return (
    <View>
      <View>
        <Text>{npc.bio}</Text>
        <Text>Likes: {npc.preference}</Text>
      </View>
      <View>
        <Text>Collection</Text>
        <FlatList
          data={artworks}
          renderItem={({item}) => (
            <ArtItem
              artwork={item}
              onPress={() => navigation.navigate('Offer', {artwork: item})}
            />
          )}
        />
      </View>
    </View>
  );
};

const Collector = (_: Props) => {
  return (
    <CollectorStack.Navigator>
      <CollectorStack.Screen
        name="List"
        component={CollectorList}
        options={{headerShown: false}}
      />
      <CollectorStack.Screen
        name="Offer"
        component={Offer}
        options={{presentation: 'modal', headerShown: false}}
      />
    </CollectorStack.Navigator>
  );
};

export default Collector;
