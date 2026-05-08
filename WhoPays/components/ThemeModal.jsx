import React, { useEffect } from 'react';
import { Modal, View, Text, StyleSheet } from 'react-native';
import ThemedButton from './AwesomeButton';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import ThemeTile from './ThemeTile';
import { themes } from '../constants/themes';

const ThemeModal = ({ visible, onClose, onSelectTheme }) => {
  const backgroundOpacity = useSharedValue(0);
  const modalOpacity = useSharedValue(0);
  const modalScale = useSharedValue(0.92);

  const animatedBackgroundStyle = useAnimatedStyle(() => ({
    opacity: backgroundOpacity.value,
  }));

  const animatedModalStyle = useAnimatedStyle(() => ({
    opacity: modalOpacity.value,
    transform: [{ scale: modalScale.value }],
  }));

  useEffect(() => {
    if (visible) {
      backgroundOpacity.value = withTiming(1, { duration: 220 });
      modalOpacity.value = withTiming(1, { duration: 220 });
      modalScale.value = withTiming(1, { duration: 220 });
      return;
    }

    backgroundOpacity.value = 0;
    modalOpacity.value = 0;
    modalScale.value = 0.92;
  }, [visible, backgroundOpacity]);

  const closeWithFade = (afterClose) => {
    backgroundOpacity.value = withTiming(0, { duration: 180 });
    modalOpacity.value = withTiming(0, { duration: 180 });
    modalScale.value = withTiming(0.98, { duration: 180 }, (finished) => {
      if (finished) {
        if (afterClose) {
          runOnJS(afterClose)();
        }
        runOnJS(onClose)();
      }
    });
  };

  const handleThemeSelect = (selectedTheme) => {
    closeWithFade(() => onSelectTheme(selectedTheme));
  };

  const handleClosePress = () => {
    closeWithFade();
  };

  return (
    <Modal visible={visible} transparent={true} animationType="none">
      <Animated.View style={[styles.modalBackground, animatedBackgroundStyle]}>
        <Animated.View style={[styles.modalContainer, animatedModalStyle]}>
          <Text style={styles.modalTitle}>Select Theme</Text>

          <View style={styles.tilesContainer}>
            {themes.map((theme) => (
              <ThemeTile key={theme.value} theme={theme} onSelect={handleThemeSelect} />
            ))}
          </View>

          <ThemedButton
            width={120}
            height={48}
            style={styles.closeButton}
            onPress={handleClosePress}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </ThemedButton>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    marginBottom: 20,
    fontFamily: 'CallDuty',
    color: '#DA4456',
  },
  tilesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  closeButton: { marginTop: 20 },
  closeButtonText: {
    fontSize: 18,
    color: '#ffe11d',
    fontFamily: 'CallDuty',
  },
});

export default ThemeModal;
