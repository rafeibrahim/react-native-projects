import react, { useEffect, useLayoutEffect, useContext } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import Button from "../components/UI/Button";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import { ExpensesContext } from "../store/expenses-context";

const ManageExpense = ({ route, navigation }) => {
  const expensesCtx = useContext(ExpensesContext);

  // new concept learned: with ? javascript will drill if it
  //is defined otherwise it will just return undefined.
  const editedExpenseId = route.params?.expenseId;
  // new concept: !! standard javascript trick to convert any value into boolean
  const isEditing = !!editedExpenseId;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  const deleteExpenseHandler = () => {
    expensesCtx.deleteExpense(editedExpenseId);
    navigation.goBack();
    return;
  };

  const cancelHandler = () => {
    navigation.goBack();
    return;
  };

  const confirmHandler = () => {
    if (isEditing) {
      expensesCtx.updateExpense(editedExpenseId, {
        description: "Test!!!",
        amount: 29.99,
        date: new Date("2022-08-18"),
      });
    } else {
      expensesCtx.addExpense({
        description: "Test",
        amount: 19.99,
        date: new Date("2022-08-19"),
      });
    }
    navigation.goBack();
    return;
  };

  return (
    <View style={styles.container}>
      <ExpenseForm />
      <View style={styles.buttons}>
        <Button style={styles.button} mode="flat" onPress={cancelHandler}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={confirmHandler}>
          {isEditing ? "Update" : "Add"}
        </Button>
      </View>
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
};

export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
