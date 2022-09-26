import React, {useEffect, useRef, useState} from 'react';
import {
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useDispatch} from 'react-redux';
import {FloatingIcon, PopupPoint, Gap, Link} from '../../components';
import FIREBASE from '../../config/FIREBASE';
import Carousel from '../Carousel';
import Headline from '../Headline';
import Map from '../Map';
import Notif from '../Notif';
import RunningText from '../RunningText';
import Voucher from '../Voucher';
import CardAntrian from '../CardAntrian';
import {colors} from '../../utils';
import codePush from 'react-native-code-push';

const Home = ({navigation}) => {
  const [pointPopup, setPointPopup] = useState(false);
  const [banner, setBanner] = useState([]);
  const [floatingIconUrl, setFloatingIcon] = useState('');
  const [showFloating, setShowFloating] = useState(false);
  const dispatch = useDispatch();
  const pagesScrollRef = useRef(null);
  const [originalAppointment, setOriginalAppointment] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newAppointment, setNewAppointment] = useState([]);
  const [activeCategory, setActiveCategory] = useState({});
  const [searchVal, setSearchVal] = useState('');
  const [imageUrl1, setImageUrl1] = useState();

  useEffect(() => {
    getImage();
    getBanner();
    getFloatingIcon();
    getCategories();
    searchAppointment();
  }, []);

  useEffect(() => {
    FIREBASE.database()
      .ref('headerUtama/') //name in storage in firebase console
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

  const getImage = () => {
    if (!pointPopup) {
      setPointPopup(true);
    }
  };

  const getBanner = () => {
    dispatch({type: 'SET_LOADING', value: true});
    FIREBASE.database()
      .ref('banner')
      .once('value', snapshot => {
        setBanner(snapshot.val());
        dispatch({type: 'SET_LOADING', value: false});
      });
  };

  const getFloatingIcon = () => {
    FIREBASE.database()
      .ref('floating_icon_home')
      .once('value', snapshot => {
        setFloatingIcon(snapshot.val());
        setShowFloating(true);
      });
  };

  return (
    <View style={styles.page}>
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

      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <CardAntrian />
      </View>

      <Gap height={12} />
      <RunningText />

      <ScrollView
        onScrollBeginDrag={() => setShowFloating(false)}
        onScrollEndDrag={() => setShowFloating(true)}
        ref={pagesScrollRef}
        showsVerticalScrollIndicator={false}>
        <Carousel />

        <Gap height={12} />
        <Link
          title="Software Engineer"
          size={16}
          align="center"
          onPress={() => Linking.openURL('https://wa.me/+62895600394345')}
        />
        <Text style={styles.version}>Bayukarta Mobile App</Text>
        <Text style={styles.version2}>Versi: 17</Text>
        <Notif />
      </ScrollView>
      <PopupPoint visible={pointPopup} onClose={() => setPointPopup(false)} />
    </View>
  );
};
export default codePush(Home);

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  header: {
    paddingHorizontal: 12,
    paddingTop: 8,
    marginBottom: 80,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FBFCFC',
    marginTop: 10,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#35C872',
    paddingLeft: 10,
  },
  categoryKlinik: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    color: '#35C872',
  },
  version: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#36364A',
    textAlign: 'center',
  },
  version2: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#36364A',
    textAlign: 'center',
    paddingBottom: 40,
  },
  listPasien: {
    paddingHorizontal: 30,
    marginTop: 20,
  },
  wrapperButton: {
    flex: 1,
    position: 'absolute',
    bottom: 0,
    right: 0,
    margin: 30,
  },
  plus: {
    marginTop: -20,
    marginLeft: 26,
  },
  zero: {
    marginLeft: 14,
  },
  text: {
    marginTop: -20,
    marginLeft: 80,
    color: 'white',
    fontSize: 16,
  },
  wrapperScroll: {
    marginHorizontal: -16,
    paddingRight: 10,
    paddingLeft: 10,
    marginTop: 6,
  },
  category: {flexDirection: 'row'},
  btnTambah: {
    marginTop: 8,
    padding: 20,
    backgroundColor: 'skyblue',
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
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
  categoryContainer: {
    paddingHorizontal: 16,
    marginRight: 8,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 1,
  },
  categoryText: {
    fontSize: 16,
    fontWeight: '500',
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
    paddingHorizontal: 16,
    marginRight: 8,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 1,
  },
  categoryText: {
    fontSize: 16,
    fontWeight: '500',
  },
});
