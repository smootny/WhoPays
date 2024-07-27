import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import { ThemedButton } from 'react-native-really-awesome-button';

const CircularButton = ({ onPress, style, title }) => {
    return (
        <TouchableOpacity style={[styles.container, style]}>
            <ThemedButton
                name="cartman"
                type="secondary"
                width={320}
                height={100}
                borderRadius={45}
                style={styles.play}
                onPress={onPress}
            >
                <Text style={styles.title}>{title}</Text>
            </ThemedButton>
        </TouchableOpacity>
    );
}

CircularButton.propTypes = {
    onPress: PropTypes.func.isRequired,
    style: PropTypes.object,
    title: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 130,
    },
    title: {
        color: '#ffe11d',
        fontSize: 30,
        fontFamily: 'CallDuty',
    }
});

export default CircularButton;
