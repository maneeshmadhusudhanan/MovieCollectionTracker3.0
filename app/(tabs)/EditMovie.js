import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useState, useEffect } from 'react';
import axios from 'axios';
import tw from 'twrnc';

const API_URL = 'http://192.168.227.192:3000'; // Replace with your backend IP

export default function EditMovieScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams(); // Get movie ID from params
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState({
    name: '',
    cast: '',
    releaseDate: '',
    imageUrl: '',
    videoUrl: '',
    description: '',
  });

  // Fetch movie details on load
  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const res = await axios.get(`${API_URL}/movies/${id}`);
        setMovie(res.data);
      } catch (err) {
        Alert.alert('Error', 'Failed to fetch movie details');
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  const handleInputChange = (field, value) => {
    setMovie({ ...movie, [field]: value });
  };

  const handleUpdateMovie = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert('Unauthorized', 'You must be logged in as admin.');
        return;
      }

      await axios.put(`${API_URL}/movies/update/${id}`, {
        ...movie,
        token,
      });

      Alert.alert('Success', 'Movie updated successfully!');
      router.push('/Dashboard'); // Redirect after update
    } catch (err) {
      Alert.alert(
        'Error',
        err.response?.data?.error || 'Failed to update movie'
      );
    }
  };

  if (loading) {
    return (
      <View style={tw`flex-1 justify-center items-center bg-gray-900`}>
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={tw`flex-1 bg-gray-900 p-6`}>
      <Text style={tw`text-white text-2xl font-bold text-center mb-4`}>
        ✏️ Edit Movie
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
        style={tw`bg-gray-800 text-white p-3 rounded-lg mb-3 h-24`}
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

      {/* Update Button */}
      <TouchableOpacity
        style={tw`bg-green-600 py-3 rounded-lg mt-2`}
        onPress={handleUpdateMovie}
      >
        <Text style={tw`text-white text-lg font-semibold text-center`}>
          ✅ Update Movie
        </Text>
      </TouchableOpacity>

      {/* Back Button */}
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
