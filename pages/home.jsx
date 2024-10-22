/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import axios from 'axios';
import {useSelector} from 'react-redux';
import Wrapper from '../components/wrapper';
import ImageViewer from '../components/Image';
import {useIsFocused} from '@react-navigation/native';

function Home() {
  const [fileList, setFileList] = useState([]);
  const authState = useSelector(state => state.auth);
  const isFocused = useIsFocused();

  //  API OneDrive , get files
  async function getFiles() {
    try {
      const response = await axios.get(
        'https://graph.microsoft.com/v1.0/me/drive/root/children',
        {
          headers: {
            Authorization: `Bearer ${authState.accessToken}`,
          },
        },
      );
      // set File list
      setFileList(response.data.value);
      console.log('Files fetched:', response.data.value);
    } catch (error) {
      console.error('Error fetching files', error);
    }
  }
  useEffect(() => {
    if (authState.accessToken) {
      getFiles();
    } else {
      console.log('No access token available');
    }
  }, [authState]);

  //gọi lại khi focus vào home screen
  useEffect(() => {
    if (isFocused === true) {
      getFiles();
    }
  }, [isFocused]);

  return (
    <Wrapper>
      <View style={styles.container}>
        {fileList.length > 0 &&
          fileList.map((object, index) =>
            object.file && object.file.mimeType.startsWith('image/') ? (
              <ImageViewer
                key={index}
                imageUrl={object['@microsoft.graph.downloadUrl']}
                name={object.name}
              />
            ) : (
              <ImageViewer
                key={index}
                imageUrl={''}
                name={object.name}></ImageViewer>
            ),
          )}
      </View>
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
});

export default Home;
