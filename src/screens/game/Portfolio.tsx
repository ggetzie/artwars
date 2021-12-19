import React from 'react';
import {View, Text, Button, StyleSheet, SectionList} from 'react-native';

import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {GameTabParamList} from '.';

import {useAppSelector} from '../../hooks';
import {filterArtWorks, selectCity, selectPlayer} from '../../reducers/game';
import {RootStackParamList} from '..';
import {ArtWorkFilter} from '../../util/awFilter';
import {Cities, ArtByCityItem, ArtWork} from '../../util';

type Props = BottomTabNavigationProp<GameTabParamList, 'Portfolio'>;

const SectionItem = ({artwork}: {artwork: ArtWork}) => (
  <View style={styles.item}>
    <Text style={styles.itemText}>{artwork.title}</Text>
    <Text style={styles.itemText}>by: {artwork.artist}</Text>
    <Text style={styles.itemText}>Category: {artwork.category}</Text>
    <Text style={styles.itemText}>value: {artwork.value}</Text>
  </View>
);

const Portfolio = (_: Props) => {
  const game = useAppSelector(state => state.game);
  const city = selectCity(game);
  const player = selectPlayer(game);
  const ownedFilter = new ArtWorkFilter({owner: o => o === player});

  const otherCities = Object.values(Cities)
    .filter(c => c !== city)
    .sort();
  const citiesSorted = [city].concat(otherCities);

  const ownedArt = filterArtWorks(game, ownedFilter);
  const artByCity: ArtByCityItem[] = citiesSorted.map(c => ({
    title: c,
    data: [],
  }));
  for (const aw of ownedArt) {
    const index = citiesSorted.indexOf(aw.city);
    artByCity[index].data.push(aw);
  }

  return (
    <View>
      <SectionList
        sections={artByCity}
        keyExtractor={(item: ArtWork, _: number) => `${item.id}`}
        renderItem={({item}) => <SectionItem artwork={item} />}
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
