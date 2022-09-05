import { StyleSheet, Text, View } from 'react-native';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import AuthContent from '../components/Auth/AuthContent';
import { AuthContext } from '../store/auth-context';

function WelcomeScreen() {
  const authCtx = useContext(AuthContext);
  const [fetchedMessage, setFetchedMessage] = useState('');

  const token = authCtx.token;

  useEffect(() => {
    axios.get('https://react-native-course-f1a4c-default-rtdb.firebaseio.com/message.json?auth=' + token).then((response) => {
      //console.log(response);
      setFetchedMessage(response.data);
    });
  }, [token]);
  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Welcome!</Text>
      <Text>You authenticated successfully!</Text>
      <Text>{fetchedMessage}</Text>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});