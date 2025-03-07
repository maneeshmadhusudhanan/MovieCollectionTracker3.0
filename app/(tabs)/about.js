
import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Animated } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';

export default function AboutScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const iconAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(iconAnim, { toValue: 1.2, duration: 700, useNativeDriver: true }),
        Animated.timing(iconAnim, { toValue: 1, duration: 700, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Animated Icon */}
        <Animated.View style={[styles.iconContainer, { transform: [{ scale: iconAnim }] }]}>
          <MaterialIcons name="movie" size={90} color="#ffcc00" />
        </Animated.View>

        {/* Animated Title */}
        <Animated.Text style={[styles.title, { transform: [{ translateY: slideAnim }] }]}>
          Movie Collection Tracker
        </Animated.Text>

        {/* Mission Section */}
        <Animated.View style={[styles.section, { transform: [{ translateY: slideAnim }] }]}>
          <Text style={styles.sectionTitle}>🎯 Our Mission</Text>
          <Text style={styles.text}>
            Providing movie enthusiasts with the ultimate tool to track, organize, 
            and manage their movie collections effortlessly.
          </Text>
        </Animated.View>

        {/* Features Section */}
        <Animated.View style={[styles.section, styles.shadow, { transform: [{ translateY: slideAnim }] }]}>
          <Text style={styles.sectionTitle}>🚀 Features</Text>
          <View style={styles.featureItem}>
            <MaterialIcons name="check-circle" size={24} color="#ffcc00" />
            <Text style={styles.featureText}>Track watched movies</Text>
          </View>
          <View style={styles.featureItem}>
            <MaterialIcons name="check-circle" size={24} color="#ffcc00" />
            <Text style={styles.featureText}>Add personal movie reviews</Text>
          </View>
          <View style={styles.featureItem}>
            <MaterialIcons name="check-circle" size={24} color="#ffcc00" />
            <Text style={styles.featureText}>Favorite and bookmark movies</Text>
          </View>
        </Animated.View>

        {/* Contact Us Section */}
        <Animated.View style={[styles.section, styles.shadow, { transform: [{ translateY: slideAnim }] }]}>
          <Text style={styles.sectionTitle}>📞 Contact Us</Text>
          <Text style={styles.text}>✉️ Email: maneeshroks@2025KBA.in</Text>
          <Text style={styles.text}>📞 Phone: +918281422036</Text>
        </Animated.View>

        {/* Version Section */}
        <Text style={styles.version}>Version 2.0</Text>
      </ScrollView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 20,
  },
  content: {
    paddingBottom: 40,
  },
  iconContainer: {
    alignSelf: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#ffcc00',
    textAlign: 'center',
    textTransform: 'uppercase',
    textShadowColor: 'rgba(255, 204, 0, 0.8)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10,
    marginBottom: 20,
  },
  section: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
    marginVertical: 10,
    borderLeftWidth: 5,
    borderLeftColor: '#ffcc00',
  },
  shadow: {
    shadowColor: '#ffcc00',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    color: '#aaaaaa',
    lineHeight: 24,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
  },
  featureText: {
    color: '#ffffff',
    marginLeft: 10,
    fontSize: 16,
  },
  version: {
    textAlign: 'center',
    color: '#666666',
    marginTop: 40,
    fontSize: 16,
  },
});



// about.jsx
// import React, { useRef, useEffect } from 'react';
// import { View, StyleSheet, ScrollView, Animated } from 'react-native';
// import { Text } from 'react-native-paper';
// import { MaterialIcons } from '@expo/vector-icons';

// export default function AboutScreen() {
//   const fadeAnim = useRef(new Animated.Value(0)).current;

//   useEffect(() => {
//     Animated.timing(fadeAnim, {
//       toValue: 1,
//       duration: 1000,
//       useNativeDriver: true,
//     }).start();
//   }, []);

//   return (
//     <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
//       <ScrollView contentContainerStyle={styles.content}>
//         <MaterialIcons name="movie" size={80} color="#ffcc00" style={styles.icon} />
//         <Text style={styles.title}>About Movie collection Tracker</Text>
        
//         <Text style={styles.sectionTitle}>Our Mission</Text>
//         <Text style={styles.text}>
//           Providing movie enthusiasts with the ultimate tool to track, organize, 
//           and manage their movie collections effortlessly.
//         </Text>

//         <Text style={styles.sectionTitle}>Features</Text>
//         <View style={styles.featureItem}>
//           <MaterialIcons name="check" size={20} color="#ffcc00" />
//           <Text style={styles.featureText}>Track watched movies</Text>
//         </View>
//         {/* Add more features */}

//         <Text style={styles.sectionTitle}>Contact Us</Text>
//         <Text style={styles.text}>maneeshroks@2025KBA.in</Text>
//         <Text style={styles.text}>+918281422036</Text>

//         <Text style={styles.version}>Version 2.0.</Text>
//       </ScrollView>
//     </Animated.View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#121212',
//     padding: 20,
//   },
//   content: {
//     paddingBottom: 40,
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     color: '#ffcc00',
//     textAlign: 'center',
//     marginVertical: 20,
//   },
//   sectionTitle: {
//     fontSize: 20,
//     fontWeight: '600',
//     color: '#ffffff',
//     marginTop: 25,
//     marginBottom: 10,
//   },
//   text: {
//     fontSize: 16,
//     color: '#aaaaaa',
//     lineHeight: 24,
//   },
//   featureItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginVertical: 8,
//   },
//   featureText: {
//     color: '#ffffff',
//     marginLeft: 10,
//   },
//   icon: {
//     alignSelf: 'center',
//     marginVertical: 20,
//   },
//   version: {
//     textAlign: 'center',
//     color: '#666666',
//     marginTop: 40,
//   },
// });