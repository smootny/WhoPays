import React, { useEffect, useRef, useState } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  useWindowDimensions,
  ImageBackground,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ThemedButton from "./AwesomeButton";
import IconCircleButton from "./IconCircleButton";

const slides = [
  {
    id: "1",
    icon: "hand-left-outline",
    background: require("../assets/images/1.png"),
    title: "Welcome to Who Pays?!",
    description:
      "This game quickly picks one person from all players touching the screen.",
  },
  {
    id: "2",
    icon: "color-palette-outline",
    background: require("../assets/images/2.png"),
    title: "Choose a Theme",
    description:
      "On the start screen you can select a theme or keep random mode.",
  },
  {
    id: "3",
    icon: "phone-portrait-outline",
    background: require("../assets/images/3.png"),
    title: "Everyone Touches",
    description:
      "When game starts, every player places and holds one finger on the screen.",
  },
  {
    id: "4",
    icon: "sparkles-outline",
    background: require("../assets/images/4.png"),
    title: "Winner Is Selected",
    description:
      "After a short countdown, one finger is highlighted. That player pays.",
  },
];

export default function OnboardingModal({ visible, onClose, onFinish }) {
  const listRef = useRef(null);
  const { width } = useWindowDimensions();
  const [carouselWidth, setCarouselWidth] = useState(Math.max(width - 40, 280));
  const [currentIndex, setCurrentIndex] = useState(0);

  const resetCarousel = () => {
    setCurrentIndex(0);
    listRef.current?.scrollToOffset({ offset: 0, animated: false });
  };

  useEffect(() => {
    if (!visible) {
      resetCarousel();
    }
  }, [visible]);

  const handleMomentumEnd = (event) => {
    const nextIndex = Math.round(event.nativeEvent.contentOffset.x / carouselWidth);
    setCurrentIndex(nextIndex);
  };

  const goNext = () => {
    if (currentIndex < slides.length - 1) {
      listRef.current?.scrollToIndex({ index: currentIndex + 1, animated: true });
      return;
    }
    onFinish?.();
  };

  const handleSkip = () => {
    resetCarousel();
    onFinish?.();
  };

  const handleClose = () => {
    resetCarousel();
    onClose?.();
  };

  const renderItem = ({ item }) => (
    <ImageBackground
      source={item.background}
      style={[styles.slide, { width: carouselWidth }]}
      imageStyle={styles.slideImage}
      resizeMode="cover"
    >
      <View style={styles.slideOverlay} />
      <View style={styles.slideContent}>
        <View style={styles.iconWrap}>
          <Ionicons name={item.icon} size={48} color="#ffe11d" />
        </View>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </ImageBackground>
  );

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View
          style={styles.modalCard}
          onLayout={(event) => {
            const measuredWidth = event.nativeEvent.layout.width;
            if (measuredWidth > 0 && measuredWidth !== carouselWidth) {
              setCarouselWidth(measuredWidth);
            }
          }}
        >
          <IconCircleButton
            iconName="close"
            onPress={handleClose}
            size={36}
            style={styles.closeButton}
          />

          <FlatList
            ref={listRef}
            data={slides}
            keyExtractor={(item) => item.id}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            renderItem={renderItem}
            onMomentumScrollEnd={handleMomentumEnd}
            extraData={carouselWidth}
            getItemLayout={(_, index) => ({
              length: carouselWidth,
              offset: carouselWidth * index,
              index,
            })}
            style={styles.carousel}
          />

          <View style={styles.dotsRow}>
            {slides.map((slide, index) => (
              <View
                key={slide.id}
                style={[styles.dot, index === currentIndex && styles.dotActive]}
              />
            ))}
          </View>

          <View style={styles.actions}>
            <TouchableOpacity onPress={handleSkip} style={styles.ghostBtn}>
              <Text style={styles.ghostText}>Skip</Text>
            </TouchableOpacity>
            <ThemedButton
              width={150}
              height={52}
              style={styles.primaryBtn}
              onPress={goNext}
            >
              <Text style={styles.primaryText}>
                {currentIndex === slides.length - 1 ? "Start game" : "Next"}
              </Text>
            </ThemedButton>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.8)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  modalCard: {
    width: "100%",
    maxWidth: 420,
    minHeight: 460,
    borderRadius: 20,
    backgroundColor: "#DB4457",
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#ffe11d",
  },
  carousel: {
    width: "100%",
    flexGrow: 0,
  },
  closeButton: {
    position: "absolute",
    top: 16,
    right: 16,
    zIndex: 10,
  },
  slide: {
    minHeight: 320,
    justifyContent: "center",
  },
  slideImage: {
    opacity: 0.95,
  },
  slideOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.45)",
  },
  slideContent: {
    paddingHorizontal: 26,
    paddingTop: 70,
    paddingBottom: 28,
    alignItems: "center",
  },
  iconWrap: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: "rgba(0,0,0,0.25)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    color: "#fff",
    fontSize: 30,
    fontFamily: "CallDuty",
    textAlign: "center",
    marginBottom: 14,
  },
  description: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
    lineHeight: 25,
    paddingHorizontal: 6,
    fontFamily: 'CallDuty',
    fontWeight: '100',
  },
  dotsRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    gap: 8,
  },
  dot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: "rgba(255,255,255,0.45)",
  },
  dotActive: {
    width: 20,
    backgroundColor: "#ffe11d",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 22,
    paddingVertical: 22,
    marginTop: "auto",
  },
  ghostBtn: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: "center",
  },
  ghostText: {
    color: "#fff",
    fontSize: 17,
    fontFamily: "CallDuty",
  },
  primaryBtn: { marginBottom: 0 },
  primaryText: {
    color: "#ffe11d",
    fontSize: 17,
    fontFamily: "CallDuty",
  },
});
