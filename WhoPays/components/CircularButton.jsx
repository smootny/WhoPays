// CircularButton.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const CircularButton = ({ onPress, title, style }) => {
    return (
        <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
}

CircularButton.propTypes = {
    onPress: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    style: PropTypes.object,
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#FFF',
        borderRadius: 100,
        width: 150,
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
        borderStyle: "solid",
        borderWidth: 1,
    },
    text: {
        color: 'black',
        fontSize: 48,
        fontWeight: 'bold',
        fontFamily: 'CallDuty'
    },
});

export default CircularButton;
