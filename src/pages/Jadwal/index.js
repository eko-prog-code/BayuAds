import React, {Component, useCallback, useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Linking,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import FIREBASE from '../../config/FIREBASE';
import {JadwalCard, Gap} from '../../components';
import {useDispatch} from 'react-redux';
import {colors} from '../../utils';

const Jadwal = props => {
  const [jadwals, setJadwals] = useState([]);
  const [jadwalsAll, setJadwalsAll] = useState([]);
  const [searchJadwalLoading, setSearchJadwalLoading] = useState(false);
  const dispatch = useDispatch();
  const [originalAppointment, setOriginalAppointment] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newAppointment, setNewAppointment] = useState([]);
  const [activeCategory, setActiveCategory] = useState({});
  const [searchVal, setSearchVal] = useState('');

  useEffect(() => {
    getJadwals();
    getCategories();
    searchAppointment();
  }, []);

  const searchAppointment = () => {
    FIREBASE.database()
      .ref('jadwal')
      .once('value', snapshot => {
        setOriginalAppointment(snapshot.val());
      });
  };

  const getCategories = () => {
    FIREBASE.database()
      .ref('category')
      .once('value', snapshot => {
        const arr = [...snapshot.val()].filter(item => item);
        setCategories(arr);
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

  const handleSelectCategory = item => {
    setActiveCategory(item);
    let arr = [...originalAppointment];
    arr = arr.filter(val => val?.category === item?.value);
    setNewAppointment(arr);
  };

  const getJadwals = () => {
    dispatch({type: 'SET_LOADING', value: true});
    FIREBASE.database()
      .ref('jadwal')
      .on('value', res => {
        const arr = [...res.val()];
        dispatch({type: 'SET_LOADING', value: false});
        setJadwals(arr.filter(val => val !== null));
        setJadwalsAll(arr.filter(val => val !== null));
      });

    setSearchJadwalLoading(false);
  };

  const handleJadwalsFilter = val => {
    setSearchJadwalLoading(true);
    let arr = [...jadwalsAll];
    var searchRegex = new RegExp(val, 'i');
    arr = arr.filter(item => searchRegex?.test(item?.title));
    setJadwals(arr);
    setTimeout(() => {
      setSearchJadwalLoading(false);
    }, 1500);
  };

  return (
    <View style={styles.page}>
      <Gap height={40} />
      <View>
      <Text style={styles.categoryKlinik}>Cari Dokter berdasarkan Kategori Klinik</Text>
      <Gap height={10} />
        <ScrollView horizontal>
            {categories.map(item => (
              <TouchableOpacity
                onPress={() => handleSelectCategory(item)}
                activeOpacity={0.8}
                style={[
                  styles.categoryContainer,
                  {
                    backgroundColor:
                      item?.value === activeCategory?.value
                        ? colors.primary
                        : colors.white,
                    borderColor:
                      item?.value === activeCategory?.value
                        ? colors.white
                        : colors.primary,
                  },
                ]}>
                <Text
                  style={[
                    styles.categoryText,
                    {
                      color:
                        item?.value === activeCategory?.value
                          ? colors.white
                          : colors.text.primary,
                    },
                  ]}>
                  {item?.title}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
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
                  <Text style={{fontWeight: 'bold', color: 'black'}}>
                    {item?.title}
                  </Text>
                  <Text style={{fontWeight: 'bold', color: 'black', fontSize: 12}}>{item?.klinik}</Text>
                  <Text style={styles.scheduleText}>{item?.senin}</Text>
                  <Text style={styles.scheduleText}>{item?.selasa}</Text>
                  <Text style={styles.scheduleText}>{item?.rabu}</Text>
                  <Text style={styles.scheduleText}>{item?.kamis}</Text>
                  <Text style={styles.scheduleText}>{item?.jumat}</Text>
                  <Text style={styles.scheduleText}>{item?.sabtu}</Text>
                </View>
              </View>
            ))}
          </ScrollView>
      </View>
      <View style={styles.colom}>
        <Text style={styles.row}>CARI JADWAL PRAKTEK DOKTER</Text>
        <View style={styles.imageDok}>
          <Image
            source={require('../../assets/dokterChat.png')}
            style={styles.rowCenter}
          />
        </View>
      </View>

      <View style={styles.cariObat}>
        <TextInput
          onChangeText={val => handleJadwalsFilter(val, jadwals)}
          selectTextOnFocus
          style={styles.searchInput}
          placeholder="MASUKAN NAMA DOKTER"
          placeholderTextColor="#00A2E9"
        />
      </View>
      
      <View style={{justifyContent: "center", alignItems: "center"}}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        style={{marginTop: 10, paddingHorizontal: 2}}>
        {searchJadwalLoading ? (
          <ActivityIndicator
            size={40}
            color="#00A2E9"
            style={{marginVertical: 40, marginLeft: 40}}
          />
        ) : (
          jadwals?.map((item, index) => (
            <JadwalCard
              onRemove={() => handleRemoveFavorite(item, jadwals)}
              onAdd={() => handleAddFavorite(item, jadwals)}
              onPress={() => handleBuy(item)}
              type="jadwal"
              key={index}
              item={item}
              numColumns={2}
              columnWrapperStyle={styles.columnWrapperStyle}
            />
          ))
        )}
      </ScrollView>
      </View>
    </View>
  );
};
export default Jadwal;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#DFF5FE',
    paddingLeft: 10,
    paddingTop: 20,
  },
  colom: {
    alignItems: 'stretch',
    paddingLeft: 40,
    justifyContent: 'center',
  },
  cariObat: {
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    paddingLeft: 40,
    paddingRight: 10,
    width: '96%',
  },
  searchInput: {
    color: '#00A2E9',
    fontWeight: 'bold',
  },
  row: {
    marginTop: 30,
    marginBottom: 10,
    fontSize: 15,
    fontWeight: 'bold',
    color: '#35C872',
    textDecorationLine: "underline",
    fontStyle: "italic",
    marginHorizontal: 2,
  },

  rowCenter: {
    height: 40,
    width: 40,
    marginTop: -40,
    marginBottom: 10,
    marginLeft: 200,
  },
  imageDok: {
    alignItems: 'center',
  },
  columnWrapperStyle: {
    justifyContent: 'space-between',
  },
  categoryKontainer: {
    paddingHorizontal: 16,
    marginRight: 8,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 1,
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
    color: 'black',
  },
  categoryContainer: {
    height: 30,
    paddingHorizontal: 16,
    marginRight: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  categoryText: {
    fontSize: 16,
    fontWeight: '500',
  },
  categoryKlinik: {
    fontWeight: "bold",
    fontStyle: "italic",
    textDecorationLine: "underline",
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    color: '#35C872',
  },
  category: {flexDirection: 'row'},
});