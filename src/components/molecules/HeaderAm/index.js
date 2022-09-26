import { StyleSheet, Text, View, StatusBar, TouchableOpacity, Image } from 'react-native'
import React, {useEffect, useRef, useState} from 'react';
import FIREBASE from '../../../config/FIREBASE';


const HeaderAm = () => {
    const [imageUrl1, setImageUrl1] = useState();
    const pagesScrollRef = useRef(null);

    useEffect(() => {
        FIREBASE.database()
          .ref('headerAm/') //name in storage in firebase console
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
    <View style={styles.headerContainer}>
    <StatusBar
      barStyle="dark-content"
      backgroundColor={'transparent'}
      translucent
    />
    <TouchableOpacity
      onPress={() => {
        pagesScrollRef?.current?.scrollTo({
          y: 0,
          x: 0,
          animated: true,
        });
      }}
      activeOpacity={0.8}>
      <Image
        source={{uri: imageUrl1}}
        style={{flex: 1, width: 1200, height: 1200}}
        resizeMode="contain"
      />
    </TouchableOpacity>
  </View>
  )
}

export default HeaderAm

const styles = StyleSheet.create({
    headerContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '16%',
        width: '100%',
      },
      headerTitle: {
        fontSize: 24,
        color: '#FFFFFF',
        fontWeight: 'bold',
        letterSpacing: 2,
      },
})