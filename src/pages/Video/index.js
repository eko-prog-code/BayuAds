import AsyncStorage from '@react-native-community/async-storage';
import {useRoute} from '@react-navigation/native';
import React, {useState, useCallback, useRef, useEffect} from 'react';
import {
  StyleSheet,
  Modal,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Button, Alert} from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import {Gap, VideoPlayer} from '../../components';
import FIREBASE from '../../config/FIREBASE';
import {useDispatch} from 'react-redux';

const Video = () => {
  const {profile} = useRoute().params;
  const [link, setLink] = useState('');
  const [videoVisible, setVideoVisible] = useState(false);

  const [videoData, setVideoData] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    FIREBASE.auth().onAuthStateChanged(async data => {
      if (data) {
        getUserVideo(data.uid);
      } else {
        AsyncStorage.clear();
      }
    });
  }, []);

  const getUserVideo = uid => {
    dispatch({type: 'SET_LOADING', value: true});
    FIREBASE.database()
      .ref('video/' + uid)
      .on('value', snapshot => {
        dispatch({type: 'SET_LOADING', value: false});
        if (snapshot.val()) {
          setVideoData(snapshot.val().filter(val => val));
        }
      });
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{alignItems: 'center', paddingVertical: 20}}
        showsVerticalScrollIndicator={false}>
          <Gap height={40} />
        <Text style={{fontSize: 14, fontWeight: 'bold', textAlign: 'center', color: '#000000'}}>
          {`Sampurasun ${profile?.fullName}\n(ini adalah list video: TeleMedicine milik Anda)\n(untuk memperoleh fasilitas TeleMedicine)\n(hubungi Information Center)`}
        </Text>
        {videoData?.map((item, index) => (
          <TouchableOpacity
            onPress={() => {
              setLink(item?.link);
              setVideoVisible(true);
            }}
            style={styles.imageView}
            key={index}>
            <Image source={{uri: item?.image}} style={styles.image} />
            <Gap height={16} />
            <Text style={{textAlign: 'center', color: '#1908DD',}}>{item?.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <VideoPlayer
        link={link}
        visible={videoVisible}
        onClose={() => setVideoVisible(false)}
      />
    </View>
  );
};

export default Video;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  imageView: {
    marginVertical: 20,
  },
  image: {
    height: 200,
    width: 200,
    borderRadius: 20
  },
});