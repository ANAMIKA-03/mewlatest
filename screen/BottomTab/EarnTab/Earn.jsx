import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';

const Earn = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Earn</Text>

      {/* First Card */}
      <TouchableOpacity style={styles.card}>
        <View style={styles.cardContent}>
          <Image
            source={require('../../../assets/home/ethereum.png')}
            style={styles.supportImagee}
          />
          <View style={styles.textContainer}>
            <Text style={styles.cardTitle}>Ethereum staking</Text>
            <Text style={[styles.cardPercentage, { color: '#00C2AA' }]}>
              3.14% APR
            </Text>
            <Text style={styles.cardDescription}>
              Best yield option, requires 32 ETH minimum to stake.
            </Text>
          </View>
        </View>
        <View style={styles.footer}>
        <Image
            source={require('../../../assets/home/ethereum.png')}
            style={styles.supportImage}
          />
          <Text style={styles.footerText}>Powered by Staked</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card}>
        <View style={styles.cardContent}>
        <Image
            source={require('../../../assets/home/ethereumsecond.png')}
            style={styles.supportImagee}
          />
          <View style={styles.textContainer}>
            <Text style={styles.cardTitle}>Ethereum liquid staking</Text>
            <Text style={[styles.cardPercentage, { color: '#3AB6F3' }]}>
              2.72% APR
            </Text>
            <Text style={styles.cardDescription}>
              Liquid staking with no minimum amount requirements.
            </Text>
          </View>
        </View>
        <View style={styles.footer}>
          <Image
            source={require('../../../assets/home/ethereumsecond.png')}
            style={styles.footerIcon}
          />
          <Text style={styles.footerText}>Powered by Lido</Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F9FCFC',
    flex:1,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    // shadowColor: '#000',
    // shadowOpacity: 0.08,
    // shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 2,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 50,
    height: 50,
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
  },
  cardPercentage: {
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 4,
  },
  cardDescription: {
    fontSize: 13,
    color: '#7D7D7D',
    marginTop: 8,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  footerIcon: {
    width: 18,
    height: 18,
    marginRight: 6,
  },
  footerText: {
    fontSize: 12,
    color: '#888',
  },
  supportImagee: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    marginRight: 15,
  },
  supportImage: {
    width: 18,
    height: 20,
    resizeMode: 'contain',
    marginRight: 15,
  },
});

export default Earn;
