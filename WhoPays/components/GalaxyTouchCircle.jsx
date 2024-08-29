import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import Animated, { useAnimatedStyle, withRepeat, withSequence, withTiming } from 'react-native-reanimated';

const SIZE = 100;

const GLOW_INITIAL_SCALE = 1.6; // Scale of the glow
const GLOW_MINIMUM_SCALE = 1.2;
const GLOW_DURATION = 3000;

const GalaxyTouchCircle = ({ touch, isSelected, isWinner }) => {
    const useGlowAnimation = () => {
        return useAnimatedStyle(() => ({
            transform: [
                {
                    scale: withRepeat(
                        withSequence(
                            withTiming(GLOW_MINIMUM_SCALE, { duration: GLOW_DURATION / 2 }),
                            withTiming(GLOW_INITIAL_SCALE, { duration: GLOW_DURATION / 2 })
                        ),
                        -1,
                        true
                    ),
                },
            ],
        }));
    };

    const glowAnimation = useGlowAnimation();

    return (
        <View style={[styles.container, { left: touch.x - SIZE / 2, top: touch.y - SIZE / 2 }]}>
            {(isSelected || isWinner) && (
                <Animated.View style={[styles.glowContainer, glowAnimation]}>
                    <Image source={require('../assets/themes/galaxy_theme/sun-glow.png')} style={styles.image} />
                </Animated.View>
            )}
            <Image source={require('../assets/themes/galaxy_theme/sun.png')} style={styles.image} />
        </View>
    );
};

const styles = StyleSheet.create({
    image: {
        width: SIZE,
        height: SIZE,
    },
    container: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
    },
    glowContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        width: SIZE,
        height: SIZE,
    },
});

export default GalaxyTouchCircle;
