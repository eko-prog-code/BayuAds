import React, {useCallback, useState, useEffect} from 'react';
import {
  ActivityIndicator,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  StatusBar,
  Image,
  FlatList,
} from 'react-native';
import {HomeProfile, Loading} from '../../components';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import FIREBASE from '../../config/FIREBASE';
import {colors, fonts, getData, numberWithCommas} from '../../utils';
import {ILNullPhoto} from '../../assets';
import {useFocusEffect, useNavigation} from '@react-navigation/core';
import CurrencyFormatter from 'react-native-currency-formatter';

const CardAntrian = () => {
  const navigation = useNavigation();
  const [userHomeData, setUserHomeData] = useState({});
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({
    avatar: ILNullPhoto,
    nama: '',
  });

  useEffect(() => {
    getUserData();
  }, []);

  useFocusEffect(
    useCallback(() => {
      FIREBASE.auth().onAuthStateChanged(async data => {
        if (data) {
          getUserHomeData(data.uid);
        } else {
          AsyncStorage.clear();
        }
      });
    }, []),
  );

  const getUserData = () => {
    getData('user')
      .then(res => {
        const data = res;
        let arr = [];
        data?.image?.filter(val => val).map(val => arr.push({url: val}));
        setProfile(res);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  const getUserHomeData = uid => {
    FIREBASE.database()
      .ref('users/' + uid)
      .on('value', snapshot => {
        if (snapshot.val()) {
          setUserHomeData(snapshot.val());
        }
      });
  };

  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      style={{borderRadius: 15, marginTop: 10}}
      colors={['#DFF5FE', '#DFF5FE', '#DFF5FE']}>
      {loading && <Loading />}
      <View
        style={{
          padding: 10,
          borderRadius: 15,
        }}>
        <HomeProfile />
        <Text style={{color: '#000000'}}>Nomor Antrian Appoitment:</Text>
        <Text
          style={{
            color: '#000000',
            fontSize: 14,
            marginTop: 4,
          }}>
          {userHomeData !== null ? userHomeData.appo1 : 0}
        </Text>
        <Text
          style={{
            color: '#000000',
            fontSize: 14,
            marginTop: 4,
          }}>
          {userHomeData !== null ? userHomeData.appo2 : 0}
        </Text>
        <Text
          style={{
            color: '#000000',
            fontSize: 14,
            marginTop: 4,
          }}>
          {userHomeData !== null ? userHomeData.appo3 : 0}
        </Text>
        <Text
          style={{
            color: '#000000',
            fontSize: 14,
            marginTop: 4,
          }}>
          {userHomeData !== null ? userHomeData.appo4 : 0}
        </Text>
        <View style={{flexDirection: 'row'}}>
          <View style={{marginTop: 4}}>
            <Text style={{color: '#1908DD', fontStyle: 'italic', fontSize: 12}}>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Image
                source={require('../../assets/user.png')}
                style={styles.user}
                resizeMode={'contain'}
              />
              <Text style={styles.member}>Akun</Text>
            </TouchableOpacity>
            </Text>
          </View>

          <View
            style={{
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
              flex: 1,
            }}>
            <TouchableOpacity onPress={() => navigation.navigate('Filter')}>
          <Image
            source={require('../../assets/Appo.png')}
            style={styles.chat}
            resizeMode={'contain'}
          />
          <Text style={styles.keluar}>Daftar Klinik</Text>
        </TouchableOpacity>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  user: {
    height: 70,
    width: 70,
    // width: Dimensions.get('screen').width - 40,
    marginBottom: 2,
    alignItems: "center"
    // paddingLeft: 200,
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  member: {
    color: '#000000',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  chat: {
    width: 70,
    height: 72,
    resizeMode: 'contain',
    marginBottom: 2,
    borderRadius: 20,
  },
  keluar: {
    textAlign: 'center',
    color: '#000000',
    fontWeight: 'bold',
  },
});


export default CardAntrian;
