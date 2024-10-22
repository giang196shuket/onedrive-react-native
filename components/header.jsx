import React from 'react';
import {Image, StyleSheet, Text, useColorScheme, View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const Header = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: "white",
      }}>
      <Image
        style={styles.icon}
        source={require('../assets/icons/cloud.png')}
      />
      <Text style={styles.text}> OneDrive</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    height: 50,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    paddingBottom:10,
    borderBottomWidth: 1,
    borderBottomColor: '#DADADA',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  icon: {
    width: 40,
    height: 40,
  },
});

export default Header;
