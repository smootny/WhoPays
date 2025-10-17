import React, { useState } from 'react';
import { View, ImageBackground, StyleSheet } from 'react-native';
import CircularButton from './CircularButton';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from 'expo-router';
import Title from './Title';
import ThemeButton from './ThemeButton';
import * as Haptics from 'expo-haptics';
import { themes } from '../constants/themes';

export default function Login() {
    const navigation = useNavigation();
    const [selectedTheme, setSelectedTheme] = useState(null)

    const handlePress = () => {
        const theme = selectedTheme || themes[Math.floor(Math.random() * themes.length)].value;

        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

        navigation.navigate('gameScreen', { theme });
    };

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <ImageBackground
                    source={require('./../assets/images/login-image.png')}
                    style={styles.image}
                >
                    <LinearGradient
                        colors={['rgba(0,0,0,0.8)', 'transparent']}
                        start={{ x: 1, y: 1 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.gradient}
                    />
                    <View style={styles.titleContainer}>
                        <Title style={styles.title} />
                    </View>
                    <ThemeButton  style={styles.themeButton} onSelectTheme={setSelectedTheme} />
                    <CircularButton  title="Play Game" onPress={handlePress} style={styles.button} />
                </ImageBackground>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageContainer: {
        width: '100%',
        height: '100%',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    button: {
        position: 'absolute',
        bottom: 150,
        alignSelf: 'center',
        zIndex: 2,
        marginVertical: 10,
    },
    themeButton: {
        position: 'absolute',
        bottom: 50,
        alignSelf: 'center',
        zIndex: 2,
        marginVertical: 10,
    },
    gradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: '100%',
        zIndex: 1,
    },
    titleContainer: {
        position: 'absolute',
        top: '10%',
        left: '5%',
        zIndex: 2,
    },
    pickerContainer: {
        position: 'absolute',
        bottom: 60,
        width: '75%',
        alignSelf: 'center',
        zIndex: 3,
    },
});


