import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  StatusBar,
  Linking,
} from 'react-native';
import FIREBASE from '../../config/FIREBASE';
import PushNotification from 'react-native-push-notification';
import NotifService from '../../../NotifService';
import handler from '../../../NotificationHandler';
import {FloatingIcon, PopupPoint, Gap, Link} from '../../components';

const Splash = ({navigation}) => {
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
    const unsubscribe = FIREBASE.auth().onAuthStateChanged(user => {
      setTimeout(() => {
        {
          navigation.replace('MainApp');
        }
      }, 4500);
      PushNotification.localNotification({
        channelId: 'bayukartamobile',
        message: ' Health_tech (RS Bayukarta Mobile Apps)', // (required)
        date: new Date(Date.now() + 1 * 1000), // in 60 secs
      });
    });

    return () => unsubscribe();
  }, [navigation]);

  return (
    <>
      <ImageBackground
        source={require('../../assets/ILopening.jpeg')}
        style={styles.page}>
        <StatusBar barStyle="dark-content" backgroundColor={"transparent"} translucent/>
      </ImageBackground>
      <Link
        title="Software Engineer"
        size={16}
        position-="absolute"
        bottom={20}
        align="center"
        onPress={() => Linking.openURL('https://wa.me/+62895600394345')}
      />
    </>
  );
};

export default Splash;

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
