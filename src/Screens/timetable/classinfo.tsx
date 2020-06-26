import React from 'react';
import {
  SafeAreaView,
  TextInput,
  StyleSheet,
  View,
  Text,
  Alert,
  Linking,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import * as Keychain from 'react-native-keychain';
import axios from 'axios';
import { ClassElement } from './interface';

function getQueryVariable(url: string, name: string) {
  var vars = url.split('&');
  for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split('=');
      if (decodeURIComponent(pair[0]) == name) {
          return decodeURIComponent(pair[1]);
      }
  }
  console.log('Query name %s not found', name);
}

const ClassInfo: React.FC = (props) => {
  const route = props.route;
  const thisClass: ClassElement = route.params.thisClass;

  return (
    <SafeAreaView>
      <View style={style.wrapper}>
        <Text style={style.title}>{thisClass.name}</Text>
        <Text style={style.professor}>{thisClass.professorName}</Text>
        <Text style={style.time}>{
          `${thisClass.startTime.slice(0, 2)}:${thisClass.startTime.slice(2,4)}`
        } ~ {
          `${thisClass.endTime.slice(0, 2)}:${thisClass.endTime.slice(2,4)}`
        }</Text>

        <View>
          <TouchableOpacity style={style.webexButton} onPress={
            async () => {
              console.log("start!");
              const profLinkURL = `https://webex.g-c.kr/api/get_link.php?name=${thisClass.professorName}`;
              const profLinkData = await axios.get(profLinkURL);
              //const data = await axios.get(`https://webex.g-c.kr/api/get_link.php?name=${thisClass.professorName}&code=${thisClass.professorCode}`);

              const profLinkJSON = profLinkData.data;
              if (!profLinkJSON.success) {
                Alert.alert("오류! 링크를 서버에서 가져오지 못했습니다!");
                return;
              }

              console.log(profLinkJSON);
              const meetURL = profLinkJSON.data;
              const webexQuery = await axios.get(meetURL, {
                headers: {
                  "User-Agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Mobile Safari/537.36"
                }
              });

              console.log(webexQuery);

              const processed = /var url = '(.+)&TS='/.exec(webexQuery.data);
              let tempURL = decodeURIComponent(processed[1].replace(/\\x/g,"%"));
              console.log(tempURL);

              const queryPart = tempURL.split("?")[1];
              const meetingKey = getQueryVariable(queryPart, "meetingKey");
              const ServerTS = getQueryVariable(queryPart, "ServerTS");
              const rnd = getQueryVariable(queryPart, "rnd");
              const TS = new Date().getTime();

              const webexLinkURL = tempURL+"&TS="+TS+"&CookieSupported=false";

              const webexLinkQuery = await axios.get(webexLinkURL, {
                headers: {
                  "User-Agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Mobile Safari/537.36"
                }
              });

              console.log(webexLinkQuery);

              const webexLinkIntentURLParsed = /<a href='wbx:\/\/(.+)' id=/.exec(webexLinkQuery.data);
              const webexLinkIntentURL = "wbx://"+webexLinkIntentURLParsed[1];

              console.warn(webexLinkIntentURL);

              const isWebexInstalled = await Linking.canOpenURL(webexLinkIntentURL);

              if (isWebexInstalled) {
                await Linking.openURL(webexLinkIntentURL);
              } else {
                Alert.alert("Webex 앱이 설치되어있지 않습니다!!");
              }
            }
          }>
            <Text>Webex 접속하기</Text>
          </TouchableOpacity>
        </View>


      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  wrapper: {
    padding: '10%',
  },
  title: {
    fontSize: 30,
    marginBottom: 10,
  },
  professor: {
    fontSize: 15,
    marginBottom: 5,
  },
  time: {
    marginBottom: 5,
  },
  webexButton: {
    backgroundColor: "#AAE",
    padding: 10,
    marginTop: 25,
  }
});

export default ClassInfo;
