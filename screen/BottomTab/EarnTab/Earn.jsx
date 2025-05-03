import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';

const Earn = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Earn</Text>

      <TouchableOpacity style={styles.card}>
        <View style={styles.cardContent}>
          {/* <Image
            source={require('../../assets/chkk.png')} 
            style={styles.icon}
          /> */}
          <View style={styles.textContainer}>
            <Text style={styles.cardTitle}>Ethereum staking</Text>
            <Text style={styles.cardPercentage}>3.17% APR</Text>
            <Text style={styles.cardDescription}>
              Best yield option, requires 32 ETH minimum to stake.
            </Text>
          </View>
        </View>
        <View style={styles.footer}>
          <Text style={styles.footerText}>Powered by Staked</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card}>
        <View style={styles.cardContent}>
          {/* <Image
            source={require('../../assets/chkk.png')} 
            style={styles.icon}
          /> */}
          <View style={styles.textContainer}>
            <Text style={styles.cardTitle}>Ethereum liquid staking</Text>
            <Text style={styles.cardPercentage}>2.81% APR</Text>
            <Text style={styles.cardDescription}>
              Liquid staking with no minimum amount requirements.
            </Text>
          </View>
        </View>
        <View style={styles.footer}>
          <Text style={styles.footerText}>Powered by Lido</Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4D4D4D',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 0.3,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    marginBottom: 20,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  icon: {
    width: 50,
    height: 50,
    marginRight: 20,
    bottom: 20,
  },
  textContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4D4D4D',
  },
  cardPercentage: {
    fontSize: 16,
    color: '#00B0FF',
    fontWeight: 'bold',
    marginTop: 5,
  },
  cardDescription: {
    fontSize: 14,
    color: '#B0B0B0',
    marginTop: 10,
  },
  footer: {
    marginTop: 10,
    paddingTop: 10,
  },
  footerText: {
    fontSize: 12,
    color: '#B0B0B0',
  },
});

export default Earn;
