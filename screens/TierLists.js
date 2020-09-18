import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faClipboardList } from '@fortawesome/free-solid-svg-icons';
import * as Linking from 'expo-linking';

const TierLists = props => {

    const openLink = () => {
        Linking.openURL('https://smitesource.com/tierlists/6838d5cf-8cee-42c2-ae2d-e441bf281f8b');

    };

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <View style={styles.lines}></View>
                <Text style={styles.header}>Tier Lists</Text>
                <View style={styles.lines}></View>
            </View>
            <View >
                <TouchableOpacity style={styles.tierlist} onPress={openLink}>
                    <FontAwesomeIcon icon={faClipboardList} size={40} style={{ color: 'white', marginBottom: 10 }} />
                    <Text style={styles.yellowText}>Updated Tier List</Text>
                    <Text style={{ color: 'white', textAlign: 'center' }}>September 1, 2020</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
};


const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerContainer: {
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 30
    },
    lines: {
        borderBottomWidth: 2,
        borderColor: '#fdcb6e',
        width: '20%',
        marginHorizontal: 10
    },
    header: {
        color: 'white',
        fontSize: 35,
        fontWeight: '700',
        textAlign: 'center'
    },

    tierlist: {
        backgroundColor: "#2a335e",
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        width: 250,
        height: 250,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.49,
        shadowRadius: 8.30,
        elevation: 13,

    },
    yellowText: {
        color: '#fdcb6e',
        fontSize: 30,
        fontWeight: '700',
        textAlign: 'center'
    }
});

export default TierLists;