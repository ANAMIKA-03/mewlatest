import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import RBSheet from 'react-native-raw-bottom-sheet';
import styles from './styles';

const ImportWalletScreen = forwardRef((props, ref) => {
  const bottomSheetRef = useRef();
  const [recoveryPhrase, setRecoveryPhrase] = useState(Array(12).fill(''));

  useImperativeHandle(ref, () => ({
    open: () => bottomSheetRef.current.open(),
    close: () => bottomSheetRef.current.close(),
  }));

  const handleInputChange = (index, value) => {
    const updatedPhrase = [...recoveryPhrase];
    updatedPhrase[index] = value.toLowerCase();
    setRecoveryPhrase(updatedPhrase);
  };

  const handleRestoreWallet = () => {
    console.log('Restoring wallet with:', recoveryPhrase);
  };

  return (
    <RBSheet
      ref={bottomSheetRef}
      closeOnDragDown={true}
      closeOnPressMask={true}
      height={840}
      customStyles={{
        container: {
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          padding: 20,
        },
      }}
    >
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        <View style={styles.closeButtonContainer}>
          <TouchableOpacity onPress={() => bottomSheetRef.current.close()} style={styles.closeButton}>
            <MaterialCommunityIcons name="close" size={24} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleRestoreWallet}>
            <Text style={styles.restoreText}>RESTORE</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.recovtitleContainer}>
          <Text style={styles.recovtitle}>Enter your</Text>
          <Text style={styles.recovtitle}>recovery phrase</Text>
        </View>

        <View style={styles.inputContainer}>
          {Array.from({ length: 12 }).map((_, index) => (
            <View style={styles.inputBox} key={index}>
              <TextInput
                style={styles.inputField}
                value={recoveryPhrase[index]}
                onChangeText={(text) => handleInputChange(index, text)}
                placeholder={`Word ${index + 1}`}
                placeholderTextColor="#aaa"
                maxLength={12}
              />
            </View>
          ))}
        </View>
      </ScrollView>
    </RBSheet>
  );
});

export default ImportWalletScreen;
