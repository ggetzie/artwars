import React from 'react';
import {View, Text, StyleSheet, SectionList} from 'react-native';

import {useAppSelector} from '../../../hooks';
import {filterArtWorks, selectCity, selectPlayer} from '../../../reducers/game';
import {ArtWorkFilter} from '../../../util/awFilter';
import {Cities, ArtByCityItem, ArtWork} from '../../../util';
import {ArtItem} from '../../../components';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {PortfolioStackParamList} from '.';

type Props = NativeStackScreenProps<PortfolioStackParamList, 'List'>;

const List = ({navigation}: Props) => {
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

export default List;
