import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Image, ImageBackground} from 'react-native';
import FIREBASE from '../../config/FIREBASE';
import PushNotification from 'react-native-push-notification';
import NotifService from '../../../NotifService';
import handler from '../../../NotificationHandler';

const Filter = ({ navigation }) => {
  const [pushNotification, setPushNotification] = useState(false);

  useEffect(() => {
    getPushNotification();
  }, []);

  const getPushNotification = () => {
    if (!pushNotification) {
      setPushNotification(true);
    }
  };

  useEffect(() => {
    const unsubscribe = FIREBASE.auth().onAuthStateChanged((user) => {
      setTimeout(() => {
        if (user) {
          navigation.replace("Opsi");
        } else {
          navigation.replace("Register");
        }
      }, 3000);
      PushNotification.localNotification({
        channelId: 'bayukartamobile',
        message: ' Health_tech (RS Bayukarta Mobile Apps)', // (required)
        date: new Date(Date.now() + 1 * 1000), // in 60 secs
      });
    });

    return () => unsubscribe();
  }, [navigation]);

  return (
    <ImageBackground
      source={require('../../assets/ILopening.jpeg')}
      style={styles.page}></ImageBackground>
  );
};

export default Filter;

const styles = StyleSheet.create({
    page: {
        padding: 40,
        justifyContent: 'space-between',
        backgroundColor: '#FFFFFF',
        flex: 1,
      },
      title: {
        fontSize: 20,
        fontFamily: '#0000FF',
        color: '#0000FF',
        marginTop: 20,
      },
      line: {
        fontSize: 14,
        fontFamily: '#0000FF',
        color: '#0000FF',
        marginTop: 20,
      },
    });
