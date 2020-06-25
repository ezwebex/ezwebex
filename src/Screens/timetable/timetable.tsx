import {MiscellaneousProps, ClassElement} from './interface';
import React, {useState, useEffect} from 'react';
import {
  Alert,
  SafeAreaView,
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import {FlatList, ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {dateToString} from './common';
import * as Keychain from 'react-native-keychain';

const style = StyleSheet.create({
  toCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timetableItem: {
    padding: 15,
    marginVertical: 10,
    backgroundColor: '#E7E7E7',
  },
  timetableName: {
    fontSize: 20,
  },
});
import axios from 'axios';
import {default as axiosCookieJarSupport} from 'axios-cookiejar-support';
import tough from 'tough-cookie';

axiosCookieJarSupport(axios);

const Timetable: React.FC<MiscellaneousProps> = (props: MiscellaneousProps) => {
  const navigation = props.navigation;

  const [getLoading, setLoading] = useState(true);
  const [getTimetable, setTimetable] = useState([]);

  const timetable: ClassElement[] = [];

  useEffect(() => {
    Keychain.getGenericPassword().then((credentials) => {
      if (!credentials) { 
        Alert.alert('로그인 정보가 없습니다. 로그인 페이지로 이동합니다.');
        navigation.navigate('Login');
        return;
      }

      (async () => {
        const jar = new tough.CookieJar();

        const username = credentials.username;
        const password = credentials.password;

        const resp = await axios.get(
          `https://att.gachon.ac.kr/ajax/PU_MNMN01_SVC/PU_MNMN01_LOGIN.do?USER_ID=${username}&USER_PW=${password}&isMobile=true&language=ko`,
          {
            jar: jar,
            withCredentials: true,
          },
        );
        const data = resp.data;
        if (!data.loginChk) {
          Alert.alert('로그인에 실패했습니다.');
          props.navigation.navigate("Login");
        }

        const timetableResult = await axios.get(
          `https://att.gachon.ac.kr/ajax/ST_SALA02_SVC/ST_SALA02_R01.do?FROM_YMD=${dateToString(props.date)}&DT=${dateToString(props.date)}`,
          {
            jar: jar,
            withCredentials: true,
          },
        );

        const json = timetableResult.data;

        if (!json.errmsg) {
          const dateStringJSON = dateToString(props.date).replace(/-/g, '');

          for (const subject of json) {
            let duplicate = false;
            for (const eachTimetable of timetable) {
              if (eachTimetable.id === subject.LECT_CD) {
                duplicate = true;
              }
            }
            if (duplicate) {
              continue;
            }

            if (dateStringJSON === subject.LECT_YMD) {
              timetable.push({
                name: subject.LECT_NM,
                date: subject.LECT_YMD,
                startTime: subject.FROM_HM,
                endTime: subject.TO_HM,
                id: subject.LECT_CD,
                professorCode: subject.PROF_NO,
                professorName: subject.PROF_NM,
              });
            }
          }
          console.warn('CALLED!');

          timetable.sort((a, b) => a.startTime - b.startTime);

          setTimetable(timetable);
          setLoading(false);
        } else {
          if (json.errmsg.includes('세션이 만료')) {
            Alert.alert('로그아웃 되었습니다. 로그인 페이지로 이동합니다.');
            navigation.navigate('Login');
          } else {
            Alert.alert('알 수 없는 에러가 발생했음!');
          }
        }
      })();
    });
  }, []);

  return getLoading ? (
    <View style={style.toCenter}>
      <ActivityIndicator size="large" />
    </View>
  ) : (
    <>
      {getTimetable.map((elem) => (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ClassInfo', {
              thisClass: elem,
            });
          }}>
          <View style={style.timetableItem}>
            <Text style={style.timetableName}>{elem.name}</Text>
            <Text>
              <Text>{elem.startTime}</Text> - <Text>{elem.endTime}</Text>
              <Text> / {elem.professorName} ({elem.professorCode})</Text>
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </>
  );
};

export default Timetable;
