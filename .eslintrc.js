module.exports = {
  root: true,
  extends: '@react-native-community',
  rules: {
    'no-shadow': ['warn', {allow: ['_']}],
    'react-hooks/exhaustive-deps': ['warn'],
  },
};
