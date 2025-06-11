import React, { useState } from 'react';
import axios from 'axios'; // Add this at the top
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';

export default function FeedBackScreen() {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState(0);

  const handleSubmit = async () => {
  if (!message.trim()) {
    Alert.alert('Hold on!', 'Please share your thoughts with us.');
    return;
  }

  try {
    await axios.post('http://192.168.0.35:5000/submit-feedback', {
 
      name,
      location,
      message,
      rating,
    });

    Alert.alert('Thank you so much! 🎉', 'Your feedback has been sent.');
    setName('');
    setLocation('');
    setMessage('');
    setRating(0);
  } catch (error) {
    console.error('Error:', error);
    Alert.alert('Oops!', 'Something went wrong. Please try again later.');
  }
};






















  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#f0f4f8' }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>💬 We'd Love to Hear from You!</Text>
        <Text style={styles.subHeader}>Your voice helps BCR FM 104.1 get better every day.</Text>

        <View style={styles.card}>
          <View style={styles.formGroup}>
            <Text style={styles.label}>👤 Your Name</Text>
            <TextInput
              value={name}
              onChangeText={setName}
              style={styles.input}
              placeholder="e.g. Sarah"
              placeholderTextColor="#94a3b8"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>📍 Where Are You Listening From?</Text>
            <TextInput
              value={location}
              onChangeText={setLocation}
              style={styles.input}
              placeholder="City or Town"
              placeholderTextColor="#94a3b8"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>✍️ Share Your Thoughts</Text>
            <TextInput
              value={message}
              onChangeText={setMessage}
              style={[styles.input, styles.multilineInput]}
              placeholder="Let us know what you love or what we can do better!"
              placeholderTextColor="#94a3b8"
              multiline
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>⭐ Rate Your Experience</Text>
            <View style={styles.ratingRow}>
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity key={star} onPress={() => setRating(star)}>
                  <Text style={[styles.star, rating >= star && styles.starSelected]}>
                    {rating >= star ? '⭐' : '☆'}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
            <Text style={styles.submitText}>Submit Feedback 💌</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 150,
    backgroundColor: '#f0f4f8',
    paddingVertical: 50,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 8,
  },
  subHeader: {
    fontSize: 16,
    color: '#475569',
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontWeight: '600',
    fontSize: 15,
    color: '#334155',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    color: '#0f172a',
    backgroundColor: '#f8fafc',
  },
  multilineInput: {
    height: 120,
    textAlignVertical: 'top',
  },
  ratingRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  star: {
    fontSize: 32,
    color: '#d1d5db',
    marginRight: 6,
  },
  starSelected: {
    color: '#facc15',
  },
  submitBtn: {
    backgroundColor: '#3b82f6',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  submitText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
  },
});
