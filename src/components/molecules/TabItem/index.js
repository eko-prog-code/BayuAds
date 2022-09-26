import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { WARNA_SEKUNDER, WARNA_UTAMA } from '../../../utils/colors';
import { IconHome, IconHomeActive, IconInformasi, IconInformasiActive, IconNotif, IconNotifActive} from './../../../assets'

const TabItem = ({label, isFocused, onLongPress, onPress}) => {

    const Icon = () =>{
        if(label === "Home") {
            return isFocused ? <IconHomeActive/> : <IconHome />;
        }
        if(label === "Informasi") {
            return isFocused ? <IconInformasiActive/> : <IconInformasi />;
        }
        if(label === "Notif") {
            return isFocused ? <IconNotifActive/> : <IconNotif />;
        }
    }
  return (
    <TouchableOpacity
      onPress={onPress}
      onLongPress={onLongPress}
      style={isFocused ? styles.containerFocus : styles.container}>
          <Icon />
          {isFocused && <Text style={styles.text}>
          {label.toUpperCase()}</Text>}
    </TouchableOpacity>
  );
};

export default TabItem;

const styles = StyleSheet.create({
    container: {
        alignContent: 'center',
        padding: 5,
        width: '33%',
        alignItems: 'center',
    },
    containerFocus: {
        alignContent: 'center',
        padding: 5,
        flexDirection: 'row',
        width: '33%',
        alignItems: 'center',
    },
    text: {
        color: '#2447F9',
        fontSize: 13,
     fontWeight: 'bold',
        marginLeft: 8,
    }
});
