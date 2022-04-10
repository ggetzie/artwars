import React, {CSSProperties} from 'react';
import {StyleProp, TextStyle} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
  faBriefcase,
  faCity,
  faUserTie,
  faGavel,
  faStore,
  faQuestion,
  faTimesCircle,
} from '@fortawesome/free-solid-svg-icons';
const IconMap = new Map();
IconMap.set('city', faCity);
IconMap.set('briefcase', faBriefcase);
IconMap.set('user-tie', faUserTie);
IconMap.set('gavel', faGavel);
IconMap.set('store', faStore);
IconMap.set('question', faQuestion);
IconMap.set('times-circle', faTimesCircle);
const AWIcon = ({
  name,
  color,
  style,
}: {
  name: string;
  color: string;
  style: StyleProp<TextStyle>;
}) => {
  return (
    <FontAwesomeIcon
      icon={IconMap.get(name)}
      color={color}
      style={style as CSSProperties}
    />
  );
};

export default AWIcon;
