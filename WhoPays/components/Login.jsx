// components/Login.jsx
import React, { useState } from 'react';
import { View, ImageBackground, StyleSheet } from 'react-native';
import CircularButton from './CircularButton';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from 'expo-router';
import Title from './Title';
import RNPickerSelect from 'react-native-picker-select';

export default function Login() {
    const navigation = useNavigation();
    const [theme, setTheme] = useState('galaxy');

    const handlePress = () => {
        // Navigate to GameScreen with selected theme
        navigation.navigate('gameScreen', { theme });
    };

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <ImageBackground
                    source={require('./../assets/images/startImage.png')}
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
                    <View style={styles.pickerContainer}>
                        <RNPickerSelect
                            onValueChange={(value) => setTheme(value)}
                            items={[
                                { label: 'Cloud Theme', value: 'cloud' },
                                { label: 'Parking Theme', value: 'parking' },
                                { label: 'Table Theme', value: 'table' },
                            ]}
                            style={pickerSelectStyles}
                            placeholder={{ label: 'Galaxy Theme', value: 'galaxy' }}
                        />
                    </View>
                    <CircularButton title="GO!" onPress={handlePress} style={styles.button} />
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
        bottom: 140, // Adjust as needed
        alignSelf: 'center',
        zIndex: 2,
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
        width: '80%',
        alignSelf: 'center',
        zIndex: 3,
    },
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 4,
        color: 'white',
        paddingRight: 30, // to ensure the text is never behind the icon
        textAlign: 'center',
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: 'white',
        borderRadius: 8,
        color: 'white',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
});
