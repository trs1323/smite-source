import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, FlatList } from 'react-native';
import { YellowBox } from 'react-native'

YellowBox.ignoreWarnings([
    'VirtualizedLists should never be nested', // TODO: Remove when fixed
]);



const Build = props => {


    const checkImg = () => {
        if (props.currentGodImg.length > 0) {
            return props.currentGodImg[0].Header;

        } else {
            return props.currentGod[0].godIcon_URL
        }
    }

    return (
        <ScrollView>
            <View>

                <View style={styles.imgContainer}>
                    <Image style={styles.img} source={{ uri: `${checkImg()}` }} />
                </View>

                <View style={styles.godTitle}>
                    <Text style={styles.godName}>{props.currentGod[0].Name}</Text>
                    <Text style={styles.yellowText}>{props.currentBuild.title}</Text>
                    <Text style={styles.whiteText}>{props.currentBuild.subtitle}</Text>
                </View>

                <View style={styles.border}>
                    <Text style={styles.yellowText}>Final Items:</Text>
                    <View style={styles.itemRow}>
                        <View>
                            <Image style={styles.itemImg} source={{ uri: `${props.currentBuild.final[0].itemIcon_URL}` }} />
                            <Text style={styles.itemName}>{props.currentBuild.final[0].DeviceName}</Text>
                        </View>
                        <View>
                            <Image style={styles.itemImg} source={{ uri: `${props.currentBuild.final[1].itemIcon_URL}` }} />
                            <Text style={styles.itemName}>{props.currentBuild.final[1].DeviceName}</Text>
                        </View>
                    </View>
                    <View style={styles.itemRow}>
                        <View>
                            <Image style={styles.itemImg} source={{ uri: `${props.currentBuild.final[2].itemIcon_URL}` }} />
                            <Text style={styles.itemName}>{props.currentBuild.final[2].DeviceName}</Text>
                        </View>
                        <View>
                            <Image style={styles.itemImg} source={{ uri: `${props.currentBuild.final[3].itemIcon_URL}` }} />
                            <Text style={styles.itemName}>{props.currentBuild.final[3].DeviceName}</Text>
                        </View>
                    </View>
                    <View style={styles.itemRow}>
                        <View>
                            <Image style={styles.itemImg} source={{ uri: `${props.currentBuild.final[4].itemIcon_URL}` }} />
                            <Text style={styles.itemName}>{props.currentBuild.final[4].DeviceName}</Text>
                        </View>
                        <View>
                            <Image style={styles.itemImg} source={{ uri: `${props.currentBuild.final[5].itemIcon_URL}` }} />
                            <Text style={styles.itemName}>{props.currentBuild.final[5].DeviceName}</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.border}>
                    <Text style={styles.yellowText}>Relics:</Text>
                    <View style={styles.itemRow}>
                        <View>
                            <Text style={styles.relicOrder}>Starter Relic</Text>
                            <Image style={styles.itemImg} source={{ uri: `${props.currentBuild.relics[0].itemIcon_URL}` }} />
                            <Text style={styles.itemName}>{props.currentBuild.relics[0].DeviceName}</Text>
                        </View>
                        <View>
                            <Text style={styles.relicOrder}>Second Relic</Text>
                            <Image style={styles.itemImg} source={{ uri: `${props.currentBuild.relics[1].itemIcon_URL}` }} />
                            <Text style={styles.itemName}>{props.currentBuild.relics[1].DeviceName}</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.border}>
                    <Text style={styles.yellowText}>Starter Items:</Text>
                    <View style={styles.starterItems}>
                        <FlatList

                            data={props.currentBuild.starter}
                            keyExtractor={(item, index) => item.ItemId + [index]}
                            numColumns={2}
                            renderItem={({ item }) =>
                                <View style={styles.starterItem}>

                                    <Image style={styles.itemImg} source={{ uri: `${item.itemIcon_URL}` }} />
                                    <Text style={styles.itemName}>{item.DeviceName}</Text>
                                </View>}
                        />
                    </View>
                </View>
                <View style={styles.explanation}>
                    <Text style={styles.yellowText}>Explanation:</Text>
                    <Text style={styles.whiteText}>{props.currentBuild.explanation}</Text>
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