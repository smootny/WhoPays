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

const MineTouchCircle = ({ touch, isSelected, isWinner }) => {
  const coinRef = useRef(null);
  const backgroundRef = useRef(null);

  useEffect(() => {
    if (coinRef.current) {
      coinRef.current.play();
    }
  }, []);

  useEffect(() => {
    if (backgroundRef.current) {
      if (isSelected || isWinner) {
        backgroundRef.current.play(SHINE_LOOP_START_FRAME, SHINE_LOOP_END_FRAME);
      }
    }
  }, [isSelected, isWinner]);

  const handleBackgroundAnimationFinish = () => {
    if (backgroundRef.current && (isSelected || isWinner)) {
      backgroundRef.current.play(SHINE_LOOP_START_FRAME, SHINE_LOOP_END_FRAME);
    }
  };

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
    <Animated.View
      style={[
        styles.container,
        { left: touch.x - SIZE / 2, top: touch.y - SIZE / 2 },
        glowAnimation,
      ]}
    >
      <LottieView
        ref={backgroundRef}
        source={require('../assets/themes/mine_theme/background2.json')}
        style={[styles.lottieShine, { opacity: isSelected || isWinner ? 1 : 0 }]}
        loop={false}
        autoPlay={true}
        onAnimationFinish={handleBackgroundAnimationFinish}
      />
      <LottieView
        ref={coinRef}
        source={require('../assets/themes/mine_theme/coin1.json')}
        style={styles.lottie}
        loop
        autoPlay={true} 
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  lottie: {
    width: SIZE,
    height: SIZE,
    position: 'absolute',
  },
  lottieShine: {
    width: SIZE,
    height: SIZE,
  },
  container: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default MineTouchCircle;
