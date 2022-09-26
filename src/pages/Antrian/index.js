import React, {useCallback, useState, useEffect} from 'react';
import {
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  ImageBackground,
  Dimensions
} from 'react-native';
import FIREBASE from '../../config/FIREBASE';
import {useFocusEffect} from '@react-navigation/core';
import {Gap} from '../../components';
import {getData} from '../../utils';
import {ILNullPhoto} from '../../assets';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { ScrollView } from 'react-native-gesture-handler';
import { Button, Alert } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";

const Antrian = ({link, visible, onClose}) => {
  const [profile, setProfile] = useState({
    photo: ILNullPhoto,
    fullName: '',
    profession: '',
  });
  const [loading, setLoading] = useState(true);
  const [userHomeData, setUserHomeData] = useState({});
  const [playing, setPlaying] = useState(false);
  const [videoLink, setVideoLink] = useState('');

  const getVideoLink = uid => {
    FIREBASE.database()
      .ref('videos/')
      .on('value', snapshot => {
        if (snapshot.val()) {
          setVideoLink(snapshot.val());
        }
      });
  };

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("Video parantos...");
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);


  useEffect(() => {
    getData('user').then(res => {
      const data = res;
      data.photo = res?.photo?.length > 1 ? {uri: res.photo} : ILNullPhoto;
      setProfile(res);
    });
  }, []);

  useEffect(() => {
    getUserHomeData();
    getVideoLink();
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

  const getUserHomeData = uid => {
    FIREBASE.database()
      .ref('users/' + uid)
      .on('value', snapshot => {
        if (snapshot.val()) {
          setUserHomeData(snapshot.val());
        }
      });
  };

  
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

  return (
    <View style={{flex: 1}}>
      <StatusBar barStyle={'light-content'} backgroundColor={'transparent'} translucent/>
      <View style={{flex: 0.42, marginTop: -windowHeight * 0.05,}}>
      <Button title={playing ? "pause" : "play"} onPress={togglePlaying} />
      <YoutubePlayer
        height= {"100%"}
        play={true}
        videoId={videoLink.link}
        onChangeState={onStateChange}
      />
      </View>
      <View style={{flex: 1, backgroundColor: '#FFFFFF'}}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Image
            source={profile.photo}
            style={{
              width: 100,
              height: 100,
              borderRadius: 100 / 2,
              borderWidth: 4,
              borderColor: '#0BCAD4',
              position: 'absolute',
              zIndex: 2,
            }}
          />
        </View>
        <View style={{marginTop: 60}}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 18,
              textAlign: 'center',
              color: '#212121',
            }}>
            {profile?.fullName}
          </Text>
          <Text style={{textAlign: 'center'}}>
            Informasi Nomor Antrian
          </Text>

          
          <View style={{marginLeft: 10, paddingRight: 10}}>
          <ScrollView>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 20,
                backgroundColor: 'white',
                width: '100%',
                height: '20%',
                borderRadius: 10,
                borderColor: '#E9E9E9',
                shadowOpacity: 2,
                elevation: 4,
                borderWidth: 3,
                paddingRight: 10,
              }}>
              <Image
                source={require('../../assets/antrian.png')}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: 54,
                  height: 54,
                }}
              />
              <View
                style={{
                  height: 40,
                  width: 2,
                  marginHorizontal: 8,
                  backgroundColor: '#E9E9E9',
                }}
              />
              <View style={{justifyContent: 'center', marginLeft: 10, flex: 1}}>
                <Text style={{fontWeight: 'bold', fontSize: 18, color: '#35C872',}} numberOfLines={1}>
                  {' '}
                  {userHomeData !== null ? userHomeData.os1 : 0}
                </Text>
                <Text style={{fontWeight: 'bold', fontSize: 14, color: '#0066CB'}} numberOfLines={1}>{' '}
                  {userHomeData !== null ? userHomeData.dokter1 : 0}</Text>
                <Text style={{fontWeight: 'bold', fontSize: 14, color: '#0066CB'}} numberOfLines={1}>{' '}
                  {userHomeData !== null ? userHomeData.klinik1 : 0}</Text>
              </View>
              <View
                style={{
                  height: 40,
                  width: 2,
                  marginHorizontal: 8,
                  backgroundColor: '#E9E9E9',
                }}
              />
              <View
                  style={{
                    backgroundColor: '#0066CB',
                    borderRadius: 10,
                    width:54,
                    height: 54,
                    shadowOpacity: 2,
                    elevation: 2,
                  }}>
                    <View style={{ textAlign: 'center'}}>
                    <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 32, color: '#FFFFFF',textAlign: 'center', marginRight: 8}} numberOfLines={1}>{' '}
                  {userHomeData !== null ? userHomeData.antrian1 : 0}</Text>
                  </View>
                  </View>
            </View>
            
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 10,
                backgroundColor: 'white',
                width: '100%',
                height: '20%',
                borderRadius: 10,
                borderColor: '#E9E9E9',
                shadowOpacity: 2,
                elevation: 4,
                borderWidth: 3,
                paddingRight: 10,
              }}>
              <Image
                source={require('../../assets/antrian.png')}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: 54,
                  height: 54,
                }}
              />
              <View
                style={{
                  height: 40,
                  width: 2,
                  marginHorizontal: 8,
                  backgroundColor: '#E9E9E9',
                }}
              />
              <View style={{justifyContent: 'center', marginLeft: 10, flex: 1}}>
                <Text style={{fontWeight: 'bold', fontSize: 18, color: '#35C872',}} numberOfLines={1}>
                  {' '}
                  {userHomeData !== null ? userHomeData.os2 : 0}
                </Text>
                <Text style={{fontWeight: 'bold', fontSize: 14, color: '#0066CB'}} numberOfLines={1}>{' '}
                  {userHomeData !== null ? userHomeData.dokter2 : 0}</Text>
                <Text style={{fontWeight: 'bold', fontSize: 14, color: '#0066CB'}} numberOfLines={1}>{' '}
                  {userHomeData !== null ? userHomeData.klinik2 : 0}</Text>
              </View>
              <View
                style={{
                  height: 40,
                  width: 2,
                  marginHorizontal: 8,
                  backgroundColor: '#E9E9E9',
                }}
              />
              <View
                  style={{
                    backgroundColor: '#0066CB',
                    borderRadius: 10,
                    width:54,
                    height: 54,
                    shadowOpacity: 2,
                    elevation: 2,
                  }}>
                    <View style={{ textAlign: 'center'}}>
                    <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 32, color: '#FFFFFF',textAlign: 'center', marginRight: 8}} numberOfLines={1}>{' '}
                  {userHomeData !== null ? userHomeData.antrian2 : 0}</Text>
                  </View>
                  </View>
            </View>
            
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 10,
                backgroundColor: 'white',
                width: '100%',
                height: '20%',
                borderRadius: 10,
                borderColor: '#E9E9E9',
                shadowOpacity: 2,
                elevation: 4,
                borderWidth: 3,
                paddingRight: 10,
              }}>
              <Image
                source={require('../../assets/antrian.png')}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: 54,
                  height: 54,
                }}
              />
              <View
                style={{
                  height: 40,
                  width: 2,
                  marginHorizontal: 8,
                  backgroundColor: '#E9E9E9',
                }}
              />
              <View style={{justifyContent: 'center', marginLeft: 10, flex: 1}}>
                <Text style={{fontWeight: 'bold', fontSize: 18, color: '#35C872',}} numberOfLines={1}>
                  {' '}
                  {userHomeData !== null ? userHomeData.os3 : 0}
                </Text>
                <Text style={{fontWeight: 'bold', fontSize: 14, color: '#0066CB'}} numberOfLines={1}>{' '}
                  {userHomeData !== null ? userHomeData.dokter3 : 0}</Text>
                <Text style={{fontWeight: 'bold', fontSize: 14, color: '#0066CB'}} numberOfLines={1}>{' '}
                  {userHomeData !== null ? userHomeData.klinik3 : 0}</Text>
              </View>
              <View
                style={{
                  height: 40,
                  width: 2,
                  marginHorizontal: 8,
                  backgroundColor: '#E9E9E9',
                }}
              />
              <View
                  style={{
                    backgroundColor: '#0066CB',
                    borderRadius: 10,
                    width:54,
                    height: 54,
                    shadowOpacity: 2,
                    elevation: 2,
                  }}>
                    <View style={{ textAlign: 'center'}}>
                    <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 32, color: '#FFFFFF',textAlign: 'center', marginRight: 8}} numberOfLines={1}>{' '}
                  {userHomeData !== null ? userHomeData.antrian3 : 0}</Text>
                  </View>
                  </View>
            </View>
   
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 10,
                backgroundColor: 'white',
                width: '100%',
                height: '20%',
                borderRadius: 10,
                borderColor: '#E9E9E9',
                shadowOpacity: 2,
                elevation: 4,
                borderWidth: 3,
                paddingRight: 10,
              }}>
              <Image
                source={require('../../assets/antrian.png')}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: 54,
                  height: 54,
                }}
              />
              <View
                style={{
                  height: 40,
                  width: 2,
                  marginHorizontal: 8,
                  backgroundColor: '#E9E9E9',
                }}
              />
              <View style={{justifyContent: 'center', marginLeft: 10, flex: 1}}>
                <Text style={{fontWeight: 'bold', fontSize: 18, color: '#35C872',}} numberOfLines={1}>
                  {' '}
                  {userHomeData !== null ? userHomeData.os4 : 0}
                </Text>
                <Text style={{fontWeight: 'bold', fontSize: 14, color: '#0066CB'}} numberOfLines={1}>{' '}
                  {userHomeData !== null ? userHomeData.dokter4 : 0}</Text>
                <Text style={{fontWeight: 'bold', fontSize: 14, color: '#0066CB'}} numberOfLines={1}>{' '}
                  {userHomeData !== null ? userHomeData.klinik4 : 0}</Text>
              </View>
              <View
                style={{
                  height: 40,
                  width: 2,
                  marginHorizontal: 8,
                  backgroundColor: '#E9E9E9',
                }}
              />
              <View
                  style={{
                    backgroundColor: '#0066CB',
                    borderRadius: 10,
                    width:54,
                    height: 54,
                    shadowOpacity: 2,
                    elevation: 2,
                  }}>
                    <View style={{ textAlign: 'center'}}>
                    <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 32, color: '#FFFFFF',textAlign: 'center', marginRight: 8}} numberOfLines={1}>{' '}
                  {userHomeData !== null ? userHomeData.antrian4 : 0}</Text>
                  </View>
                  </View>
            </View>
            </ScrollView>
          </View>
         

          <Gap height={100} />
        </View>
      </View>
    </View>
  );
};

export default Antrian;
