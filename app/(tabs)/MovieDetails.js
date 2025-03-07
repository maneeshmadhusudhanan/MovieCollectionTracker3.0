import { View, Text, Image, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import tw from 'twrnc';
import { WebView } from 'react-native-webview';

const API_URL = 'http://192.168.50.192:3000'; // Replace with your backend IP

export default function MovieDetailsScreen() {
  const { id } = useLocalSearchParams(); // Get the movie ID from the URL params
  const router = useRouter();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const res = await axios.get(`${API_URL}/movies/${id}`);
        setMovie(res.data);
      } catch (err) {
        console.error('Error fetching movie details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) {
    return (
      <View style={tw`flex-1 justify-center items-center bg-gray-900`}>
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }

  if (!movie) {
    return (
      <View style={tw`flex-1 justify-center items-center bg-gray-900`}>
        <Text style={tw`text-white text-lg`}>Movie not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={tw`flex-1 bg-gray-900 p-4`}>
      {/* Movie Poster */}
      <Image source={{ uri: movie.imageUrl }} style={tw`w-full h-60 rounded-lg`} resizeMode="cover" />

      {/* Title */}
      <Text style={tw`text-white text-3xl font-bold mt-4`}>{movie.name}</Text>

      {/* Release Date */}
      <Text style={tw`text-gray-400 text-lg mt-1`}>📅 Release Date: {movie.releaseDate}</Text>

      {/* Cast */}
      <Text style={tw`text-gray-300 mt-2`}>
        🎭 Cast: <Text style={tw`font-semibold`}>{movie.cast}</Text>
      </Text>

      {/* Description */}
      <Text style={tw`text-gray-300 mt-2`}>{movie.description}</Text>

      {/* Trailer */}
      <Text style={tw`text-white text-xl font-semibold mt-4 mb-2`}>🎥 Watch Trailer</Text>
      <View style={tw`w-full h-56 rounded-lg overflow-hidden`}>
        <WebView source={{ uri: movie.videoUrl }} style={tw`w-full h-full`} />
      </View>

      {/* Back Button */}
      <TouchableOpacity style={tw`bg-blue-600 py-3 mt-6 rounded-lg`} onPress={() => router.back()}>
        <Text style={tw`text-white text-lg font-semibold text-center`}>⬅ Back to Movies</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
