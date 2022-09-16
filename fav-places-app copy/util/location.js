const GOOGLE_API_KEY = "AIzaSyBpxkvJnsiJPU0rK8fkB95jNJ3TWi5ZPKM";

export const getMapPreview = (lat, lng) => {
  //console.log(lat, lng);
  const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:S%7C${lat},${lng}&key=${GOOGLE_API_KEY}`;
  //console.log(imagePreviewUrl);
  return imagePreviewUrl;
};

export const getAddress = async (lat, lng) => {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`
    const response = await fetch(url);
    console.log(url);

    if(!response.ok) {
        throw new Error('Failed to fetch address!');
    }

    const data = await response.json();
    console.log(data);
    const address = data.results[0].formatted_address;
    return address;
};
