import {Dimensions, StyleSheet} from 'react-native';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  selectedImage: {
    width: 200,
    height: 200,
    marginTop: 20,
  },
  headerTextStyle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  buttonStyles: {
    marginVertical: 10,
    width: width * 0.74,
    borderRadius: 10,
  },
  progressBar: {
    width: width * 0.8,
    marginVertical: 10,
    marginHorizontal: 5,
    height: 4,
  },
  downloadStyles: {
    fontSize: 15,
    fontWeight: 'normal',
  },
  uploadText: {
    fontSize: 17,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  downloadImage: {
    flex: 1,
    justifyContent: 'center',
    height: height * 0.45,
    marginVertical: 10,
    marginHorizontal: 5,
  },
});
