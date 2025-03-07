import {
  View,
  Text,
  Button,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import tw from 'tailwind-react-native-classnames';

const API_URL = 'http://192.168.227.192:3000'; // Replace with your local IP

export default function DashboardScreen() {
  const router = useRouter();
  const [role, setRole] = useState(null);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const checkUserRole = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        try {
          const res = await axios.post(`${API_URL}/verify-token`, { token });
          setRole(res.data.role);
        } catch (err) {
          console.error('Token verification failed:', err);
        }
      }
    };

    const fetchMovies = async () => {
      try {
        const res = await axios.get(`${API_URL}/movies`);
        setMovies(res.data);
      } catch (err) {
        console.error('Error fetching movies:', err);
      }
    };

    checkUserRole();
    fetchMovies();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    router.replace('/');
  };

  return (
    <View style={tw`flex-1 bg-gray-900 p-4`}>
      {/* Title */}
      <View style={tw`flex-row justify-between items-center my-4`}>
        {/* Movie Dashboard Title */}
        <Text style={tw`text-white text-2xl font-bold`}>
          🎬 Movie Dashboard
        </Text>

        {/* Admin Button */}
        {role === 'admin' && (
          <TouchableOpacity
            style={tw`bg-blue-600 py-2 px-4 rounded-lg`}
            onPress={() => router.push('/AddMovie')}
          >
            <Text style={tw`text-white font-semibold text-base`}>
              ➕ Add Movie
            </Text>
          </TouchableOpacity>
        )}
      </View>
      /* Movies List */
      <ScrollView style={tw`mt-4`}>
        {movies.length > 0 ? (
          movies.map((movie, index) => (
            <TouchableOpacity
              key={movie._id} // Ensure each movie has a unique key
              onPress={() => router.push(`/MovieDetails?id=${movie._id}`)} // Navigate on click
            >
              <View key={index} style={tw`bg-gray-800 p-4 rounded-lg mb-4`}>
                <Image
                  source={{ uri: movie.imageUrl }}
                  style={tw`w-full h-40 rounded-lg mb-2`}
                  resizeMode="cover"
                />
                <Text style={tw`text-white text-xl font-bold`}>
                  {movie.name}
                </Text>
                <Text style={tw`text-gray-400`}>📅 {movie.releaseDate}</Text>
                <Text style={tw`text-gray-300 mt-2`}>{movie.description}</Text>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={tw`text-gray-400 text-center mt-4`}>
            No movies available.
          </Text>
        )}
      </ScrollView>
      {/* Logout Button */}
      <TouchableOpacity
        style={tw`bg-red-600 py-2 px-4 rounded-lg self-center mt-4`}
        onPress={handleLogout}
      >
        <Text style={tw`text-white font-semibold text-lg`}>🚪 Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
