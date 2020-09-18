import React from 'react';
import { StyleSheet, Text, View, Image, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import { YellowBox } from 'react-native'

YellowBox.ignoreWarnings([
    'VirtualizedLists should never be nested', // TODO: Remove when fixed
]);

import Gods from '../data/Gods.json';

const God = props => {

    const GodSelected = Gods.filter(function (item) {
        return item.Name == props.god
    });

    const setBuild = (title) => {

        props.setBuild(title);
        props.showGodScreen(false);
        props.showBuildScreen(true);

    }

    const setImg = (type) => {
        if (type == "Jungle") {
            return require(`../img/Jungle.png`)
        } else if (type == "Solo") {
            return require(`../img/Solo.png`)
        } else if (type == "Carry") {
            return require(`../img/Carry.png`)
        } else if (type == "Mid") {
            return require(`../img/Mid.png`)
        } else if (type == "Support") {
            return require(`../img/Support.png`)
        } else {
            return require(`../img/Jungle.png`)
        }

    }

    return (
        <ScrollView>
            <View style={styles.container}>

                <View>
                    <View style={styles.imgContainer}>
                        <Image style={styles.img} source={{ uri: `${GodSelected[0].Header}` }} />
                    </View>

                    <View style={styles.godTitle}>
                        <Text style={styles.text}>{GodSelected[0].Name}</Text>
                    </View>


                    <View style={styles.buildTitle}>
                        <View style={styles.buildLines}></View>
                        <Text style={styles.text}>Builds</Text>
                        <View style={styles.buildLines}></View>
                    </View>
                </View>
                <View>
                    <FlatList
                        data={GodSelected[0].Builds}
                        keyExtractor={item => item.Title}
                        renderItem={({ item }) =>
                            <View style={styles.buildContainer}>
                                <TouchableOpacity style={styles.build} onPress={() => setBuild(item.Title)}>
                                    <Image style={styles.roleImg} source={setImg(item.Type)} />
                                    <Text style={styles.Yellowtext}>{item.Type}</Text>
                                    <Text style={styles.smalltext}>{item.Title}</Text>
                                </TouchableOpacity>
                            </View>}
                    />
                </View>
                <View style={{
                    backgroundColor: '#131625',
                    padding: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 'auto'
                }}>
                    <Text style={{ color: 'white' }}>© 2019 Smite Source. All rights reserved.</Text>
                </View>
            </View>
        </ScrollView>
    )
};



const styles = StyleSheet.create({
    imgContainer: {

    },
    img: {
        width: '100%',
        resizeMode: 'cover',
        height: 400
    },
    godTitle: {
        backgroundColor: '#1f2439',
        borderBottomColor: '#1b1e2e',
        padding: 45,
        marginBottom: 30,
        borderBottomWidth: 2,
        width: '100%',
        height: 70,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.5,
        shadowRadius: 3.84,
        elevation: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: 'white',
        fontSize: 35,
        fontWeight: '700'
    },
    buildTitle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30
    },
    buildLines: {
        borderBottomWidth: 2,
        borderColor: '#fdcb6e',
        width: '20%',
        marginHorizontal: 10
    },
    buildContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30
    },
    build: {
        backgroundColor: "#2a335e",
        justifyContent: 'center',
        alignItems: 'center',
        width: 275,
        height: 275,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.49,
        shadowRadius: 8.30,
        elevation: 13

    },
    Yellowtext: {
        color: '#fdcb6e',
        fontSize: 35,
        fontWeight: '700',
        marginBottom: 10
    },
    smalltext: {
        color: "white",
        fontSize: 16,
        textAlign: 'center',
        padding: 10
    },
    roleImg: {

    }
});

export default God;
