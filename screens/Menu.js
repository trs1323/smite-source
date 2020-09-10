import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, ScrollView } from 'react-native';

import Gods from '../data/Gods.json';

const Hunter = Gods.filter(function (item) {
    return item.Class == 'Hunter'
});

const Assassin = Gods.filter(function (item) {
    return item.Class == 'Assassin'
});

const Guardian = Gods.filter(function (item) {
    return item.Class == 'Guardian'
});

const Mage = Gods.filter(function (item) {
    return item.Class == 'Mage'
});

const Warrior = Gods.filter(function (item) {
    return item.Class == 'Warrior'
});

const Menu = props => {
    const [builds, showBuilds] = useState(false);
    const [assassins, showAssassins] = useState(false);
    const [hunters, showHunters] = useState(false);
    const [guardians, showGuardians] = useState(false);
    const [mages, showMages] = useState(false);
    const [warriors, showWarriors] = useState(false);
    return (
        <ScrollView style={styles.menu}>
            <View style={styles.menutext}>
                <TouchableOpacity>
                    <Text style={styles.text}>HOME</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.menutext}>
                <TouchableOpacity onPress={() => showBuilds(!builds)}>
                    <Text style={styles.text}>BUILDS</Text>
                </TouchableOpacity>
                <View style={(builds === false) ? styles.classtextHidden : ''}>
                    <View >
                        <TouchableOpacity style={styles.classtext} onPress={() => showAssassins(!assassins)}>
                            <Text style={styles.text}>></Text>
                            <Text style={styles.text}>ASSASSINS</Text>
                        </TouchableOpacity>
                        <View style={(assassins === false) ? styles.classtextHidden : ''}>
                            <FlatList
                                data={Assassin}
                                renderItem={({ item }) => <Text style={styles.godText}>{item.Name}</Text>}
                            />
                        </View>
                    </View>
                    <View >
                        <TouchableOpacity style={styles.classtext} onPress={() => showHunters(!hunters)}>
                            <Text style={styles.text}>></Text>
                            <Text style={styles.text}>HUNTERS</Text>
                        </TouchableOpacity>
                        <View style={(hunters === false) ? styles.classtextHidden : ''}>
                            <FlatList
                                data={Hunter}
                                renderItem={({ item }) => <Text style={styles.godText}>{item.Name}</Text>}
                            />
                        </View>
                    </View>
                    <View >
                        <TouchableOpacity style={styles.classtext} onPress={() => showGuardians(!guardians)}>
                            <Text style={styles.text}>></Text>
                            <Text style={styles.text}>GUARDIANS</Text>
                        </TouchableOpacity>
                        <View style={(guardians === false) ? styles.classtextHidden : ''}>
                            <FlatList
                                data={Guardian}
                                renderItem={({ item }) => <Text style={styles.godText}>{item.Name}</Text>}
                            />
                        </View>
                    </View>
                    <View >
                        <TouchableOpacity style={styles.classtext} onPress={() => showMages(!mages)}>
                            <Text style={styles.text}>></Text>
                            <Text style={styles.text}>MAGES</Text>
                        </TouchableOpacity>
                        <View style={(mages === false) ? styles.classtextHidden : ''}>
                            <FlatList
                                data={Mage}
                                renderItem={({ item }) => <Text style={styles.godText}>{item.Name}</Text>}
                            />
                        </View>
                    </View>
                    <View >
                        <TouchableOpacity style={styles.classtext} onPress={() => showWarriors(!warriors)}>
                            <Text style={styles.text}>></Text>
                            <Text style={styles.text}>WARRIORS</Text>
                        </TouchableOpacity>
                        <View style={(warriors === false) ? styles.classtextHidden : ''}>
                            <FlatList
                                data={Warrior}
                                renderItem={({ item }) => <Text style={styles.godText}>{item.Name}</Text>}
                            />
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.menutext}>
                <TouchableOpacity>
                    <Text style={styles.text}>TIER LISTS</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.menutext}>
                <TouchableOpacity>
                    <Text style={styles.text}>ABOUT</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.menutext}>
                <TouchableOpacity>
                    <Text style={styles.text}>GIVEAWAY</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    menu: {
        width: '60%',
        height: '100%',
        backgroundColor: '#252b45',
        paddingHorizontal: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
        overflow: 'scroll'

    },
    menutext: {
        marginVertical: 20,


    },
    classtextHidden: {
        display: 'none'
    },
    classtext: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 15,
        paddingLeft: 10,

    },
    text: {
        color: 'white'
    },
    godText: {
        color: 'white',
        marginVertical: 10,
        marginLeft: 25
    }
});

export default Menu;