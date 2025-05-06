import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Image,
  TextInput,
  FlatList
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { setActiveNetwork } from '../../redux/walletSlice';
import { setProvider } from '../../utils/web3/web3';
import RBSheet from 'react-native-raw-bottom-sheet';
import QRCode from 'react-native-qrcode-svg';

const tokens = [
  { symbol: 'ETH', price: '$1,795.26', marketCap: '$216.70 bil', change: '-0.69%', color: 'red', icon: require('../../../assets/chainicons/bnb.png') },
  { symbol: 'USDC', price: '$1.00', marketCap: '$61.75 bil', change: '+2.01%', color: 'green', icon: require('../../../assets/chainicons/bnb.png') },
  { symbol: 'ZK', price: '$0.0509', marketCap: '$187.38 mil', change: '-3.06%', color: 'red', icon: require('../../../assets/chainicons/bnb.png') },
  { symbol: 'DAI', price: '$1.00', marketCap: '$389.79 mil', change: '-0.02%', color: 'red', icon: require('../../../assets/chainicons/bnb.png') },
  { symbol: 'USDT', price: '$1.00', marketCap: '$0', change: '-0.12%', color: 'red', icon: require('../../../assets/chainicons/bnb.png') },
];


const TransactionScreen = () => {
  const [activeTab, setActiveTab] = useState('Assets');
  const { networks, activeNetwork } = useSelector(state => state.wallet)
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const refRBSheet = useRef();
  const refRBSheetopen = useRef();
  const refRBSheetsend = useRef();

  const address = "0xE38B...5Db5";

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Assets':
        return (
          <View style={styles.tokenRow}>
            <Icon name="ethereum" size={wp('8%')} color="#000" />
            <View style={{ marginLeft: wp('3%') }}>
              <Text style={styles.tokenName}>Ethereum</Text>
              <Text style={styles.tokenSubtitle}>0 ETH</Text>
            </View>
            <View style={styles.tokenRight}>
              <Text style={styles.tokenGrowth}>+ 0.26%</Text>
              <Text style={styles.tokenPrice}>$0\n@ $1819.88</Text>
            </View>
          </View>
        );
      case 'NFTs':
        return <Text style={styles.emptyMsg}>Your NFTs will be shown here.</Text>;
      case 'Transactions':
        return <Text style={styles.emptyMsg}>Account transactions will be displayed here</Text>;
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

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

      <View style={styles.topBar}>
        <Text style={styles.centerTitle}>My main account</Text>
        <View style={styles.headermain}>
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
        </View>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeIcon}>
          <Icon name="close" size={wp('6%')} />
        </TouchableOpacity>
      </View>

      <View style={styles.divider} />

      <View style={styles.header}>
        <Image
          source={require('../../../assets/home/apple.png')}
          style={styles.avatar}
        />
        <View style={{ flex: 1, marginLeft: wp('2%') }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.title}>My main account</Text>
          </View>
          <Text style={styles.subtitle}>0xE38B...5Db5</Text>
        </View>
      </View>

      <Text style={styles.balance}>$0.00</Text>

      <View style={styles.actionRow}>
        {['Deposit', 'Buy', 'Send', 'Swap'].map((action, index) => (
          <TouchableOpacity
            style={styles.actionBox}
            key={index}
            onPress={() => {
              if (['Deposit'].includes(action)) {
                refRBSheet.current.open();
              } else if (['Buy'].includes(action)){
                refRBSheetopen.current.open(); 
                 }
                else if(['Send'].includes(action)){
                  refRBSheetsend.current.open();
                }
              else {
                console.log(`${action} pressed`);
              }
            }}>
            <Icon
              name={
                action === 'Deposit'
                  ? 'arrow-down-bold-circle-outline'
                  : action === 'Buy'
                    ? 'credit-card-outline'
                    : action === 'Send'
                      ? 'arrow-up-bold-circle-outline'
                      : 'swap-horizontal'
              }
              size={wp('6.5%')}
              color="#00C2AA"
            />
            <Text style={styles.actionLabel}>{action}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.tabRow}>
        {['Assets', 'Transactions'].map(tab => (
          <TouchableOpacity key={tab} onPress={() => setActiveTab(tab)} style={styles.tabBox}>
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
            {activeTab === tab && <View style={styles.activeTabLineSingle} />}
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.tabContent}>
        {renderTabContent()}
      </ScrollView>


      <RBSheet
        ref={refRBSheet}
        height={450}
        openDuration={250}
        customStyles={{
          container: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            padding: 20,
            backgroundColor: 'white',
          },
        }}
      >
        <View style={styles.headerRow}>
          <Text style={styles.title}>Your zkSync address</Text>
          <TouchableOpacity onPress={() => refRBSheet.current.close()}>
            <Icon name="close" size={20} color="#000" />
          </TouchableOpacity>
        </View>
        <Text style={styles.subtext}>You can send ETH or any ERC-20 token to this address using zkSync network.</Text>

        <View style={styles.qrContainer}>
          <View style={styles.qrCard}>
            <QRCode value={address} size={140} />
            <View style={styles.addressBox}>
              <Text style={styles.addressText}>{address}</Text>
            </View>
          </View>
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.copyBtn}>
            <Text style={styles.copyText}>COPY</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.shareBtn}>
            <Icon name="share-variant" color={'white'} size={16} />
            <Text style={styles.shareText}>SHARE</Text>
          </TouchableOpacity>
        </View>
      </RBSheet>

      <RBSheet
        ref={refRBSheetopen}
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
        <Text style={styles.titlebuy}>Your ETH balance is too low</Text>
        <Text style={styles.descriptionbuy}>
          Every transaction on Ethereum requires a gas fee, payable only in ETH. When your ETH balance is low, you won't be able to send or swap tokens until you add more ETH to your wallet. Purchase more ETH directly on the Swap tab.
        </Text>

        <TouchableOpacity style={styles.buttonbuy}>
          <Text style={styles.buttonTextbuy}>FUND MY ACCOUNT</Text>
        </TouchableOpacity>
      </RBSheet>


      <RBSheet
        ref={refRBSheetsend}
        height={500}
        openDuration={250}
        customStyles={{
          container: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            backgroundColor: 'white',
            paddingHorizontal: 20,
            paddingTop: 20
          },
        }}
      >
        <View style={styles.headerRowsend}>
          <Text style={styles.headerTextsend}>Select token to buy</Text>
          <Icon name="close" size={22} onPress={() => refRBSheetsend.current.close()} />
        </View>

        <TextInput placeholder="Search token" style={styles.searchInputsend} />

        <FlatList
          data={tokens}
          keyExtractor={(item) => item.symbol}
          renderItem={({ item }) => (
            <View style={styles.tokenRowsend}>
              <View style={styles.tokenLeftsend}>
                <Image source={item.icon} style={styles.tokenIconsend} />
                <Text style={styles.tokenSymbolsend}>{item.symbol}</Text>
              </View>
              <View style={styles.tokenMidsend}>
                <Text style={styles.tokenPricesend}>{item.price}</Text>
                <Text style={styles.tokenCapsend}>{item.marketCap}</Text>
              </View>
              <View style={styles.tokenRightsend}>
                <Text style={[styles.tokenChangesend, { color: item.color }]}>{item.change}</Text>
                <TouchableOpacity style={styles.buyButtonsend}>
                  <Text style={styles.buyButtonTextsend}>Buy</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </RBSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    paddingTop: hp('6%'),
    paddingHorizontal: wp('5%'),
  },
  topBar: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: hp('1%'),
  },
  centerTitle: {
    fontSize: wp('4.5%'),
    fontWeight: '600',
  },
  closeIcon: {
    position: 'absolute',
    right: 0,
    top: 0,
  },
  divider: {
    height: 0.4,
    backgroundColor: '#ccc',
    marginBottom: hp('3%'),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('2%'),
  },
  avatar: {
    width: wp('6%'),
    height: wp('6%'),
    borderRadius: wp('5%'),
    backgroundColor: '#d2ff4c',
  },
  title: {
    fontWeight: 'bold',
    fontSize: wp('4.5%'),
  },
  subtitle: {
    color: 'gray',
    fontSize: wp('3.2%'),
  },
  balance: {
    fontWeight: 'bold',
    fontSize: wp('8%'),
    marginBottom: hp('2%'),
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f5f5f5',
    borderRadius: wp('3%'),
    padding: wp('4%'),
  },
  actionBox: {
    alignItems: 'center',
  },
  actionLabel: {
    marginTop: hp('0.8%'),
    fontSize: wp('3.3%'),
    fontWeight: '500',
  },
  tabRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: hp('2.5%'),
  },
  tabBox: {
    alignItems: 'center',
    paddingBottom: hp('1%'),
  },
  tabText: {
    fontSize: wp('4%'),
    color: 'gray',
  },
  activeTabText: {
    color: '#00C2AA',
    fontWeight: '600',
  },
  activeTabLineSingle: {
    height: 2,
    width: '100%',
    backgroundColor: '#00C2AA',
    marginTop: hp('0.4%'),
    borderRadius: 1,
  },
  tabContent: {
    marginTop: hp('2%'),
  },
  tokenRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: wp('4%'),
    borderRadius: wp('3%'),
  },
  tokenName: {
    fontWeight: '600',
    fontSize: wp('4%'),
  },
  tokenSubtitle: {
    fontSize: wp('3%'),
    color: 'gray',
  },
  tokenRight: {
    marginLeft: 'auto',
    alignItems: 'flex-end',
  },
  tokenGrowth: {
    color: 'green',
    fontWeight: '600',
  },
  tokenPrice: {
    fontSize: wp('3.3%'),
    color: 'gray',
  },
  emptyMsg: {
    textAlign: 'center',
    color: 'gray',
    marginTop: hp('5%'),
  },
  headermain: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 1,
    paddingTop: 4,
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
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000'
  },
  subtext: {
    marginTop: 8,
    fontSize: 13,
    color: 'gray'
  },
  qrContainer: {
    alignItems: 'center',
    marginVertical: 20
  },
  qrCard: {
    backgroundColor: '#1ce47d',
    width: 220,
    height: 180,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  addressBox: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
  },
  addressText: {
    color: 'white',
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '500'
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: "space-evenly",
    marginTop: 15,
  },
  copyBtn: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  copyText: {
    fontWeight: 'bold',
    color: '#000'
  },
  shareBtn: {
    backgroundColor: '#00C2AA',
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
    alignItems: 'center',
    gap: 6,
  },
  shareText: {
    color: 'white',
    fontWeight: 'bold'
  },
  openButtonbuy: {
    marginTop: 50,
    alignSelf: 'center',
    backgroundColor: '#00C2AA',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  openButtonTextbuy: {
    color: 'white',
    fontWeight: 'bold',
  },
  titlebuy: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#000',
  },
  descriptionbuy: {
    fontSize: 13,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 18,
  },
  buttonbuy: {
    backgroundColor: '#00C2AA',
    paddingVertical: 12,
    paddingHorizontal: 35,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonTextbuy: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 13,
  },
  headerRowsend: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15
  },
  headerTextsend: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000'
  },
  searchInputsend: {
    backgroundColor: '#f1f1f1',
    padding: 10,
    borderRadius: 10,
    marginBottom: 20
  },
  tokenRowsend: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderColor: '#ccc'
  },
  tokenLeftsend: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  tokenIconsend: {
    width: 30,
    height: 30,
    marginRight: 10
  },
  tokenSymbolsend: {
    fontSize: 16,
    fontWeight: '600'
  },
  tokenMidsend: {
    alignItems: 'flex-end'
  },
  tokenPricesend: {
    fontSize: 14,
    fontWeight: '600'
  },
  tokenCapsend: {
    fontSize: 11,
    color: '#666'
  },
  tokenRightsend: {
    alignItems: 'center'
  },
  tokenChangesend: {
    fontSize: 12,
    marginBottom: 5
  },
  buyButtonsend: {
    backgroundColor: '#00C2AA',
    borderRadius: 6,
    paddingVertical: 4,
    paddingHorizontal: 12
  },
  buyButtonTextsend: {
    color: 'white',
    fontWeight: 'bold'
  }
});

export default TransactionScreen;
