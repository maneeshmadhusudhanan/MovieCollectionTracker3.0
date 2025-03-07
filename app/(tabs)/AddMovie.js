import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import axios from 'axios';
import tw from 'twrnc';

const API_URL = 'http://192.168.50.192:3000'; // Replace with your backend IP

export default function AddMovieScreen() {
  const router = useRouter();
  const [movie, setMovie] = useState({
    name: '',
    cast: '',
    releaseDate: '',
    imageUrl: '',
    videoUrl: '',
    description: '',
  });

  const handleInputChange = (field, value) => {
    setMovie({ ...movie, [field]: value });
  };

  const handleAddMovie = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert(
          'Unauthorized',
          'You must be logged in as admin to add a movie.'
        );
        return;
      }

      const res = await axios.post(`${API_URL}/movies/add`, {
        ...movie,
        token,
      });

      Alert.alert('Success', 'Movie added successfully!');
      setMovie({
        name: '',
        cast: '',
        releaseDate: '',
        imageUrl: '',
        videoUrl: '',
        description: '',
      });

      router.push('/Dashboard'); // Redirect back to Dashboard
    } catch (err) {
      Alert.alert('Error', err.response?.data?.error || 'Failed to add movie');
    }
  };

  return (
    <ScrollView contentContainerStyle={tw`flex-1 bg-gray-900 p-6`}>
      <Text style={tw`text-white text-2xl font-bold text-center mb-4`}>
        🎬 Add New Movie
      </Text>

      <TextInput
        style={tw`bg-gray-800 text-white p-3 rounded-lg mb-3`}
        placeholder="Movie Name"
        placeholderTextColor="gray"
        value={movie.name}
        onChangeText={(text) => handleInputChange('name', text)}
      />

      <TextInput
        style={tw`bg-gray-800 text-white p-3 rounded-lg mb-3`}
        placeholder="Cast (Comma-separated)"
        placeholderTextColor="gray"
        value={movie.cast}
        onChangeText={(text) => handleInputChange('cast', text)}
      />

      <TextInput
        style={tw`bg-gray-800 text-white p-3 rounded-lg mb-3`}
        placeholder="Release Date (YYYY-MM-DD)"
        placeholderTextColor="gray"
        value={movie.releaseDate}
        onChangeText={(text) => handleInputChange('releaseDate', text)}
      />

      <TextInput
        style={tw`bg-gray-800 text-white p-3 rounded-lg mb-3`}
        placeholder="Image URL"
        placeholderTextColor="gray"
        value={movie.imageUrl}
        onChangeText={(text) => handleInputChange('imageUrl', text)}
      />

      <TextInput
        style={tw`bg-gray-800 text-white p-3 rounded-lg mb-3`}
        placeholder="Video URL (Trailer)"
        placeholderTextColor="gray"
        value={movie.videoUrl}
        onChangeText={(text) => handleInputChange('videoUrl', text)}
      />

      <TextInput
        style={tw`bg-gray-800 text-white p-3 rounded-lg mb-3 h-24`}
        placeholder="Description"
        placeholderTextColor="gray"
        value={movie.description}
        onChangeText={(text) => handleInputChange('description', text)}
        multiline
      />

      <TouchableOpacity
        style={tw`bg-blue-600 py-3 rounded-lg mt-2`}
        onPress={handleAddMovie}
      >
        <Text style={tw`text-white text-lg font-semibold text-center`}>
          ➕ Add Movie
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={tw`bg-gray-700 py-3 rounded-lg mt-4`}
        onPress={() => router.back()}
      >
        <Text style={tw`text-white text-lg font-semibold text-center`}>
          ⬅ Back
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
