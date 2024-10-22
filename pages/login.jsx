import React from 'react';
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {login} from '../redux/slice/authSlice';
import axios from 'axios';
import {authorize} from 'react-native-app-auth';
import {useDispatch} from 'react-redux';

// Nếu bạn muốn hỗ trợ cả cá nhân và doanh nghiệp: Sử dụng endpoint /common/.
// Nếu bạn chỉ muốn hỗ trợ người dùng doanh nghiệp: Sử dụng endpoint /organizations/.
// Nếu bạn chỉ muốn hỗ trợ người dùng cá nhân: Sử dụng endpoint /consumers/.
// Nếu bạn muốn giới hạn quyền truy cập theo tổ chức: Sử dụng endpoint /tenantId/.

const config = {
  issuer: 'https://login.microsoftonline.com/consumers/v2.0',
  clientId: 'ffca3086-8c7e-4d24-8368-de56b4cf33f2',
  redirectUrl: 'onedriver-react-native://react-native-auth/',
  scopes: ['Files.Read', 'Files.ReadWrite', 'User.Read', 'offline_access'], // offline_access giúp trả về refresh token
  serviceConfiguration: {
    authorizationEndpoint:
      'https://login.microsoftonline.com/consumers/oauth2/v2.0/authorize',
    tokenEndpoint:
      'https://login.microsoftonline.com/consumers/oauth2/v2.0/token',
  },
};

const Login = () => {
  const dispatch = useDispatch();

  // login OneDrive
  const onLogin = async () => {
    try {
      const result = await authorize(config);
      console.log('result: ' + JSON.stringify(result));

      const resUser = await axios.get('https://graph.microsoft.com/v1.0/me', {
        headers: {
          Authorization: `Bearer ${result.accessToken}`,
        },
      });

      const resAvatar = await axios.get(
        'https://graph.microsoft.com/v1.0/me/photo/$value',
        {
          headers: {
            Authorization: `Bearer ${result.accessToken}`,
          },
          responseType: 'blob', // Important! sẽ có lỗi nếu ng dùng chưa set avatar
        },
      );

      const userInfo = resUser.data; // Thông tin người dùng từ Microsoft Graph
      const avatarInfo = resAvatar.data; // avatar người dùng từ Microsoft Graph

      // Dispatch dữ liệu login vào store
      dispatch(
        login({
          accessToken: result.accessToken,
          refreshToken: result.refreshToken,
          user: {...userInfo, avatar: avatarInfo}, // LƯU có thông tin người dùng
        }),
      );
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require('../assets/icons/login.png')}
      />
      <TouchableOpacity
        style={styles.buttonLogin}
        title="Login to OneDrive"
        onPress={onLogin}>
        <Text style={styles.textLogin}>Login with OneDrive</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    height: '100%',
    gap:30
  },
  image:{
    width: 120,
    height: 120
  }, 
  buttonLogin: {
    backgroundColor: 'black',
    padding: 15,
    borderRadius: 20,
  },
  textLogin: {
    color: 'white',
    fontSize: 15,
  },
});

export default Login;
