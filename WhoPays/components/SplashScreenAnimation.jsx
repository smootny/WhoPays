
import React, { useRef, useEffect } from "react";
import { StyleSheet } from "react-native";
import LottieView from "lottie-react-native";
import Animated, { ZoomIn } from "react-native-reanimated";


const SplashScreenAnimation = ({ onAnimationFinish }) => {
  const animation = useRef(null);

  useEffect(() => {
    animation.current?.play();
  }, []);



  return (
    <Animated.View exiting={ZoomIn.duration(500)} style={styles.container}>
      <LottieView
        ref={animation}
        source={require('@/assets/images/splash-image.json')}
        style={{ width: '60%', height: '60%' }}
        autoPlay
        loop={false}
        onAnimationFinish={() => {
          onAnimationFinish(false);
        }}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#DB4457",
  },
});

export default SplashScreenAnimation;

