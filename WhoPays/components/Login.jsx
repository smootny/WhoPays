import React, { useEffect, useState } from 'react';
import { View, ImageBackground, StyleSheet } from 'react-native';
import CircularButton from './CircularButton';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from 'expo-router';
import Title from './Title';
import ThemeButton from './ThemeButton';
import * as Haptics from 'expo-haptics';
import { themes } from '../constants/themes';
import OnboardingModal from './OnboardingModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import IconCircleButton from './IconCircleButton';

const ONBOARDING_STORAGE_KEY = 'whopays_onboarding_done_v1';

export default function Login() {
    const navigation = useNavigation();

    const [selectedTheme, setSelectedTheme] = useState(null);
    const [onboardingVisible, setOnboardingVisible] = useState(false);
    const [onboardingDone, setOnboardingDone] = useState(false);
    const [pendingTheme, setPendingTheme] = useState(null);

    useEffect(() => {
        const loadOnboardingState = async () => {
            try {
                const storedFlag = await AsyncStorage.getItem(ONBOARDING_STORAGE_KEY);

                if (storedFlag === 'true') {
                    setOnboardingDone(true);
                    setOnboardingVisible(false);
                } else {
                    setOnboardingDone(false);
                    setOnboardingVisible(true);
                }
            } catch {
                setOnboardingDone(false);
                setOnboardingVisible(true);
            }
        };

        loadOnboardingState();
    }, []);

    const navigateToGame = (theme) => {
        navigation.navigate('gameScreen', { theme });
    };

    const handlePress = async () => {
        const theme =
            selectedTheme ||
            themes[Math.floor(Math.random() * themes.length)].value;

        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

        if (!onboardingDone) {
            setPendingTheme(theme);
            setOnboardingVisible(true);
            return;
        }

        navigateToGame(theme);
    };

    const handleOnboardingFinish = async () => {
        try {
            await AsyncStorage.setItem(
                ONBOARDING_STORAGE_KEY,
                'true'
            );
        } catch {}

        setOnboardingDone(true);
        setOnboardingVisible(false);

        if (pendingTheme) {
            navigateToGame(pendingTheme);
            setPendingTheme(null);
        }
    };

    const handleOnboardingClose = async () => {
        try {
            await AsyncStorage.setItem(
                ONBOARDING_STORAGE_KEY,
                'true'
            );
        } catch {}

        setOnboardingDone(true);
        setOnboardingVisible(false);
        setPendingTheme(null);
    };

    const openOnboardingFromInfo = async () => {
        await Haptics.impactAsync(
            Haptics.ImpactFeedbackStyle.Soft
        );

        setPendingTheme(null);
        setOnboardingVisible(true);
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

                    <IconCircleButton
                        iconName="information"
                        onPress={openOnboardingFromInfo}
                        size={34}
                        style={styles.infoButton}
                    />

                    <ThemeButton
                        style={styles.themeButton}
                        onSelectTheme={setSelectedTheme}
                    />

                    <CircularButton
                        title="Play Game"
                        onPress={handlePress}
                        style={styles.button}
                    />
                </ImageBackground>
            </View>

            <OnboardingModal
                visible={onboardingVisible}
                onClose={handleOnboardingClose}
                onFinish={handleOnboardingFinish}
            />
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

    infoButton: {
        position: 'absolute',
        top: 56,
        right: 18,
        zIndex: 3,
    },

    pickerContainer: {
        position: 'absolute',
        bottom: 60,
        width: '75%',
        alignSelf: 'center',
        zIndex: 3,
    },
});