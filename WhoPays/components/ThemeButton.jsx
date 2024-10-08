import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedButton } from 'react-native-really-awesome-button';
import ThemeModal from './ThemeModal';
import * as Haptics from "expo-haptics";

const ThemeButton = ({ style, onSelectTheme }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [theme, setTheme] = useState('Select Theme');
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);

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
                    width={300}
                    height={80}
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
        marginBottom: 0,
    },
    title: {
        color: '#ffe11d',
        fontSize: 30,
        fontFamily: 'CallDuty',
    }
});

export default ThemeButton;
