import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ThemedButton from './AwesomeButton';
import ThemeModal from './ThemeModal';
import * as Haptics from "expo-haptics";

const ThemeButton = ({ style, onSelectTheme }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [theme, setTheme] = useState('Select Theme');

  const handleThemeSelect = (selectedTheme) => {
    setTheme(selectedTheme);
    setModalVisible(false);
    onSelectTheme(selectedTheme);
  };

  return (
    <View style={style}>
      <ThemedButton
        width={300}
        height={80}
        style={styles.container}
        onPress={async () => {
          await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
          setModalVisible(true);
        }}
      >
        <Text style={styles.title}>{theme}</Text>
      </ThemedButton>

      <ThemeModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSelectTheme={handleThemeSelect}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: 0 },
  title: {
    color: '#ffe11d',
    fontSize: 30,
    fontFamily: 'CallDuty',
  },
});

export default ThemeButton;
