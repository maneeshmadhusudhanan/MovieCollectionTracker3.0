import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';
import { LinearGradient } from 'expo-linear-gradient';

export default function LandingPage() {
  const router = useRouter();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ title: 'Movie App' });
  }, [navigation]);

  return (
    <ImageBackground
      source={{ uri: 'https://wallpapercave.com/wp/wp4056407.jpg' }} // Replace with a movie-themed background
      style={tw`flex-1 justify-center items-center`}
    >
      {/* Overlay Gradient for Better Readability */}
      <LinearGradient
        colors={['rgba(0,0,0,0.8)', 'rgba(0,0,0,0.6)', 'rgba(0,0,0,0.4)']}
        style={tw`absolute inset-0`}
      />

      {/* App Title */}
      <Text style={tw`text-white text-4xl font-bold mb-6 text-center`}>
        🎬 Welcome to Movie App
      </Text>
      <Text style={tw`text-gray-300 text-lg text-center px-8 mb-8`}>
        Discover & explore the latest movies and trailers.
      </Text>

      {/* Buttons */}
      <TouchableOpacity
        style={tw`bg-red-600 py-3 px-6 rounded-full mb-4 w-40`}
        onPress={() => router.push('/SignUp')}
      >
        <Text style={tw`text-white text-lg font-semibold text-center`}>
          Register
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={tw`bg-blue-600 py-3 px-6 rounded-full w-40`}
        onPress={() => router.push('/Login')}
      >
        <Text style={tw`text-white text-lg font-semibold text-center`}>
          Login
        </Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}
