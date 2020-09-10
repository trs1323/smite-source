import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';


const Header = props => {

    const menuButtton = () => {
        if (props.menu === false) {
            props.showMenu(true)
        } else {
            props.showMenu(false)
        }
    }

    return (
        <View style={styles.header}>
            <View>
                <Text style={styles.text}>Smite Source</Text>
            </View>
            <View>
                <TouchableOpacity onPress={menuButtton}>
                    <View style={styles.menu}>
                        <View style={styles.menuLine}></View>
                        <View style={styles.menuLine}></View>
                        <View style={styles.menuLine}></View>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 30,
        paddingTop: 40
    },
    text: {
        color: 'white',
        fontSize: 16
    },
    menu: {
        width: 40,
        height: 40,
        justifyContent: 'space-evenly'
    },
    menuLine: {
        borderBottomWidth: 5,
        borderColor: "#adafb9",

    }
});

export default Header;