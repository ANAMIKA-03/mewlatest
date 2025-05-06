import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const BrowserScreen = () => {
  const [activeTab, setActiveTab] = useState('Featured');

  const featuredApps = [
    { name: 'MEW web', desc: 'All the power of MEW with extended features.', icon: 'web' },
    { name: 'Looks Rare', desc: 'Trade NFTs. Earn rewards.', icon: 'eye-outline' },
    { name: 'Aave', desc: 'Earn interest, deposit and borrow assets.', icon: 'bank' },
    { name: 'Rarible', desc: 'Create, sell or collect digital items.', icon: 'palette' },
    { name: 'DAppRadar Portfolio Tracker', desc: 'Visualize and track your holdings.', icon: 'chart-line' },
    { name: 'Unstoppable Domains', desc: 'Get a crypto domain for your Ethereum account.', icon: 'domain' },
  ];

  const renderTabContent = () => {
    if (activeTab === 'Featured') {
      return (
        <View style={styles.gridContainer}>
          {featuredApps.map((app, index) => (
            <View key={index} style={styles.dappBox}>
              <Icon name={app.icon} size={wp('8%')} color="#00C2AA" />
              <View style={{ marginTop: hp('1%') }}>
                <Text style={styles.dappName}>{app.name}</Text>
                <Text style={styles.dappDesc}>{app.desc}</Text>
              </View>
            </View>
          ))}
        </View>
      );
    } else if (activeTab === 'Favorites') {
      return <Text style={styles.emptyText}>Your favorite DApps will be shown here</Text>;
    } else if (activeTab === 'Recent') {
      return <Text style={styles.emptyText}>Your recently used DApps will be displayed here</Text>;
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

      {/* Network Row */}
      <View style={styles.networkRow}>
        <Icon name="checkbox-blank-circle" size={10} color="#00C2AA" />
        <Text style={styles.networkText}> ETHEREUM </Text>
        <Icon name="chevron-down" size={20} />
      </View>

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <Icon name="magnify" size={20} color="#888" />
        <TextInput placeholder="Search DApps or enter URL" style={styles.searchInput} placeholderTextColor="#888" />
      </View>

      {/* Banner */}
      <View style={styles.banner}>
        <Text style={styles.bannerText}>Discover top Ethereum DApps</Text>
        <Icon name="chevron-right" size={30} color="white" style={styles.arrowIcon} />
      </View>

      {/* Tabs */}
      <View style={styles.tabsRow}>
        {['Featured', 'Favorites', 'Recent'].map((tab) => (
          <TouchableOpacity key={tab} onPress={() => setActiveTab(tab)} style={styles.tabBtn}>
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
            {activeTab === tab && <View style={styles.activeLine} />}
          </TouchableOpacity>
        ))}
      </View>

      {/* Tab Content */}
      <ScrollView style={styles.tabContent} contentContainerStyle={{ paddingBottom: hp('5%') }}>
        {renderTabContent()}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: hp('6%'),
    paddingHorizontal: wp('4%')
  },
  networkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('2%'),
  },
  networkText: {
    fontSize: wp('3.8%'),
    fontWeight: '600',
    marginLeft: wp('2%'),
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: wp('3%'),
    paddingHorizontal: wp('4%'),
    height: hp('5.5%'),
    marginBottom: hp('2%'),
  },
  searchInput: {
    marginLeft: wp('2%'),
    fontSize: wp('3.5%'),
    flex: 1,
  },
  banner: {
    backgroundColor: 'linear-gradient(45deg, #4dd0e1, #26c6da, #00acc1)',
    backgroundColor: '#26c6da',
    borderRadius: wp('3%'),
    height: hp('18%'),
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: wp('5%'),
    marginBottom: hp('2%'),
    position: 'relative',
  },
  bannerText: {
    color: 'white',
    fontSize: wp('5%'),
    fontWeight: '700',
  },
  arrowIcon: {
    position: 'absolute',
    right: wp('4%'),
    top: hp('7.5%'),
  },
  tabsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tabBtn: {
    alignItems: 'center',
    paddingBottom: hp('1%')
  },
  tabText: {
    fontSize: wp('4%'),
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
    marginTop: hp('0.4%'),
    borderRadius: 1,
  },
  tabContent: {
    marginTop: hp('2%'),
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  dappBox: {
    width: '48%',
    backgroundColor: 'white',
    borderRadius: wp('3%'),
    padding: wp('4%'),
    marginBottom: hp('2%'),
    borderWidth: 1,
    borderColor: '#eee',
  },
  dappName: {
    fontWeight: '600',
    fontSize: wp('3.8%'),
    marginBottom: hp('0.5%'),
  },
  dappDesc: {
    fontSize: wp('3.2%'),
    color: 'gray',
  },
  emptyText: {
    textAlign: 'center',
    color: 'gray',
    marginTop: hp('5%'),
  },
});

export default BrowserScreen;
