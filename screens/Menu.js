import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { YellowBox } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faChevronDown, faChevronRight } from '@fortawesome/free-solid-svg-icons';

YellowBox.ignoreWarnings([
    'VirtualizedLists should never be nested', // TODO: Remove when fixed
]);



const Menu = props => {
    const [builds, showBuilds] = useState(false);
    const [assassins, showAssassins] = useState(false);
    const [hunters, showHunters] = useState(false);
    const [guardians, showGuardians] = useState(false);
    const [mages, showMages] = useState(false);
    const [warriors, showWarriors] = useState(false);

    const [allHunters, setAllHunters] = useState();
    const [allAssassins, setAllAssassins] = useState();
    const [allGuardians, setAllGuardians] = useState();
    const [allMages, setAllMages] = useState();
    const [allWarriors, setAllWarriors] = useState();



    useEffect(() => {
        setAllHunters(props.allGods.filter(function (item) {
            return item.Roles == "Hunter"
        }))

        setAllAssassins(props.allGods.filter(function (item) {
            return item.Roles == "Assassin"
        }))

        setAllGuardians(props.allGods.filter(function (item) {
            return item.Roles == "Guardian"
        }))

        setAllMages(props.allGods.filter(function (item) {
            return item.Roles == "Mage"
        }))

        setAllWarriors(props.allGods.filter(function (item) {
            return item.Roles == "Warrior"
        }))
    }, [])

    const doneFetching = () => {
        props.setLoading(false)
        props.showGodScreen(true)
    }

    const godClicked = (name) => {
        props.setGod(name);
        props.showMenu(false);
        props.setLoading(true)
        fetch(`https://us-central1-smite-source.cloudfunctions.net/api/builds/${name}`)
            .then((response) =>
                response.json()
            )
            .then((json) => props.setGodSelected(json.data))
            .catch((error) => console.error(error))
            .finally(() => doneFetching())

    };

    const goHome = () => {
        props.showMenu(false);
        props.showGodScreen(false);
        props.showBuildScreen(false);
        props.showTierlist(false);
        props.showGiveawayScreen(false);
        props.showAboutScreen(false);
    };

    const doneFetchingTierlist = () => {
        props.setLoading(false)
        props.showTierlist(true)
    }

    const changeScreen = linked => {
        props.showGodScreen(false);
        props.showBuildScreen(false);
        props.showMenu(false);
        props.showAboutScreen(false);
        props.showGiveawayScreen(false);
        props.showTierlist(false);
        if (linked === 'About') {
            props.showAboutScreen(true)
        } else if (linked === 'Giveaway') {
            props.showGiveawayScreen(true)
        } else if (linked === 'Tierlist') {
            props.setLoading(true);
            fetch(`https://us-central1-smite-source.cloudfunctions.net/api/tierlists`)
                .then((response) =>
                    response.json()
                )
                .then((json) => props.setCurrentTierlist(json.data))
                .catch((error) => console.error(error))
                .finally(() => doneFetchingTierlist())

        }
    }

    const changeArrow = (c) => {
        if (c === false) {
            return faChevronRight
        } else {
            return faChevronDown
        }
    }


    return (
        <ScrollView style={styles.menu}>
            <View style={styles.menutext}>
                <TouchableOpacity onPress={goHome}>
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
                            <FontAwesomeIcon style={styles.text} icon={changeArrow(assassins)} />
                            <Text style={styles.text}>ASSASSINS</Text>
                        </TouchableOpacity>
                        <View style={(assassins === false) ? styles.classtextHidden : styles.classNames}>
                            <FlatList
                                data={allAssassins}
                                keyExtractor={item => item.Name}
                                renderItem={({ item }) =>
                                    <View>
                                        <TouchableOpacity onPress={() => godClicked(item.id)}>
                                            <Text style={styles.godText}>{item.Name}</Text>
                                        </TouchableOpacity>
                                    </View>}
                            />
                        </View>
                    </View>
                    <View >
                        <TouchableOpacity style={styles.classtext} onPress={() => showHunters(!hunters)}>
                            <FontAwesomeIcon style={styles.text} icon={changeArrow(hunters)} />
                            <Text style={styles.text}>HUNTERS</Text>
                        </TouchableOpacity>
                        <View style={(hunters === false) ? styles.classtextHidden : styles.classNames}>

                            <FlatList
                                data={allHunters}
                                keyExtractor={item => item.Name}
                                renderItem={({ item }) =>
                                    <View>
                                        <TouchableOpacity onPress={() => godClicked(item.id)}>
                                            <Text style={styles.godText}>{item.Name}</Text>
                                        </TouchableOpacity>
                                    </View>}
                            />
                        </View>
                    </View>
                    <View >
                        <TouchableOpacity style={styles.classtext} onPress={() => showGuardians(!guardians)}>
                            <FontAwesomeIcon style={styles.text} icon={changeArrow(guardians)} />
                            <Text style={styles.text}>GUARDIANS</Text>
                        </TouchableOpacity>
                        <View style={(guardians === false) ? styles.classtextHidden : styles.classNames}>
                            <FlatList
                                data={allGuardians}
                                keyExtractor={item => item.Name}
                                renderItem={({ item }) =>
                                    <View>
                                        <TouchableOpacity onPress={() => godClicked(item.id)}>
                                            <Text style={styles.godText}>{item.Name}</Text>
                                        </TouchableOpacity>
                                    </View>}
                            />
                        </View>
                    </View>
                    <View >
                        <TouchableOpacity style={styles.classtext} onPress={() => showMages(!mages)}>
                            <FontAwesomeIcon style={styles.text} icon={changeArrow(mages)} />
                            <Text style={styles.text}>MAGES</Text>
                        </TouchableOpacity>
                        <View style={(mages === false) ? styles.classtextHidden : styles.classNames}>
                            <FlatList
                                data={allMages}
                                keyExtractor={item => item.Name}
                                renderItem={({ item }) =>
                                    <View>
                                        <TouchableOpacity onPress={() => godClicked(item.id)}>
                                            <Text style={styles.godText}>{item.Name}</Text>
                                        </TouchableOpacity>
                                    </View>}
                            />
                        </View>
                    </View>
                    <View >
                        <TouchableOpacity style={styles.classtext} onPress={() => showWarriors(!warriors)}>
                            <FontAwesomeIcon style={styles.text} icon={changeArrow(warriors)} />
                            <Text style={styles.text}>WARRIORS</Text>
                        </TouchableOpacity>
                        <View style={(warriors === false) ? styles.classtextHidden : styles.classNames}>
                            <FlatList
                                data={allWarriors}
                                keyExtractor={item => item.Name}
                                renderItem={({ item }) =>
                                    <View>
                                        <TouchableOpacity onPress={() => godClicked(item.id)}>
                                            <Text style={styles.godText}>{item.Name}</Text>
                                        </TouchableOpacity>
                                    </View>}
                            />
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.menutext}>
                <TouchableOpacity onPress={() => changeScreen('Tierlist')}>
                    <Text style={styles.text}>TIER LISTS</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.menutext}>
                <TouchableOpacity onPress={() => changeScreen('About')}>
                    <Text style={styles.text}>ABOUT</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.menutext}>
                <TouchableOpacity onPress={() => changeScreen('Giveaway')}>
                    <Text style={styles.text}>GIVEAWAY</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};



const styles = StyleSheet.create({
    menu: {
        width: '60%',
        backgroundColor: '#252b45',
        paddingHorizontal: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 8,
        overflow: 'scroll',
        paddingTop: 30
    },
    menutext: {
        marginVertical: 25,
    },
    classtextHidden: {
        display: 'none'
    },
    classtext: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        paddingLeft: 10,

    },
    text: {
        color: 'white',
        fontWeight: '700',
        paddingVertical: 5
    },
    godText: {
        color: '#d1d1d1',
        paddingVertical: 10,
        marginLeft: 25,
    },

});

export default Menu;