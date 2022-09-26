import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Alert,
  Dimensions,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
} from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import FIREBASE from '../../../config/FIREBASE';

const VideoPlayer = ({link, visible, onClose}) => {
  const scrollRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  let listener;

  const onStateChange = useCallback(state => {
    if (state === 'ended') {
      setPlaying(false);
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying(prev => !prev);
  }, []);

  return (
    <Modal animationType="fade" visible={visible} transparent>
      <View style={styles.container}>
        <YoutubePlayer
          height={Dimensions.get('screen').height / 4}
          play={true}
          videoId={link}
          onChangeState={onStateChange}
        />
        <TouchableOpacity
          title={playing ? 'Jeda' : 'Putar Video'}
          onPress={togglePlaying}>
        </TouchableOpacity>

        <View style={styles.btnCenter}>
        <TouchableOpacity
          onPress={() => {
            setPlaying(false);
            // FIREBASE.database()
            //   .ref('video/' + link)
            //   .off('value', listener);
            onClose && onClose();
          }}
          style={styles.btnClose}>
          <Text style={styles.btnCloseText}>Tutup</Text>
        </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default VideoPlayer;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#a4f9ef7F',
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  content: {
    height: Dimensions.get('screen').height / 3,
    backgroundColor: '#FFFFFF',
  },
  btnClose: {
    height: 30,
    borderRadius: 40,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    width: "40%",
  },
  btnCenter: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnPlay: {
    height: 42,
    borderRadius: 10,
    backgroundColor: '#0000FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  btnCloseText: {
    fontSize: 12,
    textAlign: 'center',
    color: '#FFFFFF',
  },
  btnPlayText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#FFFFFF',
  },
});
