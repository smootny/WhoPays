import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from 'expo-router';
import { useFonts } from "expo-font";

export default function Title() {
    const navigation = useNavigation();
    const [fontsLoaded] = useFonts({
        "CallDuty": require("../assets/fonts/CallDuty.ttf")
    });

    if (!fontsLoaded) {
        return null;
    }

    return (
        <View>
            <Text style={styles.title}>Who</Text>
            <Text style={styles.titleSecond}>Pays?!</Text>
        </View>
    );
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
        textShadowColor: 'rgba(0, 0, 0, 1)',
        textShadowOffset: { width: 6, height: 8 },
        textShadowRadius: 1,
        shadowOpacity: 1,
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
        textShadowColor: 'rgba(0, 0, 0, 1)', 
        textShadowOffset: { width: 6, height: 8 },
        textShadowRadius: 1,
        shadowOpacity: 1,
    },
});
