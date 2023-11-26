import React, {useCallback, useEffect, useState} from 'react';
import {Image, ImageBackground, ToastAndroid, View} from 'react-native';
import {Button, MD2Colors, ProgressBar, Text} from 'react-native-paper';
import styles from '../Styles/UploadImageStyles';
import {useRoute} from '@react-navigation/native';
import storage from '@react-native-firebase/storage';
import * as ImagePicker from 'react-native-image-picker';
import {useDispatch} from 'react-redux';
import {
  addDownloadURL,
  addUploadedData,
  cleanUpload,
} from '../Redux/Reducers/UploadReducer';
const UploadImage = () => {
  const route = useRoute();
  const [selectedImage, setSelectedImage] = useState(null);
  const dispatch = useDispatch();
  const [downloadurl, setDownloadUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  useEffect(() => {
    return () => {
      dispatch(cleanUpload());
    };
  }, []);
  const handleImagePicker = useCallback(() => {
    const options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,

        path: 'images',
      },
    };

    ImagePicker.launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error:', response.error);
      } else {
        const source = {uri: response.assets[0].uri};
        console.log(`response is ${JSON.stringify(response.assets[0].uri)}`);
        // Store the selected image data in state
        dispatch(addUploadedData(source));
        setSelectedImage(source);
      }
    });
  }, [dispatch]);

  useEffect(() => {
    // Cleanup selected image when the component unmounts
    return () => {
      if (selectedImage) {
        URL.revokeObjectURL(selectedImage.uri);
      }
      // dispatch(cleanUpload());
    };
  }, [selectedImage]);
  const handleUpload = useCallback(async () => {
    if (selectedImage) {
      try {
        setUploading(true);
        // Generate a unique filename based on the timestamp
        const filename = `${Date.now()}.jpg`;

        const reference = storage().ref(`/images/${filename}`);

        const task = reference.putFile(selectedImage.uri);
        task.on('state_changed', snapshot => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        });
        await task;
        const downloadURL = await reference.getDownloadURL();

        console.log('Image uploaded successfully:', downloadURL);
        dispatch(addDownloadURL(downloadURL));
        setDownloadUrl(downloadURL);
        setSelectedImage(null);
        ToastAndroid.showWithGravity(
          'Image Uploaded SuccessFully',
          ToastAndroid.LONG,
          ToastAndroid.CENTER,
        );
      } catch (error) {
        console.error('Error uploading image:', error.message);
        ToastAndroid.showWithGravity(
          `Error uploading image: ${error.message}`,
          ToastAndroid.LONG,
          ToastAndroid.CENTER,
        );
      } finally {
        setUploading(false);
        setUploadProgress(0);
      }
    } else {
      console.warn('No image selected');
      ToastAndroid.showWithGravity(
        'No Image Selected',
        ToastAndroid.LONG,
        ToastAndroid.CENTER,
      );
    }
  }, [dispatch, selectedImage]);
  return (
    <View style={styles.container}>
      <Text style={styles.headerTextStyle}>Image Upload</Text>
      <Text>For {route.params.data.name}</Text>
      {selectedImage ? (
        <Image source={selectedImage} style={styles.selectedImage} />
      ) : null}
      <Button
        style={styles.buttonStyles}
        mode="contained"
        onPress={handleImagePicker}>
        Select Image
      </Button>
      <Button
        style={styles.buttonStyles}
        mode="contained"
        onPress={handleUpload}>
        Upload Image
      </Button>
      {uploading ? (
        <View>
          <ProgressBar
            progress={uploadProgress / 100}
            color={MD2Colors.blue600}
            style={styles.progressBar}
          />
          <Text style={styles.uploadText}>Uploading</Text>
        </View>
      ) : null}
      {downloadurl !== '' ? (
        <View>
          <Text style={styles.downloadStyles}>
            Download URL : {downloadurl}
          </Text>
          <Text>Uploaded Image</Text>
          <ImageBackground
            source={{uri: downloadurl}}
            style={styles.downloadImage}
            resizeMode="cover"
          />
        </View>
      ) : null}
    </View>
  );
};

export default React.memo(UploadImage);
