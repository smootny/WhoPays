import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { useNavigation } from 'expo-router';
import {useFonts} from "expo-font";

export default function Title() {
    const navigation = useNavigation();
    const [fontsLoaded] = useFonts({
        "CallDuty": require("../assets/fonts/CallDuty.ttf")
    })
    if (!fontsLoaded) {
        return null;
    }

    return (
            <View>
                <Text style={styles.title}>Who</Text>
                <Text style={styles.titleSecond}>Pays?!</Text>
            </View>
    )
}

const styles = StyleSheet.create({

    title: {
        position: 'absolute',
        fontSize: 186,
        textAlign: 'center',
        marginTop: -20,
        marginLeft: 15,
        zIndex: 99,
        fontFamily: "CallDuty",
        color: '#FFF',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 20,
    },
        titleSecond: {
            position: 'absolute',
            fontSize: 76,
            textAlign: 'center',
            marginTop: 140,
            marginLeft: 80,
            zIndex: 99,
            fontFamily: "CallDuty",
            color: '#FFF',
            textShadowColor: 'rgba(0, 0, 0, 0.75)',
            textShadowOffset: {width: -1, height: 1},
            textShadowRadius: 20,
        }



});
