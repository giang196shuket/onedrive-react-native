import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  Image,
} from 'react-native';
const UserComponent = () => {
  const authState = useSelector(state => state.auth.user);
  console.log('user: ' + JSON.stringify(authState));

  const [avatar, setAvatar] = useState(null);
  useEffect(() => {
    if (authState) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64data = reader.result; // This is the base64 data for the image
        setAvatar(base64data); // Set the avatar state with base64 data
      };
      reader.readAsDataURL(authState.avatar); // Read the blob as data URL
    }
  }, [authState]);

  return  authState && (
    <View style={styles.container}>
      <Text style={styles.displayName}>{authState?.displayName}</Text>
      <Image
        source={{uri: avatar ? avatar : '', scale: 1}}
        style={{height: 100, width: 100}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 50,
    marginBottom: 50,
  },
  displayName: {
    color: 'black',
    fontSize: 25,
  },
});

export default UserComponent;
