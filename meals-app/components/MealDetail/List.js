import react from "react";
import { View, Text, StyleSheet } from "react-native";

const List = ({ data }) => {
  return data.map((dataPoint) => {
    return (
      <View key={dataPoint} style={styles.listItem}>
        <Text style={styles.itemText}>{dataPoint}</Text>
      </View>
    );
  });
};

export default List;

const styles = StyleSheet.create({
  listItem: {
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginVertical: 4,
    marginHorizontal: 12,
    backgroundColor: "#e2b497",
  },
  itemText: {
    color: "#351401",
    textAlign: "center",
  },
});
