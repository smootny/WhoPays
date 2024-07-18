// components/GameScreen.jsx
import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, PanResponder, Text, ImageBackground } from 'react-native';
import { useRoute } from '@react-navigation/native';
import GalaxyTouchCircle from './GalaxyTouchCircle';
import CloudTouchCircle from './CloudTouchCircle';
import ParkingTouchCircle from './ParkingTouchCircle';
import TableTouchCircle from './TableTouchCircle';
import { useFonts } from 'expo-font';

const GameScreen = () => {
    const route = useRoute();
    const { theme } = route.params;

    const [touches, setTouches] = useState([]);
    const [selectedTouch, setSelectedTouch] = useState(null);
    const [isCounting, setIsCounting] = useState(false);
    const [winner, setWinner] = useState(null);
    const timeoutRef = useRef(null);
    const countingTimeoutRef = useRef(null);

    const [fontsLoaded] = useFonts({
        'CallDuty': require('../assets/fonts/CallDuty.ttf'),
    });

    const startCounting = () => {
        setIsCounting(true);
        countingTimeoutRef.current = setTimeout(() => {
            setIsCounting(false);
            selectWinner();
        }, 10000); // Extend the duration to 10 seconds
    };

    const selectWinner = () => {
        if (touches.length > 1) {
            const randomIndex = Math.floor(Math.random() * touches.length);
            setWinner(touches[randomIndex].id);
        }
    };

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => true,
            onPanResponderGrant: (evt) => {
                clearTimeout(timeoutRef.current);
                clearTimeout(countingTimeoutRef.current);
                const { touches: allTouches } = evt.nativeEvent;
                const newTouches = allTouches.map(touch => ({
                    id: touch.identifier,
                    x: touch.pageX,
                    y: touch.pageY,
                    active: true,
                }));
                setTouches(prevTouches => {
                    const updatedTouches = [...prevTouches];
                    newTouches.forEach(newTouch => {
                        const existingTouch = updatedTouches.find(t => t.id === newTouch.id);
                        if (existingTouch) {
                            existingTouch.x = newTouch.x;
                            existingTouch.y = newTouch.y;
                            existingTouch.active = true;
                        } else {
                            updatedTouches.push(newTouch);
                        }
                    });
                    return updatedTouches;
                });
                setWinner(null); // Reset winner when new touch is detected
            },
            onPanResponderMove: (evt) => {
                clearTimeout(timeoutRef.current);
                clearTimeout(countingTimeoutRef.current);
                const { touches: allTouches } = evt.nativeEvent;
                setTouches(prevTouches => {
                    const updatedTouches = [...prevTouches];
                    allTouches.forEach(touch => {
                        const existingTouch = updatedTouches.find(t => t.id === touch.identifier);
                        if (existingTouch) {
                            existingTouch.x = touch.pageX;
                            existingTouch.y = touch.pageY;
                        } else {
                            updatedTouches.push({
                                id: touch.identifier,
                                x: touch.pageX,
                                y: touch.pageY,
                                active: true,
                            });
                        }
                    });
                    return updatedTouches;
                });
                setWinner(null); // Reset winner when touches move
            },
            onPanResponderRelease: (evt) => {
                const { changedTouches } = evt.nativeEvent;
                setTouches(prevTouches =>
                    prevTouches.map(touch =>
                        changedTouches.find(t => t.identifier === touch.id)
                            ? { ...touch, active: false }
                            : touch
                    )
                );
                timeoutRef.current = setTimeout(startCounting, 2000); // Start counting after 2 seconds of no new touches
            },
            onPanResponderTerminate: (evt) => {
                const { changedTouches } = evt.nativeEvent;
                setTouches(prevTouches =>
                    prevTouches.map(touch =>
                        changedTouches.find(t => t.identifier === touch.id)
                            ? { ...touch, active: false }
                            : touch
                    )
                );
                timeoutRef.current = setTimeout(startCounting, 2000); // Start counting after 2 seconds of no new touches
            },
        })
    ).current;

    useEffect(() => {
        if (isCounting && touches.length > 0) {
            const intervalId = setInterval(() => {
                const randomIndex = Math.floor(Math.random() * touches.length);
                setSelectedTouch(touches[randomIndex].id);
            }, 100); // Switch faster, every 0.1 seconds

            return () => clearInterval(intervalId);
        }
    }, [isCounting, touches]);

    if (!fontsLoaded) {
        return null;
    }

    const TouchCircleComponent = theme === 'galaxy' ? GalaxyTouchCircle
        : theme === 'cloud' ? CloudTouchCircle
            : theme === 'parking' ? ParkingTouchCircle
                : TableTouchCircle;

    return (
        <ImageBackground
            source={
                theme === 'galaxy'
                    ? require('../assets/themes/galaxy_theme/galaxy.png')
                    : theme === 'cloud'
                        ? require('../assets/themes/cloud_theme/sky.png')
                        : theme === 'parking'
                            ? require('../assets/themes/parking_theme/parking.png')
                            : require('../assets/themes/table_theme/table.png')
            }
            style={styles.background}
        >
            <View style={styles.container} {...panResponder.panHandlers}>
                {touches.map(touch => (
                    <TouchCircleComponent
                        key={touch.id}
                        touch={touch}
                        isWinner={touch.id === winner}
                        isSelected={touch.id === selectedTouch}
                    />
                ))}
                <Text style={styles.counter}>Players: {touches.length}</Text>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover',
    },
    container: {
        flex: 1,
    },
    counter: {
        position: 'absolute',
        bottom: 50,
        left: 20,
        color: '#FFF',
        fontSize: 24,
        fontFamily: 'CallDuty',
    },
});

export default GameScreen;
