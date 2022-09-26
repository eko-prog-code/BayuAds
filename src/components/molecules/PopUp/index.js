import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
} from 'react-native';
import FIREBASE from '../../../config/FIREBASE';
import {useDispatch} from 'react-redux';

const PopUp = ({visible, onClose}) => {
  const [imageUri, setImageUri] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    getImage();
  }, []);

  const getImage = () => {
    dispatch({type: 'SET_LOADING', value: true});
    FIREBASE.database()
      .ref('PopUp')
      .once('value', snapshot => {
        dispatch({type: 'SET_LOADING', value: false});
        setImageUri(snapshot.val());
      });
  };

  return (
    <Modal animationType="fade" visible={visible} transparent>
     <StatusBar barStyle="dark-content" backgroundColor={'rgba(0,0,0,0.5)'} hidden={false} />
      <View style={styles.container}>
        <View style={{alignItems: 'center'}}>
        <TouchableOpacity
            onPress={() => onClose && onClose()}
            activeOpacity={0.8}
            style={styles.closeButton}>
            <Text style={styles.closeText}>X</Text>
          </TouchableOpacity>
          <Image style={styles.image} source={{uri: imageUri}} />
        </View>
      </View>
    </Modal>
  );
};

export default PopUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: Dimensions.get('screen').height / 2,
    width: Dimensions.get('screen').width - 40,
    borderRadius: 40,
  },
  text: {
    position: 'absolute',
    bottom: 20,
    fontSize: 24,
    color: "#FFFFFF",
  },
  closeButton: {
    height: 40,
    width: 40,
    borderRadius: 200,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    right: -8,
    top: -12,
    zIndex: 9999,
  },
  closeText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: "#000000",
  },
});