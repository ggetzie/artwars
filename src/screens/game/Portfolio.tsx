import React from 'react';
import {View, Text, Button, StyleSheet, SectionList} from 'react-native';

import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {GameTabParamList} from '.';

import {useAppSelector} from '../../hooks';
import {filterArtWorks, selectCity, selectPlayer} from '../../reducers/game';
import {ArtWorkFilter} from '../../util/awFilter';
import {Cities, ArtByCityItem, ArtWork} from '../../util';
import {ArtItem, CloseButton} from '../../components';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

type Props = BottomTabNavigationProp<GameTabParamList, 'Portfolio'>;

const PortfolioStack = createNativeStackNavigator();
type PortfolioStackParamList = {
  List: undefined;
  Detail: {artwork: ArtWork};
};

type DetailProps = NativeStackScreenProps<PortfolioStackParamList, 'Detail'>;
type ListProps = NativeStackScreenProps<PortfolioStackParamList, 'List'>;

const PortfolioDetail = ({navigation, route}: DetailProps) => {
  const artwork = route.params.artwork;
  return (
    <View style={styles.container}>
      <CloseButton onPress={() => navigation.goBack()} />
      <ArtItem artwork={artwork} />
    </View>
  );
};

const PortfolioList = ({navigation}: ListProps) => {
  const game = useAppSelector(state => state.game);
  const city = selectCity(game);
  const player = selectPlayer(game);
  const ownedFilter = new ArtWorkFilter({owner: o => o === player});

  const otherCities = Object.values(Cities)
    .filter(c => c !== city)
    .sort();
  const citiesSorted = [city].concat(otherCities);

  const ownedArt = filterArtWorks(game, ownedFilter);
  const totalValue = ownedArt.map(aw => aw.value).reduce((p, c) => p + c, 0);
  const artByCity: ArtByCityItem[] = citiesSorted.map(c => ({
    title: c,
    data: [],
  }));
  for (const aw of ownedArt) {
    const index = citiesSorted.indexOf(aw.city);
    artByCity[index].data.push(aw);
  }

  return (
    <View style={styles.container}>
      <Text>Portfolio Value: ${totalValue.toLocaleString('en-US')}</Text>
      <SectionList
        sections={artByCity}
        keyExtractor={(item: ArtWork, _: number) => `${item.id}`}
        renderItem={({item}) => (
          <ArtItem
            artwork={item}
            onPress={() => navigation.navigate('Detail', {artwork: item})}
          />
        )}
        renderSectionHeader={({section}) => (
          <>
            <Text style={styles.header}>{section.title}</Text>
            {section.data.length === 0 && (
              <Text style={styles.itemText}>No Art in this City</Text>
            )}
          </>
        )}
      />
    </View>
  );
};

const Portfolio = (_: Props) => {
  return (
    <PortfolioStack.Navigator>
      <PortfolioStack.Screen
        name={'List'}
        component={PortfolioList}
        options={{headerShown: false}}
      />
      <PortfolioStack.Screen
        name={'Detail'}
        component={PortfolioDetail}
        options={{presentation: 'modal', headerShown: false}}
      />
    </PortfolioStack.Navigator>
  );
};

const styles = StyleSheet.create({
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

export default Portfolio;
