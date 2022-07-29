import react from "react";
import { View, Text, StyleSheet } from "react-native";

const Subtitle = ({children}) => {
  return (
    <View style={styles.subtitleContainer}>
      <Text style={styles.subtitle}>{children}</Text>
    </View>
  );
};

export default Subtitle;

const styles = StyleSheet.create({
    subtitle: {
        color: "#e2b497",
        fontSize: 18,
        fontWeight: "bold",
        margin: 4,
        textAlign: "center",
      },
      subtitleContainer: {
        padding: 6,
        marginVertical: 4,
        marginHorizontal: 12,
        borderBottomColor: "white",
        borderBottomWidth: 2,
      },
});
