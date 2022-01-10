import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {GameTabParamList} from '.';
import {
  setCity,
  selectCity,
  selectPlayer,
  selectBalance,
  currentHot,
  setHot,
  selectArtworks,
  isUnderInvestigation,
  setInvestigation,
  setArtworks,
} from '../../reducers/game';
import {Picker} from '@react-native-picker/picker';
import {
  Cities,
  randomCategory,
  Categories,
  CategoryName,
  randRange,
  diceRoll,
  randomChoiceR,
} from '../../util';
import {useAppDispatch, useAppSelector} from '../../hooks';

type Props = BottomTabNavigationProp<GameTabParamList, 'City'>;
interface AdjustmentMap {
  [index: CategoryName]: number;
}

function processTurn(): string[] {
  // randomly select new hot category
  // adjust artwork valuations
  // hot category artworks go up 1.5x - 3x (select random factor)
  // other categories change value 0.5x - 1.5x (select random for each)
  // random events occur that change prices of artwork in the player's portfolio
  // or cause other effects
  //  - suspected forgery: price 0.1x, 5% chance
  //  - IRS investigation: unable to relocate artworks: 5% chance to start, 33% chance to remove.
  //  - Fire: all artwork in that city destroyed: 0.5% chance
  //  - Theft: 1 artwork removed from portfolio: 1% chance
  //  - Artist has major museum retrospective: 5% chance, Artworks 1.5x
  //  - Artist declared problematic: 1% chance, Artworks 0.5x
  //  - Art repatriated: lose artwork 1% chance,
  let messages: string[] = [];
  let skipIds: number[] = [];
  const dispatch = useAppDispatch();
  const game = useAppSelector(state => state.game);
  let artworks = [...selectArtworks(game)];
  const player = selectPlayer(game);

  const portfolioIds = artworks
    .filter(artwork => artwork.owner === player)
    .map(artwork => artwork.id);

  // process events specific to player
  if (portfolioIds.length > 0) {
    // IRS investigation, start or lift
    const irs = isUnderInvestigation(game);
    if (irs) {
      if (diceRoll(0.33)) {
        setInvestigation(false);
        messages.push(
          "You're in the clear! Your tax fraud investigation has been cleared.",
        );
      } else {
        if (diceRoll(0.05)) {
          setInvestigation(true);
          messages.push(
            "Tax authorities have become suspicious of your dealings. You're unable to move artworks between cities.",
          );
        }
      }
    }
    // Fire?
    const hadAFire = diceRoll(0.005);
    if (hadAFire) {
      const playerCities = portfolioIds.map(awId => artworks[awId].city);
      const fireCity = randomChoiceR(playerCities);
      for (let id of portfolioIds) {
        if (artworks[id].city === fireCity) {
          artworks[id].destroyed = true;
          artworks[id].value = 0;
        }
      }
      messages.push(
        `Oh no! A fire in ${fireCity} destroyed your warehouse and all artworks there.`,
      );
    }

    // Theft?
    const hadATheft = diceRoll(0.01);
    if (hadATheft) {
      const nonDestroyed = portfolioIds.filter(
        awId => !artworks[awId].destroyed,
      );
      const stolen = randomChoiceR(nonDestroyed);
      artworks[stolen].owner = 'anon';
      messages.push(`A dastardly thief stole ${artworks[stolen].title}!`);
    }

    // Retrospective?
    const hadARetro = diceRoll(0.05);
    const playerArtists = portfolioIds.map(id => artworks[id].artist);
    if (hadARetro) {
      const selected = randomChoiceR(playerArtists);
      messages.push(
        `A major museum just announced a retrospective of ${selected}. Their work increased in value by 50%!`,
      );
      for (let aw of artworks) {
        if (aw.artist === selected) {
          aw.value = Math.round(aw.value * 1.5);
        }
      }
    }
    // Problematic?
    const problematic = diceRoll(0.01);
    if (problematic) {
      const selected = randomChoiceR(playerArtists);
      messages.push(
        `${selected} has been declared problematic! Their work decreased in value by 50%!`,
      );
      for (let aw of artworks) {
        if (aw.artist === selected) {
          aw.value = Math.round(aw.value * 0.5);
        }
      }
    }

    // Repatriated?
    const repatriated = diceRoll(0.01);
    if (repatriated) {
      const selected = randomChoiceR(portfolioIds);
      messages.push(
        `${artworks[selected].title} has been repatriated to its home country and returned to the rightful owners.`,
      );
      artworks[selected].owner = 'anon';
    }
  }
  // Update values for all
  const newHot = randomCategory();
  dispatch(setHot(newHot));
  // set category factors
  let adjustments: AdjustmentMap = {};
  for (let category of Object.keys(Categories)) {
    adjustments[category] =
      category === newHot ? randRange(1.5, 3) : randRange(0.5, 1.5);
  }
  for (let aw of artworks) {
    const factor = adjustments[aw.category];
    aw.value = aw.value * factor;
  }
  dispatch(setArtworks(artworks));
  return messages;
}

const City = (_: Props) => {
  const game = useAppSelector(state => state.game);
  const dispatch = useAppDispatch();
  const city = selectCity(game);
  const player = selectPlayer(game);
  const balance = selectBalance(game);
  const hot = currentHot(game);

  return (
    <View>
      <Text>Hello, {player}!</Text>
      <Text>Cash on hand: {balance}</Text>
      <Text>
        Welcome to {city}! <Text style={styles.hot}>{hot}</Text> artworks are SO
        HOT right now!
      </Text>
      <Picker
        accessibilityLabel="Change city"
        selectedValue={city}
        onValueChange={(itemValue, _) => dispatch(setCity(itemValue))}>
        {Object.entries(Cities).map(([k, v]) => (
          <Picker.Item key={k} label={v} value={v} />
        ))}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  hot: {
    color: 'red',
  },
});

export default City;
