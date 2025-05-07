import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  Image
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const Swap = () => {
  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

      {/* Top bar */}
      <View style={styles.networkRow}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Icon name="checkbox-blank-circle" size={10} color="#00C2AA" />
          <Text style={styles.networkText}> ETHEREUM </Text>
          <Icon name="chevron-down" size={20} />
        </View>
        <View style={styles.iconsRow}>
          <Icon name="bell-outline" size={24} color="#000" style={{ marginRight: wp('4%') }} />
          <Icon name="cart-outline" size={24} color="#000" />
        </View>
      </View>

      <Text style={styles.title}>Swap</Text>

      <ScrollView contentContainerStyle={{ paddingBottom: hp('4%') }}>
        <View style={styles.cardLarge}>
          <View style={styles.rowStart}>
            <Image source={require('../../../assets/home/swap.png')}
              style={styles.supportImagee} />
            <View style={styles.textWrap}>
              <Text style={styles.cardTitle}>Swap tokens</Text>
              <Text style={styles.cardDesc}>MEW finds the best price for you across multiple DEXs</Text>
            </View>
          </View>
        </View>

        <View style={styles.cardLarge}>
          <View style={styles.rowStart}>
            {/* <Icon name="credit-card-outline" size={30} color="#00C2AA" style={styles.cardIcon} /> */}
            <Image source={require('../../../assets/home/buy.png')}
              style={styles.supportImagee} />

            <View style={styles.textWrap}>
              <Text style={styles.cardTitle}>Buy Crypto</Text>
              <Text style={styles.cardDesc}>Buy ETH with major cards or your bank account</Text>
              <View style={styles.paymentIconsRow}>
                {/* <Image source={require('../../../assets/home/Assetbookh.png')} style={styles.paymentIcon} /> */}
                {/* <Image source={require('../../../assets/home.Assetbookh.png')} style={styles.paymentIcon} /> */}
                {/* <Image source={require('../../../assets/home/Assetbookh.png')} style={styles.paymentIcon} /> */}
                {/* <Image source={require('../../../assets/home/Assetbookh.png')} style={styles.paymentIcon} /> */}
              </View>
            </View>
          </View>

        </View>

        <View style={styles.rowBetween}>
          <View style={styles.cardSmall}>
            {/* <Icon name="cash-refund" size={28} color="#00C2AA" style={styles.cardIcon} /> */}
            <Image source={require('../../../assets/home/sell.png')}
              style={styles.supportImagee} />

            <Text style={styles.cardTitle}>Sell crypto</Text>
            <Text style={styles.cardDesc}>Withdraw to your bank account</Text>
          </View>

          <View style={styles.cardSmall}>
          <Image source={require('../../../assets/home/bridge.png')}
              style={styles.supportImagee} />
            <Text style={styles.cardTitle}>Bridge assets</Text>
            <Text style={styles.cardDesc}>Move tokens between chains</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: hp('6%'),
    backgroundColor: '#f9f9f9',
    paddingHorizontal: wp('4%')
  },
  networkRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp('2%'),
  },
  networkText: {
    fontSize: wp('3.8%'),
    fontWeight: '600',
    marginLeft: wp('2%'),
  },
  iconsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: wp('6%'),
    fontWeight: 'bold',
    marginBottom: hp('2%'),
  },
  rowStart: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp('2%')
  },
  cardLarge: {
    backgroundColor: 'white',
    borderRadius: wp('3%'),
    padding: wp('4%'),
    marginBottom: hp('2%'),
  },
  cardSmall: {
    backgroundColor: 'white',
    borderRadius: wp('3%'),
    width: '48%',
    padding: wp('4%'),
  },
  cardIcon: {
    marginRight: wp('4%')
  },
  textWrap: {
    flex: 1,
  },
  cardTitle: {
    fontSize: wp('4.2%'),
    fontWeight: 'bold',
    marginBottom: hp('0.5%'),
  },
  cardDesc: {
    color: '#444',
    fontSize: wp('3.5%'),
  },
  paymentIconsRow: {
    flexDirection: 'row',
    marginTop: hp('1%')
  },
  paymentIcon: {
    width: wp('8%'),
    height: wp('5%'),
    resizeMode: 'contain',
    marginRight: wp('2%')
  },
  supportImagee: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    marginRight: 15,
  },
});

export default Swap;

