import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, FlatList, ScrollView, TouchableOpacity, Alert, TouchableWithoutFeedback } from 'react-native';
import { YellowBox } from 'react-native'

YellowBox.ignoreWarnings([
    'VirtualizedLists should never be nested', // TODO: Remove when fixed
]);

import Gods from '../data/Gods.json';

const God = props => {
    const [count, setCount] = useState(0)

    const easterEgg = () => {
        setCount(count + 1);
        if (count >= 9) {
            Alert.alert(
                'Easter Egg!',
                'Hi, this app is coded by me, Tanner Shilson. I would like to say Thank you to my wife, Lupe. She has always pushed me and believed in me. I love you Lovebug! I love my boys, Anthony, Xavier, and Zander. Thanks to my family and friends for my being supportive. If you found this by accident, congrats i guess, add me on Smite.                                                                -Tanner "TannerSucks" Shilson',
                [
                    { text: 'Cool' }
                ],
                { cancelable: false }
            );
        }
    }

    //grabs god info from all gods using id prop
    const godInfo = props.allGods.filter(item => {
        return item.id === props.god
    })


    let godImg;
    //matches name for pic
    if (godInfo !== undefined) {
        godImg = Gods.filter(item => {
            return godInfo[0].Name === item.Name
        })
    }


    const doneFetching = () => {
        props.setLoading(false)
        props.showBuildScreen(true);
    }


    const setBuild = (title) => {
        props.setCurrentGod(godInfo);
        props.setCurrentGodImg(godImg);
        props.setBuild(title);
        props.showGodScreen(false);
        props.setLoading(true)
        fetch(`https://us-central1-smite-source.cloudfunctions.net/api/build/${title}`)
            .then((response) =>
                response.json()
            )
            .then((json) => props.setCurrentBuild(json.data))
            .catch((error) => console.error(error))
            .finally(() => doneFetching())
    }

    const setImg = (type) => {
        if (type == "Assassin") {
            return require(`../img/Jungle.png`)
        } else if (type == "Warrior") {
            return require(`../img/Solo.png`)
        } else if (type == "Hunter") {
            return require(`../img/Carry.png`)
        } else if (type == "Mage") {
            return require(`../img/Mid.png`)
        } else if (type == "Guardian") {
            return require(`../img/Support.png`)
        } else {
            return require(`../img/Jungle.png`)
        }

    }

    const checkImg = () => {
        if (godImg.length > 0) {
            return godImg[0].Header;

        } else {
            return godInfo[0].godIcon_URL
        }
    }

    return (
        <ScrollView>
            <View style={styles.container}>

                <View>
                    <View style={styles.imgContainer}>
                        <Image style={styles.img} source={{ uri: `${checkImg()}` }} />
                    </View>

                    <View style={styles.godTitle}>
                        <Text style={styles.text}>{godInfo[0].Name}</Text>
                    </View>


                    <View style={styles.buildTitle}>
                        <View style={styles.buildLines}></View>
                        <Text style={styles.text}>Builds</Text>
                        <View style={styles.buildLines}></View>
                    </View>
                </View>
                <View>
                    <FlatList
                        data={props.GodSelected}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) =>
                            <View style={styles.buildContainer}>
                                <TouchableOpacity style={styles.build} onPress={() => setBuild(item.id)}>
                                    <Image style={styles.roleImg} source={setImg(godInfo[0].Roles)} />
                                    <Text style={styles.Yellowtext}>{item.title}</Text>
                                    <Text style={styles.smalltext}>{item.subtitle}</Text>
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
                    <TouchableWithoutFeedback onPress={() => easterEgg()}>
                        <Text style={{ color: 'white' }}>© 2019 Smite Source. All rights reserved.</Text>
                    </TouchableWithoutFeedback>
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
        width: 300,
        height: 300,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.49,
        shadowRadius: 8.30,
        elevation: 13,
        padding: 15

    },
    Yellowtext: {
        color: '#fdcb6e',
        fontSize: 25,
        fontWeight: '700',
        marginBottom: 10,
        textAlign: 'center'
    },
    smalltext: {
        color: "white",
        fontSize: 16,
        textAlign: 'center',
        padding: 10
    },
    roleImg: {

        marginVertical: 10
    }
});

export default God;
