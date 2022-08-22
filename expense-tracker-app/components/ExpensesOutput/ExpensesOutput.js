import react from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import ExpenseList from "./ExpensesList";
import ExpensesSummary from "./ExpensesSummary";



const ExpensesOutput = ({ expenses, expensesPeriod, fallbackText }) => {
  let content = <Text style={styles.infoText}>{fallbackText}</Text>

  if( expenses.length > 0) {
    content = <ExpenseList expenses={expenses} />
  };

  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={expenses} periodName={expensesPeriod} />
      {content}
    </View>
  );
};

export default ExpensesOutput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 0,
    paddingBottom: 0,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  infoText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 32,
  }
});
