/* eslint-disable react/no-unstable-nested-components */
import React, {useState} from 'react';
import {Provider, useSelector} from 'react-redux';
import Home from './pages/home';
import {store} from './redux/store';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import User from './pages/user';
import {Image, StyleSheet, Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './pages/login';
import Header from './components/header';

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();
function MainTabs() {
  return (
    <>
      <Header />
      <Tab.Navigator
        screenOptions={({route}) => ({
          headerShown: false,
          tabBarStyle: {
            paddingBottom: 20, // Adjust the value as needed
            paddingTop: 10,
            height: 80,
          },
          tabBarItemStyle: {
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 0, // Điều chỉnh khoảng cách theo chiều dọc
          },
        })}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            // eslint-disable-next-line react/no-unstable-nested-components
            tabBarIcon: ({color, size}) => (
              <Image
                style={styles.icon}
                source={require('./assets/icons/home.png')}
              />
            ),
            tabBarLabel: ({focused}) => (
              <Text
                // eslint-disable-next-line react-native/no-inline-styles
                style={{
                  color: focused ? 'black' : 'gray',
                  fontWeight: focused ? 'bold' : 'normal',
                }}>
                Home
              </Text>
            ),
          }}
        />
        <Tab.Screen
          name="User"
          component={User}
          options={{
            // eslint-disable-next-line react/no-unstable-nested-components
            tabBarIcon: ({color, size}) => (
              <Image
                style={styles.icon}
                source={require('./assets/icons/user.png')}
              />
            ),
            tabBarLabel: ({focused}) => (
              // eslint-disable-next-line react-native/no-inline-styles
              <Text
                // eslint-disable-next-line react-native/no-inline-styles
                style={{
                  color: focused ? 'black' : 'gray',
                  fontWeight: focused ? 'bold' : 'normal',
                }}>
                User
              </Text>
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
}
function AppNavigator() {
  const authState = useSelector(state => state.auth);

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {!authState.isLoggedIn ? (
        <Stack.Screen name="Login" component={Login} />
      ) : (
        <Stack.Screen name="MainApp" component={MainTabs} />
      )}
    </Stack.Navigator>
  );
}
function RootApp() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  icon: {
    width: 20,
    height: 20,
  },
});

export default RootApp;
