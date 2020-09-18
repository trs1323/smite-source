import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import * as Linking from 'expo-linking';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faTwitch, faYoutube } from '@fortawesome/free-brands-svg-icons'

const Home = props => {

    const openLink = url => {
        Linking.openURL(url);

    };

    return (
        <View style={styles.home}>
            <Image style={styles.img} source={{ uri: "https://web2.hirez.com/smite-media//wp-content/uploads/2020/09/SMITE-PatchBadge-7pt10-LOKI-NOTES-BlogPreviewHeader-2560x695-2000x695.jpg" }} />
            <Text style={styles.whiteText}>The Trickster God | 7.10 Update Notes</Text>
            <TouchableOpacity style={styles.btn} onPress={() => openLink('https://www.smitegame.com/news/the-trickster-god-7-10-update-notes')}>
                <Text style={styles.whiteText} >Read More</Text>
            </TouchableOpacity>
            <View style={styles.social}>
                <View>
                    <TouchableOpacity style={styles.twitchContainer} onPress={() => openLink('https://www.twitch.tv/weak3n')}>
                        <FontAwesomeIcon icon={faTwitch} style={styles.twitch} size={56} />
                        <Text style={styles.whiteText}>Weak3n</Text>
                    </TouchableOpacity>
                </View>
                <View >
                    <TouchableOpacity style={styles.youtubeContainer} onPress={() => openLink('https://www.youtube.com/user/Weak3nSmite')}>
                        <FontAwesomeIcon icon={faYoutube} style={styles.youtube} size={56} />
                        <Text style={styles.whiteText}>Weak3n</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    )
};

const styles = StyleSheet.create({
    home: {

    },
    img: {
        width: '100%',
        height: 250
    },
    btn: {
        marginLeft: 'auto',
        marginRight: 10,
        backgroundColor: "#de7300",
        padding: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.41,
        shadowRadius: 9.11,
        elevation: 14,

    },
    whiteText: {
        color: 'white',
        fontSize: 25,
        fontWeight: '700',
        paddingLeft: 5
    },
    yellowText: {
        color: '#de7300',
        fontSize: 25,
        fontWeight: '700'
    },
    twitch: {
        color: 'white'
    },
    youtube: {
        color: 'white'
    },
    twitchContainer: {
        backgroundColor: '#6441a5',
        paddingVertical: 10,
        paddingLeft: 5,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',

    },
    youtubeContainer: {
        backgroundColor: '#ff0000',
        paddingVertical: 10,
        paddingLeft: 5,
        flexDirection: 'row',
        alignItems: 'center'
    },
    social: {
        marginTop: 100,
    }

});


export default Home;