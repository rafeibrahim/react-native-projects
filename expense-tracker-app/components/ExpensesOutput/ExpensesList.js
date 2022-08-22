import react from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import ExpenseItem from "./ExpenseItem";



const renderExpenseItem = (itemData) => {
  return (
    <ExpenseItem
      description={itemData.item.description}
      amount={itemData.item.amount}
      date={itemData.item.date}
      id={itemData.item.id}
    />
  );
};

const ExpenseList = ({ expenses }) => {
  return (
    <FlatList
      data={expenses}
      renderItem={renderExpenseItem}
      keyExtractor={(item) => item.id}
    />
  );
};

export default ExpenseList;

const styles = StyleSheet.create({});
