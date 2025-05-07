import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { setActiveNetwork } from '../../redux/walletSlice';
import { setProvider } from '../../utils/web3/web3';
const tabOptions = ['Favourites','Top Tokens', 'Trending', 'Gainers', 'Losers', 'Top movers'];
const categories = [
  {
    title: 'DeFi',
    color: '#C8F4EC',
    // icons: ['defi1', 'defi2', 'defi3', 'defi4', 'defi5'],
    more: '+7'
  },
  {
    title: 'NFTs',
    color: '#E5CBFB',
    // icons: ['nft1', 'nft2', 'nft3', 'nft4', 'nft5'],
    more: '+7'
  },
  {
    title: 'USD stable coins',
    color: '#EEE0C9',
    // icons: ['usd1', 'usd2', 'usd3', 'usd4', 'usd5'],
    more: '+5'
  }
];

const tokensData = {
  'Top Tokens': [
    { name: 'Ethereum', symbol: 'ETH', price: '$1,816.20', change: '+0.06%', color: 'green' },
    { name: 'Tether', symbol: 'USDT', price: '$1.00', change: '-0.01%', color: 'red' },
    { name: 'BNB', symbol: 'BNB', price: '$597.71', change: '+1.64%', color: 'green' },
  ],
  Trending: [
    { name: 'Tether', symbol: 'USDT', price: '$1.00', change: '-0.01%', color: 'red' },
    { name: 'Ethereum', symbol: 'ETH', price: '$1,816.20', change: '+0.06%', color: 'green' },
    { name: 'Pepe', symbol: 'PEPE', price: '$0.000000793', change: '-3.17%', color: 'red' },
  ],
  'Top movers': [
    { name: 'RWAX', symbol: 'APP', price: '$0.00419', change: '-23.24%', color: 'red', time: '6 minutes ago' },
    { name: 'PeiPei', symbol: 'PEIPEI', price: '$0.0000000', change: '+12.06%', color: 'green', time: '11 minutes ago' },
    { name: 'Movement', symbol: 'MOVE', price: '$0.177', change: '+7.62%', color: 'green', time: '16 minutes ago' },
  ]
};

const MarketsScreen = () => {
  const [activeTab, setActiveTab] = useState('Top Tokens');
  const { networks, activeNetwork } = useSelector(state => state.wallet)
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dispatch = useDispatch();

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

      {/* Top Bar */}
      <View style={styles.topBar}>
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

        </View>
        <TouchableOpacity style={styles.iconCircle}
        >
          <MaterialCommunityIcons name="magnify" size={22} color="#000" />
        </TouchableOpacity>
      </View>

      <Text style={styles.headerTitle}>Markets</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
        {categories.map((cat, idx) => (
          <View key={idx} style={[styles.categoryCard, { backgroundColor: cat.color }]}>
            <Text style={styles.categoryText}>{cat.title}</Text>
            <View style={styles.categoryTopRow}>
              {/* {cat.icons.map((icon, iconIdx) => (
                <Image
                  key={iconIdx}
                  source={{ uri: 'https://via.placeholder.com/30' }}
                  style={styles.categoryIcon}
                />
              ))} */}
              <Text style={styles.moreText}>{cat.more}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabScroll}>
        {tabOptions.map((tab) => (
          <TouchableOpacity key={tab} onPress={() => setActiveTab(tab)} style={styles.tabBtn}>
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
            {activeTab === tab && <View style={styles.activeLine} />}
          </TouchableOpacity>
        ))}
      </ScrollView>

      <FlatList
        data={tokensData[activeTab]}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.tokenRow}>
            <View style={{ flexDirection: 'column' }}>
              {item.time && <Text style={styles.tokenTime}>{item.time}</Text>}
              <Text style={styles.tokenName}>{item.name}</Text>
              <Text style={styles.tokenSymbol}>{item.symbol}</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={styles.tokenPrice}>{item.price}</Text>
              <Text style={{ color: item.color }}>{item.change}</Text>
            </View>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: hp('5%') }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: hp('4%'),
    backgroundColor: '#fff',
    paddingHorizontal: wp('4%')
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp('1%')
  },
  networkText: {
    fontSize: wp('3.8%'),
    fontWeight: '600',
    marginLeft: wp('2%'),
  },
  headerTitle: {
    fontSize: wp('6%'),
    fontWeight: 'bold',
    marginBottom: hp('2%'),
  },
  categoryScroll: {
    flexGrow: 0,
    marginBottom: hp('2%'),
  },
  categoryCard: {
    width: wp('55%'),
    height: hp('13%'),
    borderRadius: wp('3%'),
    padding: wp('3%'),
    marginRight: wp('4%'),
    justifyContent: 'space-between',
  },
  categoryTopRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  categoryIcon: {
    width: wp('7%'),
    height: wp('7%'),
    borderRadius: wp('3.5%'),
    backgroundColor: '#ccc',
    marginRight: wp('1.5%')
  },
  moreText: {
    fontSize: wp('3.5%'),
    fontWeight: '600',
    color: '#000'
  },
  categoryText: {
    fontWeight: '600',
    fontSize: wp('4%'),
    marginTop: hp('1%')
  },
  tabScroll: {
    flexGrow: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginBottom: hp('1%'),
  },
  tabBtn: {
    alignItems: 'center',
    marginRight: wp('5%'),
  },
  tabText: {
    fontSize: wp('3.8%'),
    color: 'gray',
  },
  activeTabText: {
    color: '#00C2AA',
    fontWeight: '600',
  },
  activeLine: {
    height: 2,
    width: '100%',
    backgroundColor: '#00C2AA',
    marginTop: hp('0.3%'),
  },
  tokenRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: hp('1.5%'),
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0'
  },
  tokenName: {
    fontWeight: '600',
    fontSize: wp('4%'),
  },
  tokenSymbol: {
    color: 'gray',
    fontSize: wp('3.5%'),
  },
  tokenPrice: {
    fontWeight: '600',
    fontSize: wp('4%'),
  },
  tokenTime: {
    fontSize: wp('3.2%'),
    color: 'gray'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 1,
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
});

export default MarketsScreen;