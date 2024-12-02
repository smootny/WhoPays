import React, { useRef, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import LottieView from 'lottie-react-native';

const SIZE = 120;

const GLOW_INITIAL_SCALE = 1;
const GLOW_MAXIMUM_SCALE = 1.1; 
const GLOW_DURATION = 1000;

const SHINE_LOOP_START_FRAME = 10;
const SHINE_LOOP_END_FRAME = 30;

const DiamondTouchCircle = ({ touch, isSelected, isWinner }) => {
  const diamondRef = useRef(null);
  const shiningRef = useRef(null);

  useEffect(() => {
    diamondRef.current?.play();
  }, []);

  useEffect(() => {
    if (shiningRef.current) {
      (isSelected || isWinner) ? shiningRef.current.play(SHINE_LOOP_START_FRAME, SHINE_LOOP_END_FRAME) : shiningRef.current.reset();
    }
  }, [isSelected, isWinner]);

  const glowAnimation = useAnimatedStyle(() => ({
    transform: [
      {
        scale: withRepeat(
          withSequence(
            withTiming(GLOW_MAXIMUM_SCALE, { duration: GLOW_DURATION / 2, easing: Easing.ease }),
            withTiming(GLOW_INITIAL_SCALE, { duration: GLOW_DURATION / 2, easing: Easing.ease })
          ),
          -1,
          true
        ),
      },
    ],
  }), [isSelected, isWinner]);

  return (
    <Animated.View style={[styles.container, { left: touch.x - SIZE / 2, top: touch.y - SIZE / 2 }, glowAnimation]}>
      <LottieView ref={diamondRef} source={require('../assets/themes/diamond_theme/diamond.json')} style={styles.lottie} loop autoPlay={false} />
      <LottieView ref={shiningRef} source={require('../assets/themes/diamond_theme/shining.json')} style={[styles.lottieShine, !(isSelected || isWinner) && { opacity: 0 }]} loop autoPlay={false} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  lottie: {
    width: SIZE,
    height: SIZE,
  },
  lottieShine: {
    width: SIZE,
    height: SIZE,
    position: 'absolute',
    bottom: 20,
    left: 10,
  },
  container: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default DiamondTouchCircle;
