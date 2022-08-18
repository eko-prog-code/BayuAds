import React, {useRef, useEffect, useState} from 'react';
import {StyleSheet, Text, View, ImageBackground} from 'react-native';
import {Ilustrasi, Logo} from '../../assets';
import {Button, Gap} from '../../components';
import FIREBASE from '../../config/FIREBASE';

const New = () => {
    const [imageUrl1, setImageUrl1] = useState(undefined);
    useEffect(() => {
        FIREBASE.database()
          .ref('InfoMenarik/') //name in storage in firebase console
          .once('value')
          .then(res => {
            console.log('image: ', res.val());
            if (res.val()) {
              setImageUrl1(res.val());
            }
          })
          .catch(Error => {
            showError;
          });
      }, []);

  return (
    <ImageBackground source={{uri: imageUrl1}} style={styles.page}>
    </ImageBackground>
  );
};

export default New;

const styles = StyleSheet.create({
  page: {
    padding: 40,
    justifyContent: 'space-between',
    backgroundColor: "#FFFFFF",
    flex: 1,
  },
  title: {
    fontSize: 28,
    marginTop: 91,
    color: "#FFFFFF",
  },
});
