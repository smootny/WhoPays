import React, { useEffect } from 'react';
import { Modal, View, Text, StyleSheet } from 'react-native';
import { ThemedButton } from "react-native-really-awesome-button";
import Animated, { useSharedValue, useAnimatedStyle, withTiming, BounceIn } from 'react-native-reanimated';
import ThemeTile from './ThemeTile';

const ThemeModal = ({ visible, onClose, onSelectTheme }) => {
    const themes = [
        { label: 'Cloud Theme', value: 'cloud', image: require('../assets/themes/cloud_theme/sky.png') },
        { label: 'Table Theme', value: 'table', image: require('../assets/themes/table_theme/table.png') },
        { label: 'Mine Theme', value: 'mine', image: require('../assets/themes/mine_theme/mine.png') },
        { label: 'Diamond Theme', value: 'diamond', image: require('../assets/themes/diamond_theme/jewelry.png') },
    ];

    const backgroundOpacity = useSharedValue(0);

    // Animated style for the modal background fade-in effecta
    const animatedBackgroundStyle = useAnimatedStyle(() => {
        return {
            opacity: withTiming(backgroundOpacity.value, { duration: 400 }),
        };
    });

    useEffect(() => {
        if (visible) {
            backgroundOpacity.value = 1;
        } else {
            backgroundOpacity.value = 0;
        }
    }, [visible, backgroundOpacity]);


    return (
        <Modal visible={visible} transparent={true} animationType="none">
            <Animated.View style={[styles.modalBackground, animatedBackgroundStyle]}>
                <Animated.View style={styles.modalContainer} entering={BounceIn.duration(500)}>
                    <Text style={styles.modalTitle}>Select Theme</Text>
                    <View style={styles.tilesContainer}>
                        {themes.map((theme) => (
                            <ThemeTile key={theme.value} theme={theme} onSelect={onSelectTheme} />
                        ))}
                    </View>
                    <ThemedButton
                        name="cartman"
                        type="secondary"
                        width={100}
                        style={styles.closeButton}
                        onPress={onClose}
                    >
                        <Text style={styles.closeButtonText}>Close</Text>
                    </ThemedButton>
                </Animated.View>
            </Animated.View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: '80%',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 24,
        marginBottom: 20,
        fontFamily: 'CallDuty',
        color: '#DA4456',
    },
    tilesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    closeButton: {
        marginTop: 20,
    },
    closeButtonText: {
        fontSize: 20,
        color: 'white',
        fontFamily: 'CallDuty',
    },
});

export default ThemeModal;

