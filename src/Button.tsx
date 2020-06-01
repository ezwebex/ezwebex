import React from 'react';
import {TouchableOpacity, StyleSheet, View} from 'react-native';

interface ButtonProps {
  onPress: () => void;
}

const style = StyleSheet.create({
  customButton: {
    padding: 25,
    textAlign: 'center',
    backgroundColor: 'green',
    alignContent: 'center',
    marginVertical: 5
  },
  center: {
    alignSelf: 'center'
  }
})

const CustomButton: React.FC<ButtonProps> = (props) => {
  return (
    <>
      <TouchableOpacity style={style.customButton} onPress={props.onPress}>
        <View style={style.center}>{props.children}</View>
      </TouchableOpacity>
    </>
  );
};

export default CustomButton;
