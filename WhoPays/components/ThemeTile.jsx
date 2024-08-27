import React from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';

const ThemeTile = ({ theme, onSelect }) => {
    return (
        <TouchableOpacity style={styles.container} onPress={() => onSelect(theme.value)}>
            <ImageBackground source={theme.image} style={styles.image} imageStyle={{ borderRadius: 10 }}>
                <View style={styles.overlay}>
                    <Text style={styles.text}>{theme.label}</Text>
                </View>
            </ImageBackground>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        margin: 18,
        width: 100,
        height: 100,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,

        elevation: 7,
    },
    image: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 10,
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: 'white',
        fontSize: 14,
        fontFamily: 'CallDuty',
        textAlign: 'center',
    },
});

export default ThemeTile;
