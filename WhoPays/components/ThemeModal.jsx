import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import {ThemedButton} from "react-native-really-awesome-button";
import Animated, { BounceInDown } from 'react-native-reanimated'
const ThemeModal = ({ visible, onClose, onSelectTheme }) => {
    const themes = [
        { label: 'Galaxy Theme', value: 'galaxy' },
        { label: 'Cloud Theme', value: 'cloud' },
        { label: 'Parking Theme', value: 'parking' },
        { label: 'Table Theme', value: 'table' },
    ];

    const animation = BounceInDown.duration(600)

    return (

        <Modal visible={visible} transparent={true} animationType="slide">
            <View style={styles.modalBackground} >
                <Animated.View style={styles.modalContainer} entering={animation}>
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
                        <ThemedButton name="cartman"
                                      type="secondary"
                                      width={100} style={styles.closeButton} onPress={onClose}>
                        <Text style={styles.closeButtonText}>Close</Text></ThemedButton>
                    </TouchableOpacity>
                </Animated.View>
            </View>
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
        fontWeight: 'light'
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
