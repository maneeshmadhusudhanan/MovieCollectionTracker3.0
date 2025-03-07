import { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, ImageBackground, Alert } from 'react-native';
import axios from 'axios';
import { useRouter } from 'expo-router';
import tw from 'twrnc';
import { LinearGradient } from 'expo-linear-gradient';

const API_URL = 'http://192.168.50.192:3000'; // Replace with your backend IP

export default function RegisterScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/users/register`, {
        name,
        email,
        password,
      });

      Alert.alert('✅ Success', res.data.message);

      // ✅ Redirect to login page after 1 second
      setTimeout(() => {
        router.replace('/Login');
      }, 1000);
    } catch (err) {
      Alert.alert('❌ Error', err.response?.data?.message || 'Registration Failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={{ uri: 'https://wallpapercave.com/wp/wp4056407.jpg' }} // Movie-themed background
      style={tw`flex-1 justify-center items-center`}
    >
      {/* Overlay Gradient */}
      <LinearGradient
        colors={['rgba(0,0,0,0.8)', 'rgba(0,0,0,0.6)', 'rgba(0,0,0,0.4)']}
        style={tw`absolute inset-0`}
      />

      {/* Registration Box */}
      <View style={tw`bg-gray-900/80 p-6 rounded-xl w-80`}>
        <Text style={tw`text-white text-3xl font-bold text-center mb-6`}>📝 Register</Text>

        <TextInput
          style={tw`bg-gray-800 text-white p-3 rounded-lg mb-4`}
          placeholder="Enter your name"
          placeholderTextColor="gray"
          value={name}
          onChangeText={setName}
        />

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
          style={tw`bg-red-600 py-3 rounded-lg mt-2 ${loading ? 'opacity-50' : ''}`}
          onPress={handleRegister}
          disabled={loading}
        >
          <Text style={tw`text-white text-lg font-semibold text-center`}>
            {loading ? 'Registering...' : 'Register'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={tw`mt-4`}
          onPress={() => router.push('/Login')}
        >
          <Text style={tw`text-gray-400 text-center`}>
            Already have an account? <Text style={tw`text-blue-400 font-semibold`}>Login</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
