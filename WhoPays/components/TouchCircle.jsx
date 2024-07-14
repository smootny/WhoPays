// components/TouchCircle.jsx
import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import Animated, {
    useAnimatedStyle,
    withRepeat,
    withSequence,
    withTiming,
} from 'react-native-reanimated';

const SIZE = 80;

const GLOW_INITIAL_SCALE = 1.6; // Scale of the glow
const GLOW_MINIMUM_SCALE = 1.2;
const GLOW_DURATION = 3000;

const TouchCircle = ({ touch, isSelected, isWinner, theme }) => {
    const useGlowAnimation = () => {
        return useAnimatedStyle(() => ({
            transform: [
                {
                    scale: withRepeat(
                        withSequence(
                            // Go to minimal value on half scaling duration
                            withTiming(GLOW_MINIMUM_SCALE, { duration: GLOW_DURATION / 2 }),
                            // and go to initial value during other half
                            withTiming(GLOW_INITIAL_SCALE, { duration: GLOW_DURATION / 2 })
                        ),
                        // Loop the animation
                        -1,
                        // Loop in both direction (small => big, big => small)
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
            <Image
                source={
                    theme === 'galaxy'
                        ? require('../assets/themes/galaxy_theme/sun.png')
                        : theme === 'cloud'
                            ? require('../assets/themes/cloud_theme/cloud.png')
                            : theme === 'parking'
                                ? require('../assets/themes/parking_theme/car.png')
                                : require('../assets/themes/table_theme/full_plate.png')
                }
                style={styles.image}
            />
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

export default TouchCircle;
