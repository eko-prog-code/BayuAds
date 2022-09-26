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
  Dimensions,
  Linking,
} from 'react-native';
import {HomeProfile, Loading, ButtonIcon} from '../../components';
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
    <View style={styles.container}>
          <View style={styles.WrapperFiturUtama}>

            <View style={styles.group}>
            <TouchableOpacity onPress={() => navigation.navigate('Jadwal')}>
            <HomeProfile style={styles.imagefiturUtama} numberOfLines={1}/>

            </TouchableOpacity>
            </View>

            <View style={styles.group}>
            <TouchableOpacity onPress={() => navigation.navigate('Jadwal')}>
            <Image style={styles.imagefiturUtama} source={require('../../assets/jadwalDok.png')}/>
            <Text style={styles.textfiturUtama}>Jadwal Dokter</Text>
            </TouchableOpacity>
            </View>

            <View style={styles.group}>
            <TouchableOpacity onPress={() => navigation.navigate('Filter')}>
            <Image style={styles.imagefiturUtama} source={require('../../assets/daftarOnline.png')}/>
            <Text style={styles.textfiturUtama}>Daftar Online</Text>
            </TouchableOpacity>
            </View>

            <View style={styles.group}>
            <TouchableOpacity onPress={() => navigation.navigate('Antrian')}>
            <Image style={styles.imagefiturUtama} source={require('../../assets/antrianIcon.png')}/>
            <Text style={styles.textfiturUtama}>Antrian</Text>
            </TouchableOpacity>
            </View>




            <View style={styles.group}>
            <TouchableOpacity>
            <Image style={styles.imagefiturUtama} source={require('../../assets/infoRs.png')}/>
            <Text style={styles.textfiturUtama}>Informasi RS</Text>
            </TouchableOpacity>
            </View>

            <View style={styles.group}>
            <TouchableOpacity onPress={() => Linking.openURL('https://wa.me/+628111987676')}>
            <Image style={styles.imagefiturUtama} source={require('../../assets/LayananPengaduan.png')}/>
            <Text style={styles.textfiturUtama} numberOfLines={1}>Layanan Pengaduan</Text>
            </TouchableOpacity>
            </View>

            <View style={styles.group}>
            <TouchableOpacity onPress={() => Linking.openURL('https://wa.me/+628111120775')}>
            <Image style={styles.imagefiturUtama} source={require('../../assets/chatSehat2.png')}/>
            <Text style={styles.textfiturUtama}>Chat Sehat</Text>
            </TouchableOpacity>
            </View>

            <View style={styles.group}>
            <TouchableOpacity onPress={() => Linking.openURL('https://wa.me/+628111199968')}>
            <Image style={styles.imagefiturUtama} source={require('../../assets/InfoCenterr.png')}/>
            <Text style={styles.textfiturUtama} numberOfLines={1}>Information Center</Text>
            </TouchableOpacity>
            </View>
        </View>
    </View>
  );
};


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: 220,
    padding: 6,
    marginHorizontal: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    marginTop: -windowHeight * 0.008,
    flexDirection: 'row',
  },
  WrapperFiturUtama: {
    flexDirection: 'row',
    flex: 1,
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 5,
    paddingRight: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  group: {
    alignItem: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    marginLeft: 10,
    width: 64,
  },
  textfiturUtama: {
    marginTop: 4,
    fontSize: 10, 
    textAlign: 'center',
    justifyContent: 'center',
  },
  imagefiturUtama: {
    width: 60,
    height: 60,
    marginTop: 12,
    alignItem: 'center',
    justifyContent: 'center',
  },
  labelSaldo: {
    fontSize: 20,
    fontFamily: 'TitilliumWeb-Regular',
  },
  valueSaldo: {
    fontSize: 20,
    fontFamily: 'TitilliumWeb-Bold',
  },
  labelPoint: {
    fontSize: 12,
    fontFamily: 'TitilliumWeb-Regular',
    flexDirection: 'row',
  },
  valuePoint: {
    fontSize: 12,
    fontFamily: 'TitilliumWeb-Bold',
    color: "#000000",
  },
  buttonAksi: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  chat: {
    width: 60,
    height: 60,
  },
  keluar: {
    color: "#000000",
    textAlign: "center",
    fontSize: 12,
  },
  layanan: {
    paddingLeft: 30,
    paddingTop: 15,
  },
  label: {
    fontFamily: 'TitilliumWeb-Bold',
  },
  iconLayanan: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 2,
    flexWrap: 'wrap',
  },
  pesananAktif: {
    paddingTop: 10,
    paddingHorizontal: 30,
    flex: 1,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
});

export default CardAntrian;
