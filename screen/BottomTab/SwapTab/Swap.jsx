import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Swap = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Swap</Text>

      <TouchableOpacity style={styles.card}>
        <View style={styles.cardRow}>
          {/* <Image source={require('./assets/chkk.png')} style={styles.icon} /> */}
          <Icon name="refresh" size={30} style={styles.icon} color="#4caf50" />
          <View style={styles.cardText}>
            <Text style={styles.cardTitle}>Swap tokens</Text>
            <Text style={styles.cardDescription}>
              MEW finds the best price for you across multiple DEXs
            </Text>
          </View>
        </View>
        
      </TouchableOpacity>

      <TouchableOpacity style={styles.card}>
        <View style={styles.cardRow}>
          {/* <Image source={require('./assets/chkk.png')} style={styles.icon} /> */}
          <Icon name="credit-card" size={30} color="#4caf50" style={styles.icon}/> 
          <View style={styles.cardText}>
            <Text style={styles.cardTitle}>Buy Crypto</Text>
            <Text style={styles.cardDescription}>
              Buy ETH with major cards or your bank account
            </Text>
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card}>
        <View style={styles.cardRow}>
          {/* <Image source={require('../../assets/chkk.png')} style={styles.icon} /> */}
          <View style={styles.cardText}>
            <Text style={styles.cardTitle}>Win $100K With NG</Text>
            <Text style={styles.cardDescription}>
            grab your free lottery ticket on Namogmes now!
            </Text>
          </View>
        </View>
      </TouchableOpacity>

      <View style={styles.rowContainer}>
        <TouchableOpacity style={styles.cardSmall}>
        {/* <Image source={require('./assets/chkk.png')} style={styles.imageicons} /> */}
        <Icon name="attach-money" size={30} color="#4caf50" style={styles.icon} /> 
          <Text style={styles.cardTitle}>Sell crypto</Text>
          <Text style={styles.cardDescription}>Withdraw to your bank account</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cardSmall}>
        {/* <Image source={require('./assets/chkk.png')} style={styles.imageicons} /> */}
        <Icon name="sync-alt" size={30} color="#4caf50" style={styles.icon} />
          <Text style={styles.cardTitle}>Bridge assets</Text>
          <Text style={styles.cardDescription}>Move tokens between chains</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: '#fff',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    backgroundColor: '#fff',
    marginBottom: 15,
    fontWeight:"bold",
    fontSize: 21,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 15,
    resizeMode: 'contain',
  },
  imageicons: {
    width: 30,
    height: 30,
    marginRight: 15,
    resizeMode: 'contain',
    paddingTop: 3,
    paddingBottom:4,
  },
  cardText: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardSmall: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginRight: 10,
  },
});

export default Swap;
