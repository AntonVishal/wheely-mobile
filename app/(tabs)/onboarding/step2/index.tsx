// import { View, Text } from "@/components/Themed";
// import { StyleSheet } from "react-native";


// export default function Step2Screen() {
//     return (
//         <View style={styles.container}>
//             <Text style={styles.title}>Step 2</Text>
//             <Text style={styles.description}>This is the second step of the onboarding process.</Text>
//             {/* Add more content or components as needed */}
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center",
//         padding: 16,
//     },
//     title: {
//         fontSize: 24,
//         fontWeight: "bold",
//     },
//     description: {
//         fontSize: 16,
//         textAlign: "center",
//     },
// });

import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, ScrollView, Image, Platform } from 'react-native';
import { Text, Button } from '@/components/Themed';
import { useRouter } from 'expo-router';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { StatusBar } from 'expo-status-bar';

const cities = ['Mumbai', 'Delhi', 'Bengaluru', 'Chennai', 'Kolkata', 'Hyderabad', 'Pune', 'Ahmedabad', 'Surat', 'Jaipur'];

const disabilityTypes = [
  'Wheelchair User (Mobility Impairment)',
  'Crutches/Walking Aid User',
  'Senior Citizen Needing Assistance',
  'Pregnant Woman',
  'Temporarily Injured (Leg Fracture, Surgery, etc.)',
  'Other',
];

export default function UserDetailsPreferences() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [disabilityType, setDisabilityType] = useState('');
  const [otherDisability, setOtherDisability] = useState('');
  const [city, setCity] = useState('');
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);  // Add string type
  const [emergencyContact, setEmergencyContact] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  const router = useRouter();

  useEffect(() => {
    validateForm();
  }, [fullName, email, dateOfBirth, disabilityType, city, emergencyContact]);

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = 
      fullName.trim() !== '' &&
      emailRegex.test(email) &&
      disabilityType !== '' &&
      city !== '' &&
      emergencyContact.trim() !== '';
    setIsFormValid(isValid);
  };

  const handleDateChange = (
    event: DateTimePickerEvent, 
    selectedDate: Date | undefined
  ) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setDateOfBirth(selectedDate);
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfilePhoto(result.assets[0].uri);
    }
  };

  const handleFinishSetup = () => {
    // Implement the logic to save user details and navigate to the main app
    router.push('/(tabs)');
  };

  return (
    <ScrollView style={styles.container}>
      <StatusBar style="light" />
      <Text style={styles.header} accessibilityRole="header">User Details & Preferences</Text>

      <TextInput
        style={styles.input}
        placeholder="Full Name (e.g., John Doe)"
        value={fullName}
        onChangeText={setFullName}
        accessibilityLabel="Full Name input"
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        accessibilityLabel="Email input"
      />

      <TouchableOpacity
        style={styles.datePickerButton}
        onPress={() => setShowDatePicker(true)}
        accessibilityLabel="Select Date of Birth"
        accessibilityHint="Opens a date picker to select your date of birth"
      >
        <Text style={styles.datePickerButtonText}>
          Date of Birth: {dateOfBirth.toLocaleDateString()}
        </Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={dateOfBirth}
          mode="date"
          display="spinner"
          onChange={handleDateChange}
          style={styles.datePicker}
        />
      )}

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={disabilityType}
          onValueChange={(itemValue) => setDisabilityType(itemValue)}
          style={styles.picker}
          accessibilityLabel="Select Disability Type"
        >
          <Picker.Item label="Select Disability Type" value="" />
          {disabilityTypes.map((type, index) => (
            <Picker.Item key={index} label={type} value={type} />
          ))}
        </Picker>
      </View>

      {disabilityType === 'Other' && (
        <TextInput
          style={styles.input}
          placeholder="Specify Other Disability"
          value={otherDisability}
          onChangeText={setOtherDisability}
          accessibilityLabel="Specify Other Disability input"
        />
      )}

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={city}
          onValueChange={(itemValue) => setCity(itemValue)}
          style={styles.picker}
          accessibilityLabel="Select City"
        >
          <Picker.Item label="Select City" value="" />
          {cities.map((cityName, index) => (
            <Picker.Item key={index} label={cityName} value={cityName} />
          ))}
        </Picker>
      </View>

      <TouchableOpacity
        style={styles.photoUploadButton}
        onPress={pickImage}
        accessibilityLabel="Upload Profile Photo"
        accessibilityHint="Opens image picker to select a profile photo"
      >
        <Text style={styles.photoUploadButtonText}>Upload Profile Photo (Optional)</Text>
      </TouchableOpacity>

      {profilePhoto && (
        <Image source={{ uri: profilePhoto }} style={styles.profilePhoto} accessibilityLabel="Selected profile photo" />
      )}

      <TextInput
        style={styles.input}
        placeholder="Emergency Contact Number"
        value={emergencyContact}
        onChangeText={setEmergencyContact}
        keyboardType="phone-pad"
        accessibilityLabel="Emergency Contact Number input"
      />

      <Text style={styles.privacyNote}>
        We respect your privacy. Your disability data helps us tailor support.{' '}
        <Text style={styles.policyLink} onPress={() => {/* Implement policy viewing logic */}}>
          [Read Policy]
        </Text>
      </Text>

      <Button
        onPress={handleFinishSetup}
        title="Finish Setup"
        disabled={!isFormValid}
        accessibilityLabel="Finish Setup button"
        accessibilityHint="Completes the user registration process"
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a365d',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#ffffff',
    color: '#1a365d',
    padding: 15,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 15,
  },
  datePickerButton: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  datePickerButtonText: {
    color: '#1a365d',
    fontSize: 16,
  },
  datePicker: {
    backgroundColor: '#ffffff',
    marginBottom: 15,
  },
  pickerContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    marginBottom: 15,
    overflow: 'hidden',
  },
  picker: {
    color: '#1a365d',
  },
  photoUploadButton: {
    backgroundColor: '#4a90e2',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    alignItems: 'center',
  },
  photoUploadButtonText: {
    color: '#ffffff',
    fontSize: 16,
  },
  profilePhoto: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 15,
  },
  privacyNote: {
    color: '#ffffff',
    fontSize: 14,
    marginBottom: 20,
    textAlign: 'center',
  },
  policyLink: {
    color: '#4a90e2',
    textDecorationLine: 'underline',
  },
});
