import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, Animated, TextInput } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/FontAwesome5';
import RBSheet from 'react-native-raw-bottom-sheet';
import { useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import styles from './styles';
import { createWallet, setActiveNetwork, setActiveWallet, setAddress, setInitialised, setMnemonic, setPincode, setPrivateKey } from '../../redux/walletSlice';
import { all_chains_txns, AllChainIds, WalletAssets } from '../../utils/walletConstants';
import { getHDWallet, importWallet, setDefaultAccount, setProvider } from '../../utils/web3/web3';

const NewWalletScreen = () => {
  const { networks, activeNetwork } = useSelector(state => state.wallet)
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [scannerModalVisible, setScannerModalVisible] = useState(false);
  const navigation = useNavigation();
  const screenHeight = Dimensions.get('window').height;
  const progressSheetRef = useRef();
  const [currentStep, setCurrentStep] = useState(0);
  const cursorAnim = useRef(new Animated.Value(0)).current;
  const bottomSheetRef = useRef();
  const pinSheetRef = useRef();
  const confirmPinSheetRef = useRef();
  const scannerSheetRef = useRef();
  const scannerRef = useRef();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { pincode } = useSelector(state => state.wallet);
  const [mnemonicWords, setMnemonicWords] = useState("");
  const [mnemonicWordsArray, setMnemonicWordsArray] = useState([]);
  const [mnemonicShuffled, setMnemonicShuffled] = useState([]);
  const [dropdownVisiblee, setDropdownVisiblee] = useState(false);
  const bottomSheetReff = React.useRef();
  const [isVisible, setIsVisible] = useState(false);
  const secondBottomSheetRef = useRef();
  const [recoveryPhrase, setRecoveryPhrase] = useState(Array(12).fill(''));
  const bottomSheetR = useRef();
  const wallets = useSelector((state) => state.wallet.wallets[0]?.address);
  console.log("wallet", wallets)

  const isZeroAddress =
    wallets[0]?.address === '0x0000000000000000000000000000000000000000';

  const selectSeedPhrase = (state) => state.wallet.mnemonic;
  const seedPhraseword = useSelector(selectSeedPhrase);
  console.log("testseed", seedPhraseword)

  const openBottomSheetone = () => {
    if (bottomSheetR.current) {
      bottomSheetR.current.open();
    }
  };

  const bottomSheetRe = useRef();


  const openBottomSheett = () => {
    bottomSheetReff.current.open();
  };

  const closeBottomSheett = () => {
    bottomSheetReff.current.close();
  };

  const openBottomSheetchk = () => {
    if (bottomSheetRe.current) {
      bottomSheetRe.current.open();
    }
  };

  const closeBottomSheetchk = () => {
    bottomSheetRe.current.close();
  };


  const handleInputChange = (index, value) => {
    const updatedPhrase = [...recoveryPhrase];
    updatedPhrase[index] = value.toLowerCase(); // Make input lowercase
    setRecoveryPhrase(updatedPhrase);
  };


  const steps = [
    "Generating your Ethereum address",
    "Encrypting your private key using your PIN",
    "Saving your encrypted keys to a local secure vault on this device",
    "All done!\nYour wallet is now ready.",
  ];

  const createPassword = async (data) => {
    try {
      setLoading(true);
      const HDWallet = getHDWallet(0, mnemonic);
      let mnemonic = HDWallet?.seedPhrase;
      // console.log("HDWallet:", HDWallet);      
      dispatch(setAddress(HDWallet?.address));
      setDefaultAccount(HDWallet?.privateKey);
      dispatch(setPrivateKey(HDWallet?.privateKey));
      dispatch(setMnemonic(mnemonic));
      dispatch(
        createWallet({
          index: 0,
          address: HDWallet?.address,
          privateKey: HDWallet?.privateKey,
          name: 'Wallet-1',
          networks: AllChainIds,
          assets: WalletAssets,
          seed: mnemonic,
          transactions: all_chains_txns,
        })
      );
      dispatch(setActiveWallet(0));
      dispatch(setInitialised(true));
      setLoading(false);
      return HDWallet;
    } catch (e) {
      setLoading(false);
      return false;
    }
  };

  const handleRestoreWallet = () => {
    const mnemonic = recoveryPhrase.join(' ').trim();

    if (mnemonic.split(' ').length !== 12) {
      console.error('Please enter all 12 words correctly');
      return;
    }

    const restoredWallet = importWallet(mnemonic);

    if (restoredWallet) {
      dispatch(setAddress(restoredWallet.address));
      dispatch(setPrivateKey(restoredWallet.privateKey));
      console.log('Wallet restored:', restoredWallet);
    } else {
      console.error('Failed to restore the wallet');
    }
  };


  const startProgressSteps = () => {
    progressSheetRef.current.open();

    let stepInterval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev === steps.length - 1) {
          clearInterval(stepInterval);
        }
        return prev + 1;
      });
    }, 2000);

    Animated.loop(
      Animated.sequence([
        Animated.timing(cursorAnim, { toValue: 1, duration: 500, useNativeDriver: false }),
        Animated.timing(cursorAnim, { toValue: 0, duration: 500, useNativeDriver: false }),
      ])
    ).start();
  };

  const handleConfirmPinPress = async (num) => {
    if (confirmPin.length < 6) {
      setConfirmPin(confirmPin + num);
    }

    if (confirmPin.length + 1 === 6) {
      const finalPin = confirmPin + num;
      console.log("finalPin:", finalPin);
      console.log("pin:", pin);
      if (finalPin === pin) {
        confirmPinSheetRef.current.close();
        dispatch(setPincode(finalPin));
        await createPassword({});
        setTimeout(() => {
          startProgressSteps();
        }, 500);
      } else {
        alert('❌ PINs Do Not Match! Try Again.');
        setConfirmPin('');
      }
    }
  };


  const renderStep = (text, index) => {
    const isActive = index === currentStep;
    const isDone = index < currentStep;
    return (
      <Text
        key={index}
        style={[
          styles.stepText,
          isDone && styles.stepDone,
          isActive && styles.stepActive,
        ]}
      >
        {text}
      </Text>
    );
  };

  const handleBackspace = (isConfirm = false) => {
    if (isConfirm) {
      if (confirmPin && confirmPin.length > 0) {
        setConfirmPin(confirmPin.slice(0, -1));
      } else {
        console.log("No value to remove from confirmPin");
      }
    } else {
      if (pin && pin.length > 0) {
        setPin(pin.slice(0, -1));
      } else {
        console.log("No value to remove from pin");
      }
    }
  };


  const handlePinPress = (num) => {
    if (pin.length < 6) {
      setPin(pin + num);
    }
    if (pin.length + 1 === 6) {
      dispatch(setPincode(pin + num))
      setTimeout(() => {
        pinSheetRef.current.close();
        confirmPinSheetRef.current.open();
      }, 300);
    }
  };

  const renderDots = (value) => (
    <View style={styles.pinDotsContainer}>
      {value.padEnd(6, ' ').split('').map((item, index) => (
        <View
          key={index}
          style={[styles.pinDot, { backgroundColor: item.trim() ? '#000' : 'transparent' }]}
        />
      ))}
    </View>
  );

  const renderNumberPad = (onPressFunc, isConfirm = false) => (
    <View style={styles.numberPad}>
      {['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].map((num) => (
        <TouchableOpacity
          key={num}
          style={styles.numberKey}
          onPress={() => onPressFunc(num)}
        >
          <Text style={styles.numberText}>{num}</Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity
        style={styles.numberKey}
        onPress={() => handleBackspace(isConfirm)}
      >
        <MaterialCommunityIcons name="backspace-outline" size={24} color="#000" />
      </TouchableOpacity>
    </View>
  );

  const openBottomSheet = () => {
    bottomSheetRef.current.open();
    navigation.getParent()?.setOptions({
      tabBarStyle: { display: 'none' }
    });
  };

  const closeBottomSheet = () => {
    bottomSheetRef.current.close();
    navigation.getParent()?.setOptions({
      tabBarStyle: { display: 'flex' }
    });
  };

  const openPinModal = () => {
    bottomSheetRef.current.close();
    navigation.getParent()?.setOptions({
      tabBarStyle: { display: 'none' }
    });
    setTimeout(() => {
      pinSheetRef.current.open();
    }, 300);
  };

  const closePinModal = () => {
    pinSheetRef.current.close();
    navigation.getParent()?.setOptions({
      tabBarStyle: { display: 'flex' }
    });
  };


  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const selectNetwork = (networkindex) => {
    dispatch(setActiveNetwork(networkindex));
    setProvider(networks[networkindex]?.rpcUrl); // changing rpc in app
    setDropdownVisible(false);
  };


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <View style={{ position: 'relative' }}>
          <TouchableOpacity style={styles.networkButton} onPress={toggleDropdown}>
            <Image source={networks[activeNetwork]?.localicon ? networks[activeNetwork]?.chainIcon : { uri: networks[activeNetwork].chainIcon }} style={styles.networkIcon} />
            <Text style={styles.networkText}>{networks[activeNetwork].name}</Text>
            <Icon name="chevron-down" size={12} color="#000" style={styles.chevronIcon} />
          </TouchableOpacity>

          {dropdownVisible && (
            <View style={styles.dropdown}>
              {networks?.length && networks?.map((item, i) => (
                <TouchableOpacity key={item.name} style={styles.dropdownItem} onPress={() => selectNetwork(i)}>
                  <Image
                    source={item?.localicon ?
                      item?.chainIcon :
                      { uri: item.chainIcon }}
                    style={styles.dropdownItemImage}
                  />
                  <View>
                    <Text style={styles.dropdownItemText}>{item.name}</Text>
                    {item.subtitle ? <Text style={styles.dropdownItemSubText}>{item.subtitle}</Text> : null}
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}


        </View>



        <TouchableOpacity style={styles.iconCircle}
          onPress={() => scannerRef.current.open()}
        >
          <MaterialCommunityIcons name="qrcode-scan" size={22} color="#000" />
        </TouchableOpacity>
      </View>

      <Text style={styles.walletHeading}>Wallet</Text>

      <View style={styles.startCard}>

        <Text style={styles.startTitle}>
          My main account
        </Text>
        <Text style={styles.startTitle}>
          {wallets}
        </Text>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.startTitle}>$0.00</Text>
          <MaterialCommunityIcons name="arrow-up-right" size={20} color="#000" style={{ marginLeft: 5 }} />
        </View>

        <Text style={styles.startTitle}>
          0 ETH
          and no tokens
        </Text>
      </View>


      <View style={styles.containerTot}>

        <View style={styles.topButtonsContainerTot}>
          <TouchableOpacity style={styles.actionButtonTot}>
            <MaterialCommunityIcons name="download" size={26} color="#00C875" />
            <Text style={styles.buttonTitleTot}>Receive</Text>
            <Text style={styles.buttonSubtitleTot}>From existing wallet</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButtonTot}>
            <MaterialCommunityIcons name="credit-card-outline" size={26} color="#00C875" />
            <Text style={styles.buttonTitleTot}>Buy Ether</Text>
            <Text style={styles.buttonSubtitleTot}>Visa or Mastercard</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.cardTot}>
          <View style={styles.warningRowTot}>
            <MaterialCommunityIcons name="shield-alert" size={24} color="#D70000" />
            <Text style={styles.cardTitleTot}>
              {'  '}Action required: <Text style={styles.boldTextTot}>not backed up</Text>
            </Text>
          </View>
          <Text style={styles.cardBodyTot}>
            If your device gets lost or stolen, or if there's an unexpected hardware error, you will lose your funds forever.
          </Text>
          <TouchableOpacity>
            <Text style={styles.backupTextTot}>BACK UP NOW</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionHeading}>Other things</Text>

        <TouchableOpacity style={styles.sectionItem}>
          <Icon name="book" size={18} color="#000" style={styles.sectionIcon} />
          <Text style={styles.sectionText}>Education center</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.sectionItem}>
          <Icon name="cog" size={18} color="#000" style={styles.sectionIcon} />
          <Text style={styles.sectionText}>Settings and support</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.sectionItem}>
          <Icon name="heart" size={18} color="#000" style={styles.sectionIcon} />
          <Text style={styles.sectionText}>Donate</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.supportCard}>
        <View style={styles.supportTextContainer}>
          <Text style={styles.supportTitle}>Getting started guides</Text>
          <Text style={styles.supportSubtitle}>Learn what you can do in MEW and how to do it.</Text>
        </View>
        <Image source={require('../../../assets/home/Asset12.png')}
          style={styles.supportImage} />

      </View>

      <View style={styles.supportCard}>
        <View style={styles.supportTextContainer}>
          <Text style={styles.supportTitle}>Contact support</Text>
          <Text style={styles.supportSubtitle}>Our friendly support team is here to help.</Text>
        </View>
        <Image source={require('../../../assets/home/Asset.png')} style={styles.supportImage} />
      </View> */}

      <RBSheet
        ref={bottomSheetRef}
        closeOnDragDown={true}
        closeOnPressMask={true}
        height={screenHeight * 0.85}
        customStyles={{
          container: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            paddingHorizontal: 24,
            paddingTop: 24,
          },
        }}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <TouchableOpacity onPress={closeBottomSheet} style={styles.safetyClose}>
            <Text style={styles.safetyCloseText}>×</Text>
          </TouchableOpacity>

          <Image
            source={require('../../../assets/home/robot.png')}
            style={styles.safetyImage}
            resizeMode="contain"
          />

          <Text style={styles.safetyTitle}>Crypto safety 101</Text>
          <Text style={styles.safetySubheading}>
            In crypto you are your own bank. With that great power comes great responsibility.
          </Text>

          {[1, 2, 3].map((item) => (
            <View key={item} style={styles.safetyTipBlock}>
              <View style={styles.safetyNumberCircle}>
                <Text style={styles.safetyNumberText}>{item}</Text>
              </View>
              <View style={styles.safetyTipTextBlock}>
                <Text style={styles.safetyTipTitle}>
                  {item === 1
                    ? 'Back it up, and keep your backup safe'
                    : item === 2
                      ? 'Always double-check everything'
                      : 'Be wary of phishing and scams'}
                </Text>
                <Text style={styles.safetyTipDescription}>
                  {item === 1
                    ? 'If you lose your wallet backup information, no one (not even MEWforce) can recover it, and you will lose your funds.'
                    : item === 2
                      ? 'If you send assets to the wrong address, no one can reverse or recover that transaction, and you will lose your funds.'
                      : 'If someone offers you something that is too good to be true, it probably is.'}
                </Text>
              </View>
            </View>
          ))}

          <TouchableOpacity
            style={styles.safetyCTA}
            onPress={() => {
              bottomSheetRef.current.close();
              setTimeout(() => pinSheetRef.current.open(), 300);
            }}
          >
            <Text style={styles.safetyCTAText}>CREATE A WALLET</Text>
          </TouchableOpacity>
        </ScrollView>
      </RBSheet>

      <RBSheet
        ref={pinSheetRef}
        closeOnDragDown={false}
        closeOnPressMask={false}
        height={screenHeight * 0.9}
        customStyles={{
          container: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            paddingTop: 30,
            paddingHorizontal: 25,
          },
        }}
      >
        <TouchableOpacity
          onPress={() => pinSheetRef.current.close()}
          style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 25 }}
        >
          <MaterialCommunityIcons name="arrow-left" size={24} color="#000" />
          <Text style={{ fontSize: 16, fontWeight: '600', marginLeft: 10 }}>Create a wallet</Text>
        </TouchableOpacity>

        <Text style={{ fontSize: 26, fontWeight: 'bold', marginBottom: 8 }}>Create a PIN</Text>
        <Text style={{ fontSize: 14, color: '#666', marginBottom: 40 }}>
          So no one else but you can unlock your wallet.
        </Text>

        {renderDots(pin)}

        <Text style={{ fontSize: 12, color: '#888', textAlign: 'center', marginTop: 40, marginBottom: 20 }}>
          PINs are just as secure as long passwords, but easier to use and remember.
        </Text>

        {renderNumberPad(handlePinPress)}
      </RBSheet>

      <RBSheet
        ref={confirmPinSheetRef}
        closeOnDragDown={false}
        closeOnPressMask={false}
        height={screenHeight * 0.9}
        customStyles={{
          container: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            paddingTop: 30,
            paddingHorizontal: 25,
          },
        }}
      >
        <TouchableOpacity
          onPress={() => confirmPinSheetRef.current.close()}
          style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 25 }}
        >
          <MaterialCommunityIcons name="arrow-left" size={24} color="#000" />
          <Text style={{ fontSize: 16, fontWeight: '600', marginLeft: 10 }}>Create a wallet</Text>
        </TouchableOpacity>

        <Text style={{ fontSize: 26, fontWeight: 'bold', marginBottom: 8 }}>Type your PIN again</Text>
        <Text style={{ fontSize: 14, color: '#666', marginBottom: 40 }}>
          There will be <Text style={{ fontWeight: 'bold', color: '#00C2AA' }}>NO 'Restore PIN' button</Text>.{"\n"}
          Make sure you remember it.
        </Text>

        {renderDots(confirmPin)}

        <Text style={{ fontSize: 12, color: '#888', textAlign: 'center', marginTop: 40, marginBottom: 20 }}>
          Since you're going to be your own bank, we won’t be able to help if you lose your PIN.
        </Text>

        {renderNumberPad(handleConfirmPinPress, true)}
      </RBSheet>

      <RBSheet
        ref={scannerSheetRef}
        closeOnDragDown={true}
        closeOnPressMask={true}
        height={400}
        customStyles={{
          container: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            alignItems: 'center',
            padding: 25,
          },
        }}
      >
        <TouchableOpacity style={styles.crossButton} onPress={() => scannerSheetRef.current.close()}>
          <Text style={styles.crossText}>×</Text>
        </TouchableOpacity>
        <Text style={styles.modalTitle}>
          Please create a wallet,{'\n'}in order to use QR code scanner.
        </Text>
        <Text style={styles.modalSubtitle}>
          QR code scanner allows quickly scanning ETH addresses to send ETH and Tokens...
        </Text>
        <TouchableOpacity style={styles.createWalletButton}>
          <Text style={styles.createWalletButtonText}>CREATE A WALLET</Text>
        </TouchableOpacity>
      </RBSheet>

      <RBSheet
        ref={progressSheetRef}
        height={screenHeight * 0.6}
        customStyles={{
          container: {
            padding: 20,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          },
        }}
      >
        <View>
          {steps.map((step, index) => renderStep(step, index))}

          {currentStep >= steps.length - 1 && (
            <>
              <Animated.View
                style={[styles.cursor, { opacity: cursorAnim }]}
              />
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>START USING WALLET</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </RBSheet>


      <RBSheet
        ref={scannerRef}
        closeOnDragDown={true}
        closeOnPressMask={true}
        height={570}
        customStyles={{
          container: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            padding: 20,
          },
        }}
      >
        <Text style={styles.heading}>Current network fees</Text>

        <View style={styles.gasRow}>
          <View style={styles.gasLeft}>
            <MaterialCommunityIcons name="gas-station-outline" size={20} color={'#000'} />
            <Text style={styles.gasText}>0 gwei</Text>
          </View>
          <Text style={styles.ethValue}>$1,831.77</Text>
        </View>

        <Text style={styles.subheading}>How much Ether do I need?</Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Send Ether</Text>
          <View style={styles.cardRight}>
            <Text style={styles.cardCost}>$0.03</Text>
            <Text style={styles.cardSub}>0.000153 ETH</Text>
          </View>
        </View>

        <View style={styles.card}>
          <View>
            <Text style={styles.cardTitle}>Send Tokens</Text>
            <Text style={styles.cardSub}>Depends on the token</Text>
          </View>
          <View style={styles.cardRight}>
            <Text style={styles.cardCost}>$0.11–$0.20</Text>
            <Text style={styles.cardSub}>0.0000583 ETH–{"\n"}0.000109 ETH</Text>
          </View>
        </View>

        <View style={styles.card}>
          <View>
            <Text style={styles.cardTitle}>Swap tokens</Text>
            <Text style={styles.cardSub}>Depends on pair and provider</Text>
          </View>
          <View style={styles.cardRight}>
            <Text style={styles.cardCost}>$0.53–$1.07</Text>
            <Text style={styles.cardSub}>0.000291 ETH–{"\n"}0.000583 ETH</Text>
          </View>
        </View>

        <Text style={styles.infoText}>
          Every transaction requires a small amount of Ether to execute. Fees are collected by Ethereum miners and depend on network congestion.
        </Text>

        <TouchableOpacity style={styles.buyButton}>
          <Text style={styles.buyText}>BUY ETHER</Text>
        </TouchableOpacity>

        <Text style={styles.footer}>HOW ARE FEES DETERMINED?</Text>
      </RBSheet>

      <RBSheet
        ref={bottomSheetReff}
        closeOnDragDown={true}
        closeOnPressMask={true}
        height={800}
        customStyles={{
          container: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            padding: 20,
          },
        }}
      >
        <View style={styles.closeButtonContainer}>
          <TouchableOpacity onPress={closeBottomSheett} style={styles.closeButton}>
            <MaterialCommunityIcons name="close" size={24} color="#000" />
          </TouchableOpacity>
        </View>

        <Text style={styles.titleimport}>Already have a wallet?</Text>

        <TouchableOpacity style={styles.optionContainer}>
          <MaterialCommunityIcons name="file-document" size={24} color="#000" style={styles.optionIcon} />
          <View style={styles.textContainer}>


            <TouchableOpacity onPress={openBottomSheetchk} style={styles.optionText}>
              <Text style={styles.createText}>Restore with recovery phrase</Text>
            </TouchableOpacity>

            <Text style={styles.optionDescription}>
              Restore full access to your existing wallet using a secret recovery phrase.
            </Text>
          </View>
        </TouchableOpacity>

        <View style={styles.divider} />

        <TouchableOpacity style={styles.optionContainer}>
          <MaterialCommunityIcons name="eye" size={24} color="#000" style={styles.optionIcon} />
          <View style={styles.textContainer}>
            <Text style={styles.optionText}>Import a watch-only account</Text>
            <Text style={styles.optionDescription}>
              Watch-only accounts have limited functionality.
            </Text>
          </View>
        </TouchableOpacity>
      </RBSheet>

      <RBSheet
        ref={bottomSheetRe}
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
        <ScrollView contentContainerStyle={styles.container}>

          <View style={styles.closeButtonContainer}>
            <TouchableOpacity onPress={() => bottomSheetRe.current.close()} style={styles.closeButton}>
              <MaterialCommunityIcons name="close" size={24} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleRestoreWallet}>
              <Text
                style={styles.restoreText}>RESTORE</Text>
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

    </ScrollView>
  );
};

export default NewWalletScreen;