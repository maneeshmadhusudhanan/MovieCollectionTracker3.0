import { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  ImageBackground,
  Alert,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import tw from 'twrnc';
import { LinearGradient } from 'expo-linear-gradient';

const API_URL = 'http://192.168.227.192:3000'; // Replace with your backend IP

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/users/login`, {
        email,
        password,
      });

      await AsyncStorage.setItem('token', res.data.token);
      Alert.alert('✅ Success', 'Login Successful');
      router.push('/Dashboard');
    } catch (err) {
      Alert.alert('❌ Error', err.response?.data?.error || 'Login Failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={{ uri: 'https://wallpapercave.com/wp/wp4056407.jpg' }} // Replace with a movie-themed image
      style={tw`flex-1 justify-center items-center`}
    >
      {/* Gradient Overlay */}
      <LinearGradient
        colors={['rgba(0,0,0,0.8)', 'rgba(0,0,0,0.6)', 'rgba(0,0,0,0.4)']}
        style={tw`absolute inset-0`}
      />

      {/* Login Box */}
      <View style={tw`bg-gray-900/80 p-6 rounded-xl w-80`}>
        <Text style={tw`text-white text-3xl font-bold text-center mb-6`}>
          🔑 Login
        </Text>

        <TextInput
          style={tw`bg-gray-800 text-white p-3 rounded-lg mb-4`}
          placeholder="Enter your email"
          placeholderTextColor="gray"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={tw`bg-gray-800 text-white p-3 rounded-lg mb-4`}
          placeholder="Enter your password"
          placeholderTextColor="gray"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity
          style={tw`bg-blue-600 py-3 rounded-lg mt-2 ${
            loading ? 'opacity-50' : ''
          }`}
          onPress={handleLogin}
          disabled={loading}
        >
          <Text style={tw`text-white text-lg font-semibold text-center`}>
            {loading ? 'Logging in...' : 'Login'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={tw`mt-4`}
          onPress={() => router.push('/SignUp')}
        >
          <Text style={tw`text-gray-400 text-center`}>
            Don't have an account?{' '}
            <Text style={tw`text-blue-400 font-semibold`}>Sign Up</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
