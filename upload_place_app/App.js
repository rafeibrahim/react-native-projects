import { useState } from 'react';
import {
  View,
  Image,
  Button,
  StyleSheet,
  Text,
  Platform,
} from 'react-native';
import axios from 'axios';

const SERVER_URL = 'http://localhost:3003';

const createFormData = (photo, body = {}) => {
  const data = new FormData();

  data.append('photo', {
    name: photo.fileName,
    type: photo.type,
    uri: Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
  });

  Object.keys(body).forEach((key) => {
    data.append(key, body[key]);
  });

  return data;
};

export default function App() {
  const [photo, setPhoto] = useState(null);

  const handleChoosePhoto = () => {
    launchImageLibrary({}, (response) => {
      //console.log(response);
      if (response) {
        setPhoto(response);
      }
    });
  };

  const handleUploadPhoto = () => {
    const body = createFormData(photo, {
      title: 'titleTestApp',
      city: 'cityTestApp',
      price: 'priceTestApp',
    });
    axios
      .post(SERVER_URL + '/api/places', body, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization:
            'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJvb3QiLCJpZCI6IjYzMjMyNzgxNzBkMDRhYWYzMjcxOWY0MiIsImlhdCI6MTY2MzI1OTU2MywiZXhwIjoxNjYzMjYzMTYzfQ._o7S6mB4ki-Pd2YK-QeYg9jlHPgYaf19ZYaoeVx_52Q',
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      {photo && (
        <>
          <Image source={{ uri: photo.uri }} style={styles.image} />
          <Button title='Upload Photo' onPress={handleUploadPhoto}/>
        </>
      )}
      <Button title="Choose Photo" onPress={handleChoosePhoto} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 300,
    height: 300,
  },
});
