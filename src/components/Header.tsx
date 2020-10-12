import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

const Header: React.FC<{ title: string }> = ({ title }) => {
  return (
    <View style={styles.root}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#90CAF9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#222',
  },
});

export default Header;
