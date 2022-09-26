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
          <Gap height={30} />
          <Text style={styles.news}>Bayukarta TeleVision Channel</Text>
          <Info />
        </View>
      </ScrollView>
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
    textAlign: "center"
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

