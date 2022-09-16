import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import AppLoading from 'expo-app-loading';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AllPlaces from "./screens/AllPlaces";
import AddPlace from "./screens/AddPlace";
import IconButton from "./components/UI/IconButton";
import { Colors } from "./constants/colors";
import Map from "./screens/Map";
import { init } from "./util/database";
import PlaceDetails from "./screens/PlaceDetails";


const Stack = createNativeStackNavigator();

export default function App() {
  const [dbInitialized, setDbInittialized] = useState();

  useEffect(() => {
    init().then(() => {
      setDbInittialized(true);
    }).catch((err) => {
      console.log(err);
    });
  }, []);

  if (!dbInitialized) {
    return <AppLoading />
  }

  return (
    <>
      <StatusBar style="dark" />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerStyle: { backgroundColor: Colors.primary500},
          headerTintColor: Colors.gray700,
          contentStyle: {
            backgroundColor: Colors.gray700
          }
        }}>
          <Stack.Screen
            name="AllPlaces"
            component={AllPlaces}
            options={({ navigation }) => ({
              title: 'Your Favorite Places',
              headerRight: ({ tintColor }) => (
                <IconButton
                  icon="add"
                  color={tintColor}
                  size={24}
                  onPress={() => navigation.navigate("AddPlace")}
                />
              ),
            })}
          />
          <Stack.Screen name="AddPlace" component={AddPlace} options={{
            title: 'Add a new Place',
            headerBackTitle: 'Back'
          }} />
          <Stack.Screen name="Map" component={Map}/>
          <Stack.Screen name="PlaceDetails" component={PlaceDetails} options={{
            title: 'Loading Place...'
          }}/>
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({});
