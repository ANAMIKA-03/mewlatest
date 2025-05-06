import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  FlatList,
  Platform,
  Image,
  TextInput,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveNetwork } from '../../redux/walletSlice';
import { setProvider } from '../../utils/web3/web3';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import RBSheet from 'react-native-raw-bottom-sheet';


const NewWalletScreen = () => {
  const { networks, activeNetwork } = useSelector(state => state.wallet)
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [isBackedUp, setIsBackedUp] = useState(false);
  const refAddAccountSheet = useRef();
  const [nickname, setNickname] = useState('');
  const [cards, setCards] = useState([
    { type: 'wallet', gradient: ['#b5de2e', '#c7f526', '#c1ff5a'], address: '0xE38B...5Db5' },
    { type: 'addAccount' }
  ]);

  const refRBSheet = useRef();
  const refRBSheetword = useRef();
  const refRBSheetwordfinish = useRef();


  const dispatch = useDispatch();
  const navigation = useNavigation();

  const gradientPool = [
    ['#b5de2e', '#c7f526', '#c1ff5a'],
    ['#ff9a9e', '#fad0c4', '#fad0c4'],
    ['#a18cd1', '#fbc2eb', '#fbc2eb'],
    ['#f6d365', '#fda085', '#fda085'],
    ['#84fab0', '#8fd3f4', '#8fd3f4'],
    ['#a6c0fe', '#f68084', '#f68084'],
    ['#fccb90', '#d57eeb', '#d57eeb'],
  ];

  const addNewWalletCard = () => {
    const newGradient = gradientPool[Math.floor(Math.random() * gradientPool.length)];
    const newAddress = '0x' + Math.random().toString(16).substr(2, 8) + '...' + Math.random().toString(16).substr(2, 4);
    const newCard = { type: 'wallet', gradient: newGradient, address: newAddress };

    const updatedCards = [...cards.filter(c => c.type !== 'addAccount'), newCard, { type: 'addAccount' }];
    setCards(updatedCards);
  };

  const renderCard = (item) => {
    if (item.type === 'wallet') {
      return (
        <LinearGradient
          colors={item.gradient}
          style={styles.card}
        >
          <Text style={styles.accountLabel}>My main account</Text>
          <Text style={styles.address}>0xE38B...5Db5</Text>
          <View style={styles.balanceRow}>
            <Text style={styles.balance}>$0.00 </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Transaction')}>
              <Icon name="chevron-right" size={wp('7%')} color="white" />
            </TouchableOpacity>
          </View>
          <Text style={styles.ethText}>0 ETH and no tokens</Text>
          <View style={styles.iconRow}>
            <Icon name="arrow-down-bold" size={wp('6%')} color="white" style={styles.icon} />
            <Icon name="arrow-up-bold" size={wp('6%')} color="white" style={styles.icon} />
          </View>
        </LinearGradient>
      );
    } else {
      return (
        <View style={[styles.card, styles.addCard]}>
          <Text style={styles.addTitle}>Add more accounts</Text>
          <Text style={styles.addSub}>Use accounts to manage your assets separately</Text>
          <TouchableOpacity
            style={styles.addBtn}
            onPress={addNewWalletCard} // 👈 attach here
          >
            <Icon name="plus" size={wp('4%')} color="white" />
            <Text style={styles.addBtnText}>ADD NEW ACCOUNT</Text>
          </TouchableOpacity>
        </View>
      );
    }
  };


  const selectNetwork = (networkindex) => {
    dispatch(setActiveNetwork(networkindex));
    setProvider(networks[networkindex]?.rpcUrl);
    setDropdownVisible(false);
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const recoveryWords = [
    'obey', 'index', 'cable', 'light', 'echo', 'focus',
    'jazz', 'stamp', 'lunar', 'magic', 'spoon', 'zebra'
  ];


  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

      <View style={styles.header}>
        <View style={{ position: 'relative' }}>
          <TouchableOpacity style={styles.networkButton} onPress={toggleDropdown}>
            <Image source={networks[activeNetwork]?.localicon ? networks[activeNetwork]?.chainIcon : { uri: networks[activeNetwork].chainIcon }} style={styles.networkIcon} />
            <Text style={styles.networkText}>{networks[activeNetwork].name}</Text>
            <Icon name="chevron-down" size={18} color="#000" style={styles.chevronIcon} />
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
        >
          <MaterialCommunityIcons name="qrcode-scan" size={22} color="#000" />
        </TouchableOpacity>
      </View>

      <FlatList
        horizontal
        data={cards}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => renderCard(item)}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatListSpacing}
      />


      <View style={styles.actionRow}>
        <TouchableOpacity style={styles.actionCard}>
          <Image source={require('../../../assets/home/receive.png')}
          style={styles.supportImagee} />
          <Text style={styles.actionText}>Receive</Text>
          <Text style={styles.subText}>From existing wallet</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionCard}>
          <Image source={require('../../../assets/home/buy.png')}
 style={styles.supportImagee} />
          <Text style={styles.actionText}>Buy Crypto</Text>
          <Text style={styles.subText}>Visa or Mastercard</Text>
        </TouchableOpacity>
      </View>
      {!isBackedUp && (
        <View style={styles.warningCard}>
          <MaterialCommunityIcons name="shield-alert" size={22} color="red" />
          <Text style={styles.warningText}>Action required: not backed up</Text>
          <Text style={styles.warningDesc}>
            If your device gets lost or stolen, or if there's an unexpected hardware error, you will lose your funds forever.
          </Text>


          <TouchableOpacity
            style={styles.backupButton}
            onPress={() => refRBSheet.current.open()}
          >
            <Text style={styles.backupText}>BACK UP NOW</Text>
          </TouchableOpacity>

        </View>
      )}

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionHeading}>Other things</Text>

        <TouchableOpacity style={styles.sectionItem}>
          <Image source={require('../../../assets/home/Assetbookh.png')}
            style={styles.sectionIcon} />
          <Text style={styles.sectionText}>Education center</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.sectionItem}>
          <Image source={require('../../../assets/home/Assetsetting.png')}
            style={styles.sectionIcon} />
          <Text style={styles.sectionText}>Settings and support</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.sectionItem}>
          <Image source={require('../../../assets/home/AssetDonate.png')}
            style={styles.sectionIcon} />
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
      </View>

      <RBSheet
        ref={refRBSheet}
        height={780}
        openDuration={250}
        customStyles={{
          container: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            paddingHorizontal: 20,
            paddingVertical: 25,
          },
        }}
      >
        <View style={styles.contentback}>

          <MaterialCommunityIcons
            name="close"
            size={24}
            color="#000"
            onPress={() => refRBSheet.current.close()}
          />
          <MaterialCommunityIcons
            name="shield-alert-outline"
            size={300}
            color="#000"
          />
          {/* <Text style={styles.headingback}>Back up your wallet</Text> */}
          <Text style={styles.headingback}>Back up your{"\n"}wallet</Text>
          <Text style={styles.descriptionback}>
            With MEW wallet you are your own bank. No one but you has access to your private key. Not even MEWforce.
          </Text>
          <Text style={styles.descriptionback}>
            Without a backup, if you lose your device, or even simply delete the app, you will lose your funds forever.
          </Text>
          <TouchableOpacity style={styles.backupButtonback}
            onPress={() => refRBSheetword.current.open()}
          >
            <Text style={styles.backupButtonTextback}>BACK UP NOW</Text>
          </TouchableOpacity>
        </View>
      </RBSheet>

      <RBSheet
        ref={refRBSheetword}
        height={780}
        openDuration={250}
        customStyles={{
          container: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            paddingHorizontal: 20,
            paddingVertical: 25,
          },
        }}
      >
        <View style={styles.sheetContainercode}>
          <Text style={styles.headerTextcode}>Here is your{"\n"}recovery phrase</Text>
          <Text style={styles.subTextcode}>Write it down on paper.Resist temptation to email it to yourself or screenshot it.</Text>

          <View style={styles.recoveryBoxcode}>
            <View style={styles.columncode}>
              {recoveryWords.slice(0, 6).map((word, index) => (
                <Text key={index} style={styles.wordTextcode}>
                  {index + 1}. {word}
                </Text>
              ))}
            </View>
            <View style={styles.columncode}>
              {recoveryWords.slice(6, 12).map((word, index) => (
                <Text key={index + 6} style={styles.wordTextcode}>
                  {index + 7}. {word}
                </Text>
              ))}
            </View>
          </View>

          <TouchableOpacity
            style={styles.backupButtoncode}
            onPress={() => refRBSheetwordfinish.current.open()}
          >
            <Text style={styles.backupButtonTextcode}>FINISH</Text>
          </TouchableOpacity>
        </View>
      </RBSheet>

      <RBSheet
        ref={refRBSheetwordfinish}
        height={780}
        openDuration={250}
        customStyles={{
          container: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            padding: 20,
            alignItems: 'center',
          },
        }}
      >

        <View style={styles.sheetContainercode}>
          <MaterialCommunityIcons
            name="shield-check-outline"
            size={300}
            color="#000"
          />
          <Text style={styles.titlefinish}>Your wallet is now{"\n"}backed up!</Text>
          <Text style={styles.descriptionfinish}>
            Don’t show your recovery phrase to anyone.
            Protect it like the ELEVENTEEN GOOGILLION dollars
            it will one day be worth (probably).
          </Text>

          <TouchableOpacity
            style={styles.doneButtonfinish}
            onPress={() => {
              setIsBackedUp(true);
              refRBSheetwordfinish.current.close();
              refRBSheetword.current.close();
              refRBSheet.current.close();
            }}
          >
            <Text style={styles.doneButtonTextfinish}>DONE</Text>
          </TouchableOpacity>
        </View>
      </RBSheet>


      <RBSheet
        ref={refAddAccountSheet}
        height={780}
        openDuration={250}
        customStyles={{
          container: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            padding: 20,
            alignItems: 'center',
          },
        }}
      >
        <Text style={styles.sheetTitleaccount}>Add Account</Text>
        <Text style={styles.sheetLabelaccount}>Account Nickname</Text>

        <TextInput
          style={styles.inputaccount}
          placeholder="e.g. Private funds, Airdrops"
          value={nickname}
          onChangeText={text => setNickname(text)}
          placeholderTextColor="#999"
        />

        <TouchableOpacity
          style={[
            styles.addButtonaccount,
            { backgroundColor: nickname ? '#00C2AA' : '#ccc' }
          ]}
          disabled={!nickname}
          onPress={() => {
            // You can save the nickname here
            refAddAccountSheet.current.close();
            setNickname('');
          }}
        >
          <Text style={styles.addButtonTextaccount}>Add</Text>
        </TouchableOpacity>
      </RBSheet>


      <RBSheet
        ref={refRBSheet}
        height={280}
        openDuration={250}
        customStyles={{
          container: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            padding: 20,
            backgroundColor: 'white',
            alignItems: 'center',
          },
        }}
      >
        <Text style={styles.title}>Your ETH balance is too low</Text>
        <Text style={styles.description}>
          Every transaction on Ethereum requires a gas fee, payable only in ETH. When your ETH balance is low, you won't be able to send or swap tokens until you add more ETH to your wallet. Purchase more ETH directly on the Swap tab.
        </Text>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>FUND MY ACCOUNT</Text>
        </TouchableOpacity>
      </RBSheet>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: wp('4%'),
    backgroundColor: 'white',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight || hp('5%') : hp('5%'),
    paddingBottom: hp('3%'),
  },
  flatListSpacing: {
    paddingBottom: hp('1%'),
  },
  card: {
    width: wp('70%'),
    height: hp('20%'),
    borderRadius: wp('4%'),
    padding: wp('4%'),
    marginRight: wp('4%'),
    justifyContent: 'space-between',
  },
  addCard: {
    borderWidth: 1,
    borderColor: '#00C2AA',
    backgroundColor: '#fff',
  },
  accountLabel: {
    color: '#fff',
    fontSize: wp('4%'),
    fontWeight: '600',
  },
  address: {
    top: wp("7%"),
    color: '#fff',
    fontSize: wp('3.5%'),
  },
  balance: {
    fontSize: wp('6.5%'),
    color: '#fff',
    fontWeight: 'bold',
  },
  ethText: {
    color: '#fff',
    fontSize: wp('3.4%'),
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: hp('1%'),
  },
  icon: {
    marginLeft: wp('3%'),
  },
  tipText: {
    textAlign: 'center',
    fontWeight: '500',
    color: 'gray',
    marginVertical: hp('1.5%'),
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp('2%'),
  },
  actionCard: {
    width: wp('44%'),
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: wp('3%'),
    padding: wp('3%'),
    alignItems: 'center',
    backgroundColor: 'white',
  },
  actionText: {
    fontWeight: '600',
    marginTop: hp('1%'),
    fontSize: wp('4%'),
  },
  subText: {
    fontSize: wp('3%'),
    color: 'gray',
    marginTop: hp('0.5%'),
    textAlign: 'center',
  },
  warningCard: {
    backgroundColor: '#fff',
    padding: wp('4%'),
    borderRadius: wp('3%'),
    borderWidth: 0.6,
    borderColor: '#ccc',
  },
  warningText: {
    color: '#000',
    fontWeight: '500',
    marginBottom: hp('0.5%'),
  },
  warningDesc: {
    color: '#ccc',
    marginBottom: hp('1.5%'),
  },
  backupButton: {
    alignSelf: 'flex-start',
    paddingHorizontal: wp('-1%'),
    paddingVertical: hp('1%'),
    borderRadius: wp('2%'),
    alignSelf: 'flex-start',
  },
  backupText: {
    color: '#00C2AA',
    fontWeight: '600',
    justifyContent: "flex-start",
    alignSelf: 'flex-start',
  },
  addTitle: {
    fontSize: wp('5%'),
    fontWeight: '700',
    color: '#00C2AA',
  },
  addSub: {
    fontSize: wp('3.4%'),
    color: 'gray',
    marginVertical: hp('1%'),
  },
  addBtn: {
    flexDirection: 'row',
    backgroundColor: '#00C2AA',
    paddingVertical: hp('1.2%'),
    justifyContent: 'center',
    borderRadius: wp('2%'),
    marginBottom: hp('1.5%'),
  },
  addBtnText: {
    color: 'white',
    fontWeight: '600',
    fontSize: wp('3.8%'),
    marginLeft: wp('2%'),
  },
  sectionContainer: {
    marginTop: 20,
    paddingHorizontal: wp('4%'),
  },
  sectionHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  sectionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  sectionIcon: {
    marginRight: 15,
    height: wp("4.4%"),
    width: wp("5%"),
  },
  sectionText: {
    fontSize: 16,
    color: '#000',
  },
  supportCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 15,
    marginTop: 20,
    marginHorizontal: 0, // remove previous horizontal margin
    paddingHorizontal: wp('4%'), // add horizontal padding to match
  },
  supportImage: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    marginRight: 15,
  },
  supportTextContainer: {
    flex: 1,
  },
  supportTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  supportSubtitle: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 1,
    paddingTop: 20,
  },
  networkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  networkIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  networkText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  chevronIcon: {
    marginLeft: 5,
  },
  iconCircle: {
    borderRadius: 25,
    padding: 10,
  },
  dropdown: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginTop: 1,
    width: 200,
    position: 'absolute',
    zIndex: 999,
    top: 45,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  dropdownItemImage: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  dropdownItemText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  dropdownItemSubText: {
    fontSize: 11,
    color: '#666',
  },
  balanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  descriptionback: {
    color: '#444',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 10,
  },
  backupButtonback: {
    marginTop: 20,
    backgroundColor: '#00C2AA',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 6,
  },
  backupButtonTextback: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  contentback: {
    alignItems: 'flex-start',
    width: '100%',
  },
  headingback: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 12,
    color: '#000',
    textAlign: 'left',
  },
  descriptionback: {
    color: '#444',
    fontSize: 14,
    textAlign: 'left',
    marginBottom: 10,
    width: '100%',
  },
  sheetContainercode: {
    alignItems: "flex-start",
    width: '100%',
  },
  headerTextcode: {
    fontSize: 20,
    fontWeight: 'bold',
    alignItems: "flex-start",
    marginBottom: 5,
    color: '#000',
  },
  subTextcode: {
    fontSize: 14,
    color: '#666',
    alignItems: "flex-start",
    marginBottom: 15,
  },
  recoveryBoxcode: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 8,
    padding: 15,
    width: '100%',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  columncode: {
    flex: 1,
  },
  wordTextcode: {
    fontSize: 16,
    color: '#000',
    marginBottom: 8,
  },
  backupButtoncode: {
    backgroundColor: '#00C2AA',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 6,
  },
  backupButtonTextcode: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  titlefinish: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 60,
    alignItems: "flex-start",
    color: '#000',
  },
  descriptionfinish: {
    alignItems: "flex-start",
    marginTop: 15,
    fontSize: 14,
    color: '#555',
    paddingHorizontal: 10,
  },
  doneButtonfinish: {
    marginTop: 30,
    backgroundColor: '#00C2AA',
    paddingVertical: 12,
    paddingHorizontal: 35,
    borderRadius: 8,
  },
  doneButtonTextfinish: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  sheetTitleaccount: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
    alignSelf: 'flex-start',
  },
  sheetLabelaccount: {
    fontSize: 16,
    alignSelf: 'flex-start',
    marginBottom: 5,
    color: '#333',
  },
  inputaccount: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    color: '#000',
  },
  addButtonaccount: {
    width: '100%',
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  addButtonTextaccount: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  supportImagee: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    marginRight: 15,
    },

});

export default NewWalletScreen;
