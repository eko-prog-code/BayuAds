import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Modal,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  RefreshControl,
  Dimensions,
  Linking,
  SafeAreaView,
} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import {Gap} from '../../components';
import moment from 'moment';
import localization from 'moment/locale/id';
import Gambar from '../Gambar';
import TextKlinik from '../TextKlinik';

import VideoNotif from '../../components/atoms/VideoNotif';
import FIREBASE from '../../config/FIREBASE';
import {colors} from '../../utils';
import {Header, Input, VideoPlayer} from '../../components';
import {useDispatch} from 'react-redux';
import {YellowBox} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const Obat = ({navigation}) => {
  const [data, setData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [modalImage, setModalImage] = useState(false);
  const [loading, setLoading] = useState(true);
  const [indexActive, setIndexActive] = useState(0);
  const [refreshing, setRefreshing] = React.useState(false);
  const dispatch = useDispatch();

  YellowBox.ignoreWarnings([
    'VirtualizedLists should never be nested', // TODO: Remove when fixed
  ]);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    dispatch({type: 'SET_LOADING', value: true});
    FIREBASE.database()
      .ref('cardSolved')
      .once('value')
      .then(res => {
        const snapshotVal = res.val();
        const arr = snapshotVal.filter(val => val);
        dispatch({type: 'SET_LOADING', value: false});
        setRefreshing(true);
        setData(arr);
        setAllData(arr);
        wait(2000).then(() => setRefreshing(false));
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
      });
  };

  const handleFilter = val => {
    setLoading(true);
    let arr = [...allData];
    var searchRegex = new RegExp(val, 'i');
    arr = arr.filter(item => searchRegex?.test(item?.title));
    setData(arr);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };

  const openKlinik = url => {
    navigation.navigate('WebviewPage', {link: 'https://' + url});
  };

  moment.updateLocale('id', localization);

  let tanggal = moment().locale('id');

  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  return (
    <View style={styles.page}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={getData} />
        }>
        <Gap height={40} />
        <TextKlinik />
        <Text style={styles.title}>Monitoring Antrian Dokter</Text>
        <Text style={styles.penjamin}>(Pasien UMUM, Mitra & Asuransi)</Text>
        <Text style={styles.date}>
          Waktu Anda Berharga {tanggal.format('LLLL, a')}
        </Text>
        <View>
          <SafeAreaView style={{flex: 1}}>
            <View style={{padding: 20, paddingTop: 8}}>
              <Input
                onChangeText={val => handleFilter(val)}
                label="Cari Klinik"
                placeholder="Masukkan Klinik"
              />
            </View>
            {loading ? (
              <ActivityIndicator size={24} color={colors.primary} />
            ) : (
              <FlatList
                keyExtractor={(_, index) => index.toString()}
                data={data}
                contentContainerStyle={styles.listContentContainer}
                renderItem={({item}) => (
                  <TouchableOpacity
                    onPress={() => openKlinik(item.link)}
                    key={item.id}>
                    <Image
                      source={{uri: item?.image}}
                      style={styles.thumbnail}
                    />
                    <Gap height={8} />
                    <View>
                      <Text style={styles.subtitle}>{item?.title}</Text>
                      <Gap height={4} />
                      <Text
                        numberOfLines={2}
                        lineBreakMode="tail"
                        style={styles.subtitle}>
                        No Sedang diLayani= {item?.body}
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}
                numColumns={2}
                columnWrapperStyle={styles.columnWrapperStyle}
              />
            )}
          </SafeAreaView>
        </View>
        <Gap height={20} />
        <Gambar />
      </ScrollView>
    </View>
  );
};

export default Obat;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  header: {
    paddingHorizontal: 12,
    //paddingTop: 8,
    marginBottom: 100,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#35C872',
    paddingLeft: 10,
    textAlign: 'center',
  },
  date: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#36364A',
    paddingLeft: 10,
    textAlign: 'center',
  },
  penjamin: {
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#36364A',
    paddingLeft: 10,
    textAlign: 'center',
  },
  KalkulatorDosisObat: {
    marginTop: 40,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#36364A',
  },
  DosisObatEmergency: {
    marginTop: 40,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#36364A',
  },
  image: {
    height: 200,
    width: 200,
    borderRadius: 20,
  },
  listContentContainer: {
    padding: 10,
    // justifyContent: "space-between",
  },
  columnWrapperStyle: {
    justifyContent: 'space-between',
  },
  videoContainer: {
    borderWidth: 1,
    borderColor: colors.border,
    padding: 8,
    borderRadius: 5,
    width: Dimensions.get('screen').width / 2 - 28,
  },
  thumbnail: {
    height: 180,
    width: '100%',
    borderRadius: 14,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#35C872',
  },
  body: {
    fontSize: 12,
    color: colors.secondary,
  },
  pages: {
    flex: 1,
  },
});