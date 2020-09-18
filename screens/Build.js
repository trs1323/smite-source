import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, FlatList } from 'react-native';
import { YellowBox } from 'react-native'

YellowBox.ignoreWarnings([
    'VirtualizedLists should never be nested', // TODO: Remove when fixed
]);

import Gods from '../data/Gods.json';
import Items from '../data/Items.json';

const Build = props => {

    const GodSelected = Gods.filter(function (item) {
        return item.Name == props.god;
    });

    const AllBuilds = GodSelected[0].Builds;



    const BuildSelected = AllBuilds.filter(item => {
        return item.Title === props.build;
    })

    const finalItem0 = props.allItems.filter(item => {
        return item.ItemId === BuildSelected[0]["Final-Items"][0]
    });
    const finalItem1 = props.allItems.filter(item => {
        return item.ItemId === BuildSelected[0]["Final-Items"][1]
    });
    const finalItem2 = props.allItems.filter(item => {
        return item.ItemId === BuildSelected[0]["Final-Items"][2]
    });
    const finalItem3 = props.allItems.filter(item => {
        return item.ItemId === BuildSelected[0]["Final-Items"][3]
    });
    const finalItem4 = props.allItems.filter(item => {
        return item.ItemId === BuildSelected[0]["Final-Items"][4]
    });
    const finalItem5 = props.allItems.filter(item => {
        return item.ItemId === BuildSelected[0]["Final-Items"][5]
    });

    const Relic0 = props.allItems.filter(item => {
        return item.ItemId === BuildSelected[0].Relics[0]
    });

    const Relic1 = props.allItems.filter(item => {
        return item.ItemId === BuildSelected[0].Relics[1]
    });

    let starterItems = [];

    for (let i = 0; i < BuildSelected[0].Starter.length; i++) {
        starterItems.push(props.allItems.filter(item => {
            return item.ItemId === BuildSelected[0].Starter[i]
        }))
    };





    return (
        <ScrollView>
            <View>

                <View style={styles.imgContainer}>
                    <Image style={styles.img} source={{ uri: `${GodSelected[0].Header}` }} />
                </View>

                <View style={styles.godTitle}>
                    <Text style={styles.godName}>{GodSelected[0].Name}</Text>
                    <Text style={styles.yellowText}>{BuildSelected[0].Type}</Text>
                    <Text style={styles.whiteText}>{props.build}</Text>
                </View>

                <View style={styles.border}>
                    <Text style={styles.yellowText}>Final Items:</Text>
                    <View style={styles.itemRow}>
                        <View>
                            <Image style={styles.itemImg} source={{ uri: `${finalItem0[0].itemIcon_URL}` }} />
                            <Text style={styles.itemName}>{finalItem0[0].DeviceName}</Text>
                        </View>
                        <View>
                            <Image style={styles.itemImg} source={{ uri: `${finalItem1[0].itemIcon_URL}` }} />
                            <Text style={styles.itemName}>{finalItem1[0].DeviceName}</Text>
                        </View>
                    </View>
                    <View style={styles.itemRow}>
                        <View>
                            <Image style={styles.itemImg} source={{ uri: `${finalItem2[0].itemIcon_URL}` }} />
                            <Text style={styles.itemName}>{finalItem2[0].DeviceName}</Text>
                        </View>
                        <View>
                            <Image style={styles.itemImg} source={{ uri: `${finalItem3[0].itemIcon_URL}` }} />
                            <Text style={styles.itemName}>{finalItem3[0].DeviceName}</Text>
                        </View>
                    </View>
                    <View style={styles.itemRow}>
                        <View>
                            <Image style={styles.itemImg} source={{ uri: `${finalItem4[0].itemIcon_URL}` }} />
                            <Text style={styles.itemName}>{finalItem4[0].DeviceName}</Text>
                        </View>
                        <View>
                            <Image style={styles.itemImg} source={{ uri: `${finalItem5[0].itemIcon_URL}` }} />
                            <Text style={styles.itemName}>{finalItem5[0].DeviceName}</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.border}>
                    <Text style={styles.yellowText}>Relics:</Text>
                    <View style={styles.itemRow}>
                        <View>
                            <Text style={styles.relicOrder}>Starter Relic</Text>
                            <Image style={styles.itemImg} source={{ uri: `${Relic0[0].itemIcon_URL}` }} />
                            <Text style={styles.itemName}>{Relic0[0].DeviceName}</Text>
                        </View>
                        <View>
                            <Text style={styles.relicOrder}>Second Relic</Text>
                            <Image style={styles.itemImg} source={{ uri: `${Relic1[0].itemIcon_URL}` }} />
                            <Text style={styles.itemName}>{Relic1[0].DeviceName}</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.border}>
                    <Text style={styles.yellowText}>Starter Items:</Text>
                    <View style={styles.starterItems}>
                        <FlatList

                            data={starterItems}
                            keyExtractor={(item, index) => item[0].ItemId + [index]}
                            numColumns={2}
                            renderItem={({ item }) =>
                                <View style={styles.starterItem}>

                                    <Image style={styles.itemImg} source={{ uri: `${item[0].itemIcon_URL}` }} />
                                    <Text style={styles.itemName}>{item[0].DeviceName}</Text>
                                </View>}
                        />
                    </View>
                </View>
                <View style={styles.explanation}>
                    <Text style={styles.yellowText}>Explanation:</Text>
                    <Text style={styles.whiteText}>{BuildSelected[0].Explanation}</Text>
                </View>
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
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    img: {
        width: '100%',
        resizeMode: 'cover',
        height: 200
    },
    itemImg: {
        height: 125,
        width: 125,

    },
    godTitle: {
        paddingVertical: 15,
        borderBottomColor: '#131625',
        borderBottomWidth: 15,
        paddingLeft: 5
    },
    godName: {
        color: 'white',
        fontSize: 40,
        fontWeight: '700',
        paddingLeft: 5
    },
    yellowText: {
        color: '#de7300',
        fontSize: 30,
        fontWeight: '500',
        padding: 5
    },
    whiteText: {
        color: 'white',
        fontSize: 18,
        padding: 10
    },
    itemRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 15,
        alignItems: 'center'
    },
    itemName: {
        color: 'white',
        fontSize: 18,
        width: 125,
        height: 60,
        textAlign: "center",
        overflow: 'scroll'
    },
    relicOrder: {
        color: '#de7300',
        textAlign: 'center',
        fontSize: 18
    },
    border: {
        borderBottomColor: '#131625',
        borderBottomWidth: 15
    },
    starterItems: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    starterItem: {
        margin: 20
    },
    explanation: {
        marginBottom: 20,
        padding: 5
    }

});


export default Build;