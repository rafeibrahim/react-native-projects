import react, { useEffect, useLayoutEffect, useContext, useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import Button from "../components/UI/Button";
import ErrorOverlay from "../components/UI/ErrorOverlay";
import IconButton from "../components/UI/IconButton";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { GlobalStyles } from "../constants/styles";
import { ExpensesContext } from "../store/expenses-context";
import { storeExpense, updateExpense, deleteExpense } from "../util/http";

const ManageExpense = ({ route, navigation }) => {
  const [error, setError] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const expensesCtx = useContext(ExpensesContext);

  // new concept learned: with ? javascript will drill if it
  //is defined otherwise it will just return undefined.
  const editedExpenseId = route.params?.expenseId;
  // new concept: !! standard javascript trick to convert any value into boolean
  const isEditing = !!editedExpenseId;

  const selectedExpense = expensesCtx.expenses.find(
    (expense) => expense.id === editedExpenseId
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  const deleteExpenseHandler = async () => {
    setIsSubmitting(true);
    try {
      await deleteExpense(editedExpenseId);
      expensesCtx.deleteExpense(editedExpenseId);

      navigation.goBack();
    } catch (error) {
      setError('Could not delete expense - please try again later!')
      setIsSubmitting(false);
    }

    return;
  };

  const cancelHandler = () => {
    navigation.goBack();
    return;
  };

  const confirmHandler = async (expenseData) => {
    setIsSubmitting(true);
    try {
      if (isEditing) {
        expensesCtx.updateExpense(editedExpenseId, expenseData);
        await updateExpense(editedExpenseId, expenseData);
      } else {
        const id = await storeExpense(expenseData);
        expensesCtx.addExpense({ ...expenseData, id });
      }
      //bottom line is redundant as navigation will pop out the screen. 
      setIsSubmitting(false);
      navigation.goBack();
      
    } catch (error) {
      setError('Could not save data - plz try again later!');
      setIsSubmitting(false);
    }
  };

  // const errorHandler = () => {
  //   setError(null);
  // };

  if (error && !isSubmitting) {
    return <ErrorOverlay message={error}/>
  }

  if (isSubmitting) {
    return <LoadingOverlay />;
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        submitButtonLabel={isEditing ? "Update" : "Add"}
        onCancel={cancelHandler}
        onSubmit={confirmHandler}
        defaultValues={selectedExpense}
      />

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
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
