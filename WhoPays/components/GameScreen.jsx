import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, PanResponder, Text, ImageBackground, Animated, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';
import DiamondTouchCircle from './DiamondTouchCircle';
import CloudTouchCircle from './CloudTouchCircle';
import TableTouchCircle from './TableTouchCircle';
import MineTouchCircle from './MineTouchCircle';
import { useFonts } from 'expo-font';
import * as Haptics from "expo-haptics";

const GameScreen = () => {
    const route = useRoute();
    const { theme } = route.params;

    const [touches, setTouches] = useState([]);
    const [selectedTouch, setSelectedTouch] = useState(null);
    const [isCounting, setIsCounting] = useState(false);
    const [winner, setWinner] = useState(null);
    const [showOverlay, setShowOverlay] = useState(true);
    const opacityAnim = useRef(new Animated.Value(1)).current;

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
        }, 10000); 
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
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
                if (showOverlay) {
                    Animated.timing(opacityAnim, {
                        toValue: 0,
                        duration: 500,
                        useNativeDriver: true,
                    }).start(() => {
                        setShowOverlay(false);
                    });
                }
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
                setWinner(null);
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
                timeoutRef.current = setTimeout(startCounting, 2000); 
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
                timeoutRef.current = setTimeout(startCounting, 2000); 
            },
        })
    ).current;

    useEffect(() => {
        if (isCounting && touches.length > 0) {
            const intervalId = setInterval(() => {
                const randomIndex = Math.floor(Math.random() * touches.length);
                setSelectedTouch(touches[randomIndex].id);
            }, 100);

            return () => clearInterval(intervalId);
        }
    }, [isCounting, touches]);

    if (!fontsLoaded) {
        return null;
    }

    const TouchCircleComponent = theme === 'cloud' ? CloudTouchCircle
        : theme === 'table' ? TableTouchCircle
        : theme === 'mine' ? MineTouchCircle
        : DiamondTouchCircle;

    return (
        <ImageBackground
            source={
                    theme === 'cloud'
                        ? require('../assets/themes/cloud_theme/sky.png')
                            : theme === 'table'
                                ? require('../assets/themes/table_theme/table.png')
                                : theme === 'mine'
                                    ? require('../assets/themes/mine_theme/mine.png')
                                    : require('../assets/themes/diamond_theme/jewelry.png')
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
                {showOverlay && (
                    <Animated.View style={[styles.overlay, { opacity: opacityAnim }]}>
                        <Text style={styles.overlayText}>Touch the screen </Text>
                        <Image
                            source={require('../assets/images/touch-screen.png')}
                            style={styles.icon}
                        />
                    </Animated.View>
                )}
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
        top: 70,
        right: 20,
        color: '#FFF',
        fontSize: 24,
        fontFamily: 'CallDuty',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
    },
    overlayText: {
        color: '#FFF',
        fontSize: 30,
        fontFamily: 'CallDuty',
    },
    icon: {
        width: 200,
        height: 200,
        top: 40,
        resizeMode: 'contain',
    },
});

export default GameScreen;
