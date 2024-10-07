/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {authorize, AuthorizeResult} from 'react-native-app-auth';
import axios from 'axios';
import ImageViewer from './components/Image';

//consumers for all of type Account ( business, personal..)
const config = {
  issuer: 'https://login.microsoftonline.com/consumers/v2.0',
  clientId: 'ffca3086-8c7e-4d24-8368-de56b4cf33f2',
  redirectUrl: 'onedriver-react-native://react-native-auth/',
  scopes: ['Files.Read', 'Files.ReadWrite', 'offline_access'],
  serviceConfiguration: {
    authorizationEndpoint:
      'https://login.microsoftonline.com/consumers/oauth2/v2.0/authorize',
    tokenEndpoint:
      'https://login.microsoftonline.com/consumers/oauth2/v2.0/token',
  },
};

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [authState, setAuthState] = useState(null);
  const [fileList, setFileList] = useState([]);

  // login OneDrive
  const onLogin = async () => {
    try {
      const result = await authorize(config);
      setAuthState(result);
      console.log('Login successful', result);
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  //  API OneDrive , get files
  const getFiles = async () => {
    if (authState && authState.accessToken) {
      try {
        const response = await axios.get(
          'https://graph.microsoft.com/v1.0/me/drive/root/children',
          {
            headers: {
              Authorization: `Bearer ${authState.accessToken}`,
            },
          },
        );
        setFileList(response.data.value);
        console.log('Files fetched:', response.data.value);
      } catch (error) {
        console.error('Error fetching files', error);
      }
    } else {
      console.log('No access token available');
    }
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View style={styles.sectionContainer}>
          {!authState && <Button title="Login to OneDrive" onPress={onLogin} />}
          <Button
            title="Get OneDrive Files"
            onPress={getFiles}
            disabled={!authState}
          />
          {fileList.length > 0 && (
            <View style={styles.sectionImg}>
              {fileList.map(
                (file, index) =>
                  file.file &&
                  file.file.mimeType.startsWith('image/') && (
                    <ImageViewer
                      key={index}
                      imageUrl={file['@microsoft.graph.downloadUrl']}
                      name={file.name}
                    />
                  ),
              )}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionImg: {
    marginTop: 30,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 25,
  },
});

export default App;
