import React from 'react';
import {
  SafeAreaView,
  TextInput,
  StyleSheet,
  View,
  Text,
  Alert,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import * as Keychain from 'react-native-keychain';
import axios from 'axios';

const Login: React.FC = (props) => {
  const login = async () => {
    const resp = await axios.get(
      `https://att.gachon.ac.kr/ajax/PU_MNMN01_SVC/PU_MNMN01_LOGIN.do?USER_ID=${username}&USER_PW=${password}&isMobile=true&language=ko`,
    );
    const data = resp.data;
    if (data.loginChk) {
      await Keychain.setGenericPassword(username, password);
      Alert.alert('로그인 되었습니다.');
      props.navigation.reset({
        index: 0,
        routes: [{name: 'Main'}],
      });
    } else {
      Alert.alert('비밀번호가 틀렸습니다.');
    }
  };

  const [username, onUsername] = React.useState('');
  const [password, onPassword] = React.useState('');

  return (
    <SafeAreaView>
      <View style={style.wrapper}>
        <Text style={style.margin_bottom}>
          가천대학교 아이디로 로그인 하세요.
        </Text>
        <TextInput
          style={style.input}
          autoCapitalize="none"
          autoCompleteType="username"
          textContentType="username"
          placeholder="아이디"
          onChangeText={(username) => onUsername(username)}
        />
        <TextInput
          style={style.input}
          autoCapitalize="none"
          autoCompleteType="password"
          textContentType="password"
          secureTextEntry={true}
          placeholder="패스워드"
          onChangeText={(password) => onPassword(password)}
        />
        <TouchableOpacity onPress={login}>
          <View>
            <Text style={style.button}>로그인</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  wrapper: {
    padding: '10%',
  },
  input: {
    borderColor: '#000000',
    borderWidth: 1,
    fontSize: 40,
    height: 60,
    padding: 10,
    marginBottom: 20,
  },
  margin_bottom: {
    marginBottom: 20,
  },
  button: {
    padding: 15,
    fontSize: 20,
    textAlign: 'center',
    backgroundColor: '#AAAAFF',
  },
});

export default Login;
