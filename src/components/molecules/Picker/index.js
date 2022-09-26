import {StyleSheet, View, Text} from 'react-native';
import React from 'react';
import DropDownPicker from 'react-native-dropdown-picker';

import {fonts} from '../../../utils';

export default function Picker({
  placeholder,
  open,
  value,
  items,
  setOpen,
  setValue,
  setItems,
  zIndex,
  multiple,
  multipleText,
  listMode,
  pickerStyle,
  containerStyle,
  placeholderColor,
  max,
  label,
}) {
  return (
    <View style={[{zIndex}, containerStyle]}>
      <Text style={styles.label}>{label} :</Text>

      <DropDownPicker
        multiple={multiple ?? false}
        multipleText={`${value?.length} ${multipleText}`}
        textStyle={{
          fontFamily: fonts.primary.normal,
        }}
        max={max}
        placeholder={placeholder}
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        placeholderStyle={{
          color: placeholderColor ?? 'gray',
        }}
        style={[
          {
            borderColor: 'gray',
            marginBottom: 10,
          },
          pickerStyle,
        ]}
        listChildLabelStyle={{
          borderColor: 'gray',
        }}
        dropDownContainerStyle={{
          borderColor: 'gray',
          borderWidth: 1,
        }}
        listMode={listMode ?? 'MODAL'}
        scrollViewProps={{
          nestedScrollEnabled: true,
        }}
        zIndex={9999999}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
});
