/* eslint-disable react/react-in-jsx-scope */
import {Image, StyleSheet, Text, View} from 'react-native';

const ImageViewer = ({imageUrl, name}) => {
  return (
    <View style={styles.boxImg}>
      {imageUrl ? (
        <Image
          source={{uri: imageUrl}}
          style={{
            height: 80,
            width: 80,
          }}
          resizeMode="contain"
        />
      ) : (
        <Image
          source={require('../assets/icons/file.png')}
          style={{
            height: 80,
            width: 80,
          }}
          resizeMode="contain"
        />
      )}
      <Text>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  boxImg: {
    width: 250,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  textImg: {
    backgroundColor: '#EDEDED',
    maxWidth: 100,
    fontSize: 18,
    fontWeight: '400',
  },
});

export default ImageViewer;
