import React, { useRef } from 'react';
import { SafeAreaView, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const InternalBrowser = () => {
    const navigation = useNavigation();
    const webViewRef = useRef(null);

    const reloadPage = () => {
        webViewRef.current.reload();
    };

    return (
        <SafeAreaView
            style={[styles.container]}>
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.backIconContainer}>
                    <Ionicons name="arrow-back" style={styles.backIcon}
                    />
                </TouchableOpacity>
                <View style={styles.searchContainer}>
                    <Ionicons name="lock-closed-sharp" style={styles.lockIcon} />
                    <Text style={styles.urlAddress} numberOfLines={1} ellipsizeMode="tail">
                        https://app.cream.finance/
                    </Text>
                </View>
                <TouchableOpacity onPress={reloadPage}>
                    <Ionicons name="reload-sharp" style={styles.reloadIcon} />
                </TouchableOpacity>
            </View>
            <WebView
                ref={webViewRef}
                source={{ uri: 'https://app.cream.finance/' }}
                style={styles.webview}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: WHITE_COLOR,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: wp(4),
        marginVertical: wp(3),
        paddingVertical: wp(6),  // Add padding for better spacing
    },
    backIconContainer: {
        marginRight: wp(2),
    },
    backIcon: {
        fontSize: wp(6),
    },
    searchContainer: {
        backgroundColor: "#ccc",
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 20,
        paddingHorizontal: wp(4),
        paddingVertical: wp(2),
        flex: 1,
        marginRight: wp(2),
    },
    lockIcon: {
        color: "#fff",
        fontSize: wp(3.5),
        marginRight: wp(2),
    },
    reloadIcon: {
        color: "#2020220",
        fontSize: wp(4.5),
    },
    urlAddress: {
        flex: 1,
        fontSize: wp(3.5),
        color: "#ccc",
    },
    webview: {
        flex: 1,
    },
});

export default InternalBrowser;
