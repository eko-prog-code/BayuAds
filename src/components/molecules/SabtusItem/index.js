import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {colors, fonts} from '../../../utils';

const SabtusItem = ({title, sabtu, image, klinik}) => {
  return (
    <View style={styles.container}>
      <Image source={{uri: image}} style={styles.image} />
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.klinik}>{klinik}</Text>
        <Text style={styles.date}>{sabtu}</Text>
      </View>
     
    </View>
  );
};

export default SabtusItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingBottom: 4,
    paddingHorizontal: 4,
    backgroundColor: "#FFFFFF",
  },
  titleWrapper: {flex: 1, paddingRight: 4, paddingLeft: 4},
  title: {
    fontWeight: "bold",
    textAlign: 'center',
    fontSize: 14,
    color: '#000000',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 4,
    paddingVertical: 6,
    marginTop: 4,
    elevation: 2,
  },
  date: {
    textAlign: 'center',
    fontSize: 14,
    color: "#000000",
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 4,
    paddingVertical: 6,
    marginTop: 4,
    elevation: 2,
  },
  klinik: {
    fontWeight: "bold",
    textAlign: 'center',
    fontSize: 14,
    color: '#01A2EA',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 4,
    paddingVertical: 6,
    marginTop: 4,
    elevation: 2,
  },
  image: {width: 80, height: 80, borderRadius: 11, marginTop: 4,},
});