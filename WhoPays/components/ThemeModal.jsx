import React, { useEffect } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ThemedButton } from "react-native-really-awesome-button";
import Animated, { useSharedValue, useAnimatedStyle, withTiming, BounceIn } from 'react-native-reanimated';

const ThemeModal = ({ visible, onClose, onSelectTheme }) => {
    const themes = [
        { label: 'Galaxy Theme', value: 'galaxy' },
        { label: 'Cloud Theme', value: 'cloud' },
        { label: 'Parking Theme', value: 'parking' },
        { label: 'Table Theme', value: 'table' },
    ];

    // Shared value for background opacity
    const backgroundOpacity = useSharedValue(0);

    // Animated style for the modal background fade-in effect
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
                    {themes.map((theme) => (
                        <TouchableOpacity
                            key={theme.value}
                            style={styles.themeOption}
                            onPress={() => onSelectTheme(theme.value)}
                        >
                            <Text style={styles.themeText}>{theme.label}</Text>
                        </TouchableOpacity>
                    ))}
                    <TouchableOpacity>
                        <ThemedButton
                            name="cartman"
                            type="secondary"
                            width={100}
                            style={styles.closeButton}
                            onPress={onClose}
                        >
                            <Text style={styles.closeButtonText}>Close</Text>
                        </ThemedButton>
                    </TouchableOpacity>
                </Animated.View>
            </Animated.View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
    themeOption: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        width: '100%',
        alignItems: 'center',
    },
    themeText: {
        fontSize: 28,
        fontFamily: 'CallDuty',
    },
    closeButton: {
        marginTop: 10,
    },
    closeButtonText: {
        fontSize: 20,
        color: 'white',
        fontFamily: 'CallDuty',
    },
});

export default ThemeModal;
