import React, { useState } from 'react';
import {SafeAreaView, StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import Timetable from './timetable';
import TodayDate from './date';
import { TextInput } from 'react-native-gesture-handler';

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

interface TimetableFormat {
  title: string;
  lectureCode: string;
  startTime: string;
  endTime: string;
  professorName: string;
  professorCode: number;
}

const DirectLink: React.FC = (props) => {
  const [professorName, setProfessorName] = useState('');

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
          placeholder="교수님 성함"
          onChangeText={(text) => {
            setProfessorName(text);
          }}
        />

        <TouchableOpacity>
          <View>
            <Text style={style.button}>접속</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default DirectLink;
