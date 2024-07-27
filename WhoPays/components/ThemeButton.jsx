import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedButton } from 'react-native-really-awesome-button';
import ThemeModal from './ThemeModal';

const ThemeButton = ({ style, onSelectTheme }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [theme, setTheme] = useState('Select Theme');

    const handleThemeSelect = (selectedTheme) => {
        setTheme(selectedTheme);
        setModalVisible(false);
        onSelectTheme(selectedTheme);
    };

    return (
        <View style={style}>
            <TouchableOpacity style={styles.container}>
                <ThemedButton
                    name="cartman"
                    type="secondary"
                    width={320}
                    height={100}
                    borderRadius={45}
                    style={styles.play}
                    onPress={() => setModalVisible(true)}
                >
                    <Text style={styles.title}>{theme}</Text>
                </ThemedButton>
            </TouchableOpacity>
            <ThemeModal visible={modalVisible} onClose={() => setModalVisible(false)} onSelectTheme={handleThemeSelect} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
    },
    title: {
        color: '#ffe11d',
        fontSize: 30,
        fontFamily: 'CallDuty',
    }
});

export default ThemeButton;
