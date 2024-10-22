import React from 'react';
import {Text, View} from 'react-native';
import Wrapper from '../components/wrapper';
import UserComponent from '../components/user';

const User = () => {
  return (
    <Wrapper>
      <View>
        <UserComponent />
      </View>
    </Wrapper>
  );
};

export default User;
