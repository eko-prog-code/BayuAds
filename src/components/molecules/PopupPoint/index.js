import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import FIREBASE from '../../../config/FIREBASE';
import { useDispatch } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';
import HariansItem from '../../molecules/HariansItem';
import SelasasItem from '../../molecules/SelasasItem';
import RebosItem from '../../molecules/RebosItem';
import KamissItem from '../../molecules/KamissItem';
import JumatsItem from '../../molecules/JumatsItem';
import SabtusItem from '../../molecules/SabtusItem';
import loading from '../..';
import Lottie from 'lottie-react-native';

const PopupPoint = ({ visible, onClose }) => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const [harians, setHarians] = useState([]);
  const [selasas, setSelasas] = useState([]);
  const [rebos, setRebos] = useState([]);
  const [kamiss, setKamiss] = useState([]);
  const [jumats, setJumats] = useState([]);
  const [sabtus, setSabtus] = useState([]);
  const [popUpModal, setPopUpModal] = useState(false);
  const [modalSelector, setModalSelector] = useState(1);

  useEffect(() => {
    getHarians();
    getSelasas();
    getRebos();
    getKamiss();
    getJumats();
    getSabtus();
  }, []);

  const getHarians = () => {
    dispatch({ type: 'SET_LOADING', value: true });
    FIREBASE.database()
      .ref('jadwal/')
      .once('value')
      .then(res => {
        if (res.val()) {
          const data = res.val();
          const filterData = data.filter(el => el !== null);
          dispatch({ type: 'SET_LOADING', value: false });
          setHarians(filterData);
          setLoading(false);
        }
      })
      .catch(err => {
        showError(err.message);
      });
  };

  const getSelasas = () => {
    dispatch({ type: 'SET_LOADING', value: true });
    FIREBASE.database()
      .ref('jadwal/')
      .once('value')
      .then(res => {
        if (res.val()) {
          const data = res.val();
          const filterData = data.filter(el => el !== null);
          dispatch({ type: 'SET_LOADING', value: false });
          setSelasas(filterData);
          setLoading(false);
        }
      })
      .catch(err => {
        showError(err.message);
      });
  };

  const getRebos = () => {
    dispatch({ type: 'SET_LOADING', value: true });
    FIREBASE.database()
      .ref('jadwal/')
      .once('value')
      .then(res => {
        if (res.val()) {
          const data = res.val();
          const filterData = data.filter(el => el !== null);
          dispatch({ type: 'SET_LOADING', value: false });
          setRebos(filterData);
          setLoading(false);
        }
      })
      .catch(err => {
        showError(err.message);
      });
  };

  const getKamiss = () => {
    dispatch({ type: 'SET_LOADING', value: true });
    FIREBASE.database()
      .ref('jadwal/')
      .once('value')
      .then(res => {
        if (res.val()) {
          const data = res.val();
          const filterData = data.filter(el => el !== null);
          dispatch({ type: 'SET_LOADING', value: false });
          setKamiss(filterData);
          setLoading(false);
        }
      })
      .catch(err => {
        showError(err.message);
      });
  };

  const getJumats = () => {
    dispatch({ type: 'SET_LOADING', value: true });
    FIREBASE.database()
      .ref('jadwal/')
      .once('value')
      .then(res => {
        if (res.val()) {
          const data = res.val();
          const filterData = data.filter(el => el !== null);
          dispatch({ type: 'SET_LOADING', value: false });
          setJumats(filterData);
          setLoading(false);
        }
      })
      .catch(err => {
        showError(err.message);
      });
  };

  const getSabtus = () => {
    dispatch({ type: 'SET_LOADING', value: true });
    FIREBASE.database()
      .ref('jadwal/')
      .once('value')
      .then(res => {
        if (res.val()) {
          const data = res.val();
          const filterData = data.filter(el => el !== null);
          dispatch({ type: 'SET_LOADING', value: false });
          setSabtus(filterData);
          setLoading(false);
        }
      })
      .catch(err => {
        showError(err.message);
      });
  };


  function renderModal() {
    if (modalSelector == 1) {
      return (
        <View
          style={{
            width: Dimensions.get('screen').width - 40,
            height: Dimensions.get('screen').height / 1.3,
            backgroundColor: "#FFFFFF",
          }}>
          <Text
            style={{
              fontSize: 20,
              paddingRight: 12,
              justifyContent: 'flex-end',
              textAlign: 'center',
              fontWeight: 'bold',
              color: '#000000',
              marginTop: 20,
              marginBottom: 10,
            }}>
            Jadwal Praktek Dokter Senin
          </Text>
          <View style={{ justifyContent: "center", alignItems: "center" }} >
            <Image style={{ width: 40, height: 40 }} source={require('../../../assets/arrowTop.png')}></Image>
            <Text>Scroll Up</Text>
          </View>
          <ScrollView showsVerticalScrollIndicator>
            {loading ? (
              <Lottie style={{ width: 300, height: 300 }} source={require('./../../../assets/load.json')} autoPlay={true} loop={false} />
            ) : (
              <View style={{ marginBottom: 30 }}>
                {harians.map(item => {
                  return (
                    <HariansItem
                      key={`harians-${item.id}`}
                      title={item.title}
                      senin={item.senin}
                      image={item.image}
                      klinik={item.klinik}
                    />
                  );
                })}
              </View>
            )}
          </ScrollView>
        </View>
      );
    } else if (modalSelector == 2) {
      return (
        <View
          style={{
            width: Dimensions.get('screen').width - 40,
            height: Dimensions.get('screen').height / 1.3,
            backgroundColor: "#FFFFFF"
          }}>
          <Text
            style={{
              fontSize: 20,
              paddingRight: 12,
              justifyContent: 'flex-end',
              textAlign: 'center',
              fontWeight: 'bold',
              color: '#000000',
              marginTop: 20,
              marginBottom: 10,
            }}>
            Jadwal Praktek Dokter Selasa
          </Text>
          <View style={{ justifyContent: "center", alignItems: "center", backgroundColor: "#FFFFFF" }} >
            <Image style={{ width: 40, height: 40 }} source={require('../../../assets/arrowTop.png')}></Image>
            <Text>Scroll Up</Text>
          </View>
          <ScrollView showsVerticalScrollIndicator>
            {loading ? (
              <Lottie style={{ width: 300, height: 300 }} source={require('./../../../assets/load.json')} autoPlay={true} loop={false} />
            ) : (
              <View style={{ marginBottom: 30 }}>
                {selasas.map(item => {
                  return (
                    <SelasasItem
                      key={`selasas-${item.id}`}
                      title={item.title}
                      selasa={item.selasa}
                      image={item.image}
                      klinik={item.klinik}
                    />
                  );
                })}
              </View>
            )}
          </ScrollView>
        </View>
      );
    } else if (modalSelector == 3) {
      return (
        <View
          style={{
            width: Dimensions.get('screen').width - 40,
            height: Dimensions.get('screen').height / 1.3,
            backgroundColor: "#FFFFFF",
          }}>
          <Text
            style={{
              fontSize: 20,
              paddingRight: 12,
              justifyContent: 'flex-end',
              textAlign: 'center',
              fontWeight: 'bold',
              color: '#000000',
              marginTop: 20,
              marginBottom: 10,
            }}>
            Jadwal Praktek Dokter Rabu
          </Text>
          <View style={{ justifyContent: "center", alignItems: "center" }} >
            <Image style={{ width: 40, height: 40 }} source={require('../../../assets/arrowTop.png')}></Image>
            <Text>Scroll Up</Text>
          </View>
          <ScrollView showsVerticalScrollIndicator>
            {loading ? (
              <Lottie style={{ width: 300, height: 300 }} source={require('./../../../assets/load.json')} autoPlay={true} loop={false} />
            ) : (
              <View style={{ marginBottom: 30 }}>
                {rebos.map(item => {
                  return (
                    <RebosItem
                      key={`rebos-${item.id}`}
                      title={item.title}
                      rabu={item.rabu}
                      image={item.image}
                      klinik={item.klinik}
                    />
                  );
                })}
              </View>
            )}
          </ScrollView>
        </View>
      );
    } else if (modalSelector == 4) {
      return (
        <View
          style={{
            width: Dimensions.get('screen').width - 40,
            height: Dimensions.get('screen').height / 1.3,
            backgroundColor: "#FFFFFF",
          }}>
          <Text
            style={{
              fontSize: 20,
              paddingRight: 12,
              justifyContent: 'flex-end',
              textAlign: 'center',
              fontWeight: 'bold',
              color: '#000000',
              marginTop: 20,
              marginBottom: 10,
            }}>
            Jadwal Praktek Dokter Kamis
          </Text>
          <View style={{ justifyContent: "center", alignItems: "center" }} >
            <Image style={{ width: 40, height: 40 }} source={require('../../../assets/arrowTop.png')}></Image>
            <Text>Scroll Up</Text>
          </View>
          <ScrollView showsVerticalScrollIndicator>
            {loading ? (
              <Lottie style={{ width: 300, height: 300 }} source={require('./../../../assets/load.json')} autoPlay={true} loop={false} />
            ) : (
              <View style={{ marginBottom: 30 }}>
                {kamiss.map(item => {
                  return (
                    <KamissItem
                      key={`kamiss-${item.id}`}
                      title={item.title}
                      kamis={item.kamis}
                      image={item.image}
                      klinik={item.klinik}
                    />
                  );
                })}
              </View>
            )}
          </ScrollView>
        </View>
      );
    } else if (modalSelector == 5) {
      return (
        <View
          style={{
            width: Dimensions.get('screen').width - 40,
            height: Dimensions.get('screen').height / 1.3,
            backgroundColor: "#FFFFFF",
          }}>
          <Text
            style={{
              fontSize: 20,
              paddingRight: 12,
              justifyContent: 'flex-end',
              textAlign: 'center',
              fontWeight: 'bold',
              color: '#000000',
              marginTop: 20,
              marginBottom: 10,
            }}>
            Jadwal Praktek Dokter Jumat
          </Text>
          <View style={{ justifyContent: "center", alignItems: "center" }} >
            <Image style={{ width: 40, height: 40 }} source={require('../../../assets/arrowTop.png')}></Image>
            <Text>Scroll Up</Text>
          </View>
          <ScrollView showsVerticalScrollIndicator>
            {loading ? (
              <Lottie style={{ width: 300, height: 300 }} source={require('./../../../assets/load.json')} autoPlay={true} loop={false} />
            ) : (
              <View style={{ marginBottom: 30 }}>
                {jumats.map(item => {
                  return (
                    <JumatsItem
                      key={`jumats-${item.id}`}
                      title={item.title}
                      jumat={item.jumat}
                      image={item.image}
                      klinik={item.klinik}
                    />
                  );
                })}
              </View>
            )}
          </ScrollView>
        </View>
      );
    } else if (modalSelector == 6) {
      return (
        <View
          style={{
            width: Dimensions.get('screen').width - 40,
            height: Dimensions.get('screen').height / 1.3,
            backgroundColor: "#FFFFFF",
          }}>
          <Text
            style={{
              fontSize: 20,
              paddingRight: 12,
              justifyContent: 'flex-end',
              textAlign: 'center',
              fontWeight: 'bold',
              color: '#000000',
              marginTop: 20,
              marginBottom: 10,
            }}>
            Jadwal Praktek Dokter Sabtu
          </Text>
          <View style={{ justifyContent: "center", alignItems: "center" }} >
            <Image style={{ width: 40, height: 40 }} source={require('../../../assets/arrowTop.png')}></Image>
            <Text>Scroll Up</Text>
          </View>
          <ScrollView showsVerticalScrollIndicator>
            {loading ? (
              <Lottie style={{ width: 300, height: 300 }} source={require('./../../../assets/load.json')} autoPlay={true} loop={false} />
            ) : (
              <View style={{ marginBottom: 30 }}>
                {sabtus.map(item => {
                  return (
                    <SabtusItem
                      key={`jumats-${item.id}`}
                      title={item.title}
                      sabtu={item.sabtu}
                      image={item.image}
                      klinik={item.klinik}
                    />
                  );
                })}
              </View>
            )}
          </ScrollView>
        </View>
      );
    }
  }

  return (
    <Modal
      visible={visible}
      transparent
      onBackdropPress={() => setPopUpModal(false)}>
      <View
        style={{
          backgroundColor: 'rgba(0,0,0,0.5)',
          paddingVertical: 50,
          paddingHorizontal: 20,
        }}>
        {renderModal()}
        <TouchableOpacity
          onPress={() => onClose && onClose()}
          activeOpacity={0.8}
          style={styles.closeButton}>
          <Text style={styles.closeText}>X</Text>
        </TouchableOpacity>
      </View>
      <StatusBar backgroundColor={'rgba(0,0,0,0.5)'} hidden={false} />
      <View
        style={{
          marginTop: -windowHeight * 0.1,
          flexDirection: 'row',
          marginBottom: 100,
        }}>
        <TouchableOpacity
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#01A2EA',
            marginRight: 10,
            paddingHorizontal: 6,
            paddingVertical: 10,
            borderRadius: 6,
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
          }}
          onPress={() => setModalSelector(1)}>
          <Text style={{ fontSize: 12, color: "#FFFFFF" }}>Senin</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',

            backgroundColor: '#01A2EA',
            marginRight: 10,
            paddingHorizontal: 6,
            paddingVertical: 10,
            borderRadius: 6,
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
          }}
          onPress={() => setModalSelector(2)}>
          <Text style={{ fontSize: 12, color: "#FFFFFF" }}>Selasa</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#01A2EA',
            marginRight: 10,
            paddingHorizontal: 10,
            paddingVertical: 10,
            borderRadius: 6,
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
          }}
          onPress={() => setModalSelector(3)}>
          <Text style={{ fontSize: 12, color: "#FFFFFF" }}>Rabu</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#01A2EA',
            marginRight: 10,
            paddingHorizontal: 6,
            paddingVertical: 10,
            borderRadius: 6,
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
          }}
          onPress={() => setModalSelector(4)}>
          <Text style={{ fontSize: 12, color: "#FFFFFF" }}>Kamis</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#01A2EA',
            marginRight: 10,
            paddingHorizontal: 6,
            paddingVertical: 10,
            borderRadius: 6,
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
          }}
          onPress={() => setModalSelector(5)}>
          <Text style={{ fontSize: 12, color: "#FFFFFF" }}>Jumat</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#01A2EA',
            marginRight: 10,
            paddingHorizontal: 6,
            paddingVertical: 10,
            borderRadius: 6,
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
          }}
          onPress={() => setModalSelector(6)}>
          <Text style={{ fontSize: 12, color: "#FFFFFF" }}>Sabtu</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default PopupPoint;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: Dimensions.get('screen').height / 1.2,
    width: Dimensions.get('screen').width - 30,
    borderRadius: 10,
  },
  text: {
    position: 'absolute',
    bottom: 20,
    fontSize: 24,
    color: '#FFFFFF',
  },
  closeButton: {
    height: 40,
    width: 40,
    borderRadius: 200,
    backgroundColor: '#01A2EA',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 8,
    top: 36,
    zIndex: 9999,
  },
  closeText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});
