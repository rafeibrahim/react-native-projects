import { useLayoutEffect  } from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";
import MealsList from "../components/MealsList/MealsList";
import { MEALS, CATEGORIES } from "../data/dummy-data";

const MealsOverviewScreen = ({ route, navigation }) => {
  const catId = route.params.categoryId;

  const displayedMeals = MEALS.filter((mealItem) => {
    return mealItem.categoryIds.indexOf(catId) >= 0;
  });

  useLayoutEffect(() => {
    const categoryTitle = CATEGORIES.find(
      (category) => category.id === catId
    ).title;
  
    navigation.setOptions({
      title: categoryTitle,
    });
  }, [catId, navigation])



  return ( <MealsList items={displayedMeals}/>);
};

export default MealsOverviewScreen;

const styles = StyleSheet.create({

});
