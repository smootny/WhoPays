import React, { useEffect } from 'react';
import { Modal, View, Text, StyleSheet } from 'react-native';
import ThemedButton from './AwesomeButton';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, BounceIn } from 'react-native-reanimated';
import ThemeTile from './ThemeTile';
import { themes } from '../constants/themes';

const ThemeModal = ({ visible, onClose, onSelectTheme }) => {
  const backgroundOpacity = useSharedValue(0);

  const animatedBackgroundStyle = useAnimatedStyle(() => ({
    opacity: withTiming(backgroundOpacity.value, { duration: 400 }),
  }));

  useEffect(() => {
    backgroundOpacity.value = visible ? 1 : 0;
  }, [visible, backgroundOpacity]);

  return (
    <Modal visible={visible} transparent={true} animationType="none">
      <Animated.View style={[styles.modalBackground, animatedBackgroundStyle]}>
        <Animated.View style={styles.modalContainer} entering={BounceIn.duration(500)}>
          <Text style={styles.modalTitle}>Select Theme</Text>

          <View style={styles.tilesContainer}>
            {themes.map((theme) => (
              <ThemeTile key={theme.value} theme={theme} onSelect={onSelectTheme} />
            ))}
          </View>

          <ThemedButton
            width={120}
            height={48}
            style={styles.closeButton}
            onPress={onClose}
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
