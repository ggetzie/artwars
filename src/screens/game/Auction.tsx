import React from 'react';

import {View, Text, StyleSheet, FlatList} from 'react-native';

import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {GameTabParamList} from '.';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

import {ArtWork} from '../../util';
import {ArtItem, CloseButton} from '../../components';
import {useAppSelector} from '../../hooks';
import {filterArtWorks, selectCity} from '../../reducers/game';
import {ArtWorkFilter} from '../../util/awFilter';

type Props = BottomTabNavigationProp<GameTabParamList, 'Auction'>;

const AuctionStack = createNativeStackNavigator();
type AuctionStackParamList = {
  List: undefined;
  Detail: {artwork: ArtWork};
};

type DetailProps = NativeStackScreenProps<AuctionStackParamList, 'Detail'>;
type ListProps = NativeStackScreenProps<AuctionStackParamList, 'List'>;

const AuctionDetail = ({navigation, route}: DetailProps) => {
  const artwork = route.params.artwork;
  return (
    <View style={styles.container}>
      <CloseButton onPress={() => navigation.goBack()} />
      <ArtItem artwork={artwork} />
    </View>
  );
};

const AuctionList = ({navigation}: ListProps) => {
  const game = useAppSelector(state => state.game);
  const city = selectCity(game);
  const artworks = filterArtWorks(
    game,
    new ArtWorkFilter({auction: a => a === true, city: c => c === city}),
  );
  return (
    <View style={styles.container}>
      <FlatList
        renderItem={({item}) => (
          <ArtItem
            artwork={item}
            onPress={() => navigation.navigate('Detail', {artwork: item})}
          />
        )}
        data={artworks}
      />
    </View>
  );
};

const Auction = (_: Props) => {
  return (
    <AuctionStack.Navigator>
      <AuctionStack.Screen
        name={'List'}
        component={AuctionList}
        options={{headerShown: false}}
      />
      <AuctionStack.Screen
        name={'Detail'}
        component={AuctionDetail}
        options={{presentation: 'modal', headerShown: false}}
      />
    </AuctionStack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
  },
});

export default Auction;
