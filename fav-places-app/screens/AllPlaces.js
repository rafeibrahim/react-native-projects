import { useIsFocused } from "@react-navigation/native";
import react, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import PlacesList from "../components/Places/PlacesList";
import { fetchPlaces } from "../util/database";

const AllPlaces = ({ route }) => {
  const [loadedPlaces, setLoadedPlaces] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    const loadPlaces = async () => {
      const places = await fetchPlaces();
      console.log('places', places);
      setLoadedPlaces(places);
    };
    if (isFocused) {
      loadPlaces();
      //setLoadedPlaces((currPlaces) => [...currPlaces, route.params.place]);
    }
  }, [isFocused]);

  return <PlacesList places={loadedPlaces} />;
};

export default AllPlaces;

const styles = StyleSheet.create({});
