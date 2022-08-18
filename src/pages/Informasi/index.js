import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Linking,
  TouchableOpacity,
  Image,
} from 'react-native';
import Info from '../Info';
import CardAntrian from '../CardAntrian';
import {FloatingIcon, Gap, Input} from '../../components';
import FIREBASE from '../../config/FIREBASE';

const Informasi = ({navigation}) => {
  const [floatingIconUrl, setFloatingIcon] = useState('');
  const [showFloating, setShowFloating] = useState(false);
  const [originalAppointment, setOriginalAppointment] = useState([]);
  const [newAppointment, setNewAppointment] = useState([]);
  const [searchVal, setSearchVal] = useState('');

  useEffect(() => {
    getFloatingIcon();
    searchAppointment();
  }, []);

  const getFloatingIcon = () => {
    FIREBASE.database()
      .ref('floating_icon_information')
      .once('value', snapshot => {
        setFloatingIcon(snapshot.val());
        setShowFloating(true);
      });
  };

  const searchAppointment = () => {
    FIREBASE.database()
      .ref('jadwal')
      .once('value', snapshot => {
        setOriginalAppointment(snapshot.val());
      });
  };

  const handleSearch = val => {
    if (val !== '') {
      var searchRegex = new RegExp(val, 'i');
      let arr = [...originalAppointment];
      arr = arr.filter(item => searchRegex?.test(item?.title));
      setNewAppointment(arr);
    } else {
      setNewAppointment([]);
    }
  };

  return (
    <View>
      <ScrollView
        onScrollBeginDrag={() => setShowFloating(false)}
        onScrollEndDrag={() => setShowFloating(true)}
        showsVerticalScrollIndicator={false}>
        <View style={styles.page}>
          <Gap height={40} />
          <Input
            label="Cari dokter/klinik"
            value={searchVal}
            onChangeText={val => {
              setSearchVal(val);
              handleSearch(val);
            }}
          />
          <Gap height={16} />
          <ScrollView
            contentContainerStyle={{alignItems: 'flex-start'}}
            horizontal>
            {newAppointment.map((item, key) => (
              <View key={key} style={styles.cardAppointment}>
                <Image
                  source={{uri: item?.image}}
                  style={styles.imageAppointment}
                />
                <Gap width={16} />
                <View style={{flex: 1}}>
                  <Text style={{fontWeight: 'bold'}}>{item?.title}</Text>
                  <Text style={styles.scheduleText}>{item?.senin}</Text>
                  <Text style={styles.scheduleText}>{item?.selasa}</Text>
                  <Text style={styles.scheduleText}>{item?.rabu}</Text>
                  <Text style={styles.scheduleText}>{item?.kamis}</Text>
                  <Text style={styles.scheduleText}>{item?.jumat}</Text>
                </View>
              </View>
            ))}
          </ScrollView>
          <CardAntrian />
          <Gap height={20} />
          <Text style={styles.news}>Bayukarta TeleVision Channel</Text>
          <Info />
        </View>
      </ScrollView>
      <FloatingIcon
          onClose={() => setShowFloating(false)}
          onPress={() => navigation.navigate('New')}
          visible={showFloating}
          imageUri={floatingIconUrl}
        />
    </View>
  );
};

export default Informasi;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    padding: 20,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#FBFCFC',
  },
  news: {
    paddingLeft: 10,
    marginTop: 8,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#35C872',
  },
  imageAppointment: {
    height: 80,
    width: 80,
    borderRadius: 8,
  },
  cardAppointment: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    flexDirection: 'row',
    width: 300,
  },
  scheduleText: {
    fontSize: 12,
  },
});

