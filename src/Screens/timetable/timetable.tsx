import {DateProps} from './interface';
import React, {useState, useEffect} from 'react';
import {
  Alert,
  SafeAreaView,
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import {dateToString} from './common';

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

const Timetable: React.FC<DateProps> = (props: DateProps) => {
  const navigation = props.navigation;

  const [getLoading, setLoading] = useState(true);
  const [getTimetable, setTimetable] = useState([]);

  const timetable = [];
  useEffect(() => {
    fetch(
      'https://att.gachon.ac.kr/ajax/ST_SALA02_SVC/ST_SALA02_R01.do?FROM_YMD=' +
        dateToString(props.date) /* + '&DT=' + dateToString(props.date)*/,
      {
        method: 'POST',
        headers: {
          Cookie:
            'SCOUTER AND JSESSION ID by GENERATING IT',
        },
      },
    )
      .then((res) => res.json())
      .then((json) => {
        if (!json.errmsg) {
          const dateStringJSON = dateToString(props.date).replace(/-/g, '');

          console.warn(json);
          for (const subject of json) {
            let duplicate = false;
            for (const eachTimetable of timetable) {
              if (eachTimetable.id === subject.LECT_CD) { duplicate = true; }
            }
            if (duplicate) continue;

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

          setTimetable(timetable);
          setLoading(false);
        } else {
          Alert.alert(json.errmsg);
        }
      });
  }, []);

  return getLoading ? (
    <View style={style.toCenter}>
      <ActivityIndicator size="large" />
    </View>
  ) : (
    <>
      {getTimetable.map((elem) => (
        <View style={style.timetableItem}>
          <Text style={style.timetableName}>{elem.name}</Text>
          <Text>
            <Text>{elem.startTime}</Text> - <Text>{elem.endTime}</Text>
            <Text> / {elem.professorName}</Text>
          </Text>
        </View>
      ))}
    </>
  );
};

export default Timetable;
