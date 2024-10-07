/* eslint-disable react/react-in-jsx-scope */
import {Image, StyleSheet, Text, View} from 'react-native';

const ImageViewer = ({imageUrl, name}) => {
  return (
    <View style={styles.boxImg}>
      {imageUrl && (
        <Image
          source={{uri: imageUrl}}
          style={{width: 150, height: 150}}
          resizeMode="contain"
        />
      )}
      <Text>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  boxImg: {
    width: 150,
  },
  textImg: {
    marginTop: 0,
    fontSize: 18,
    fontWeight: '400',
  },
});

export default ImageViewer;
