import * as React from 'react';
import {
    StatusBar,
    FlatList,
    Image,
    Animated,
    Text,
    View,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    Easing,
    SafeAreaViewBase,
    SafeAreaView,
} from 'react-native';
const { width, height } = Dimensions.get('screen');

const API_KEY = "YOUR_PEXELS.COM_API_KEY"
const API_URL = "https://api.pexels.com/v1/search?query=nature&orientation=portrait&size=small&per_page=20"

const fetchImagesFromPexels = async () => {
  const data = await fetch(API_URL, {
    headers: {
      'Authorization' : API_KEY
    }
  })

  const {photos} = await data.json();
  return photos;
}


export default () => {
  const [Images, setImages] =React.useState(null);
  React.useEffect(()=>{
         const fetchImages = async () => {
          const images = await fetchImagesFromPexels();

          setImages(Images);
         }

         fetchImages();
  },[])
  if (!Images) {
    return <Text> Loading...</Text>;
  }
  console.log(Images);
    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <StatusBar hidden />
            <FlatList
            data={Images}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => {
              return <View style={{width, height}}>
             
              <Image
              source={{uri: item.src.portrait}}
              style={[StyleSheet.absoluteFillObject]}
              />
              </View>
            }}
            />
         </View>
    );
};