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
import codePush from "react-native-code-push";

const Home = ({navigation}) => {
  const [pointPopup, setPointPopup] = useState(false);
  const [banner, setBanner] = useState([]);
  const [floatingIconUrl, setFloatingIcon] = useState('');
  const [showFloating, setShowFloating] = useState(false);
  const dispatch = useDispatch();
  const pagesScrollRef = useRef(null);

  useEffect(() => {
    getImage();
    getBanner();
    getFloatingIcon();
  }, []);

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
      <Gap height={30} />
      <StatusBar barStyle="dark-content" backgroundColor={'#DFF5FE'} translucent/>
      <View style={styles.headerContainer}>
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
          source={require('../../assets/header.png')}
          style={{flex: 1}}
          resizeMode="contain"
        />
        </TouchableOpacity>
      </View>
      <ScrollView
        onScrollBeginDrag={() => setShowFloating(false)}
        onScrollEndDrag={() => setShowFloating(true)}
        ref={pagesScrollRef}
        showsVerticalScrollIndicator={false}>
        <Carousel />
        <RunningText />
        <Text style={styles.subtitle}>Layanan Online RS.Bayukarta</Text>
        <Headline />
        <Gap height={16} />
        <Voucher data={banner} />
        <Map />
        <Gap height={10} />
        <Link
          title="Software Engineer"
          size={16}
          align="center"
          onPress={() => navigation.navigate('WebviewPage', {link: 'https://wa.me/+62895600394345'})}
        />
        <Text style={styles.version}>Bayukarta Mobile App</Text>
        <Text style={styles.version2}>Versi: 5</Text>
        <Notif />
      </ScrollView>
      <FloatingIcon
        onClose={() => setShowFloating(false)}
        onPress={() => Linking.openURL('https://wa.me/+628111199968')}
        visible={showFloating}
        imageUri={floatingIconUrl}
      />
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
    height: 120,
    width: '100%',
  },
  headerTitle: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: 'bold',
    letterSpacing: 2,
  },
});
