import React, { useState } from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity, Platform } from 'react-native';
import { Text, Button } from '@/components/Themed';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CountryPicker } from 'react-native-country-codes-picker';
import { StatusBar } from 'expo-status-bar';

interface VerificationState {
  phoneNumber: string;
  countryCode: string;
  showCountryPicker: boolean;
  otpSent: boolean;
  otp: string[];
}

export default function PhoneVerification() {
  const [state, setState] = useState<VerificationState>({
    phoneNumber: '',
    countryCode: '+91',
    showCountryPicker: false,
    otpSent: false,
    otp: ['', '', '', '', '', '']
  });
  const [resendTimer, setResendTimer] = useState(30);
  const router = useRouter();

  const handleSendOTP = () => {
    // Implement OTP sending logic here
    setState(prev => ({ ...prev, otpSent: true }));
    startResendTimer();
  };

  const handleVerifyOTP = async () => {
    // Implement OTP verification logic here
    await AsyncStorage.setItem('userToken', 'yes');
    router.push('/onboarding/step2');
  };

  const startResendTimer = () => {
    setResendTimer(30);
    const timer = setInterval(() => {
      setResendTimer((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  };

  const handleOtpChange = (index: number, value: string) => {
    const newOtp = [...state.otp];
    newOtp[index] = value;
    setState(prev => ({ ...prev, otp: newOtp }));
  };

  const handleCountryCodeSelect = (dialCode: string) => {
    setState(prev => ({
      ...prev,
      countryCode: dialCode,
      showCountryPicker: false
    }));
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.content}>
        <Text style={styles.header} accessibilityRole="header">Welcome to Wheelie</Text>
        <Text style={styles.subheader}>Empowering disabled citizens to navigate local buses</Text>

        <View style={styles.phoneInputContainer}>
          <TouchableOpacity
            style={styles.countryCodePicker}
            onPress={() => setState(prev => ({ ...prev, showCountryPicker: true }))}
            accessibilityLabel="Select country code"
            accessibilityHint="Opens a list of country codes to choose from"
          >
            <Text style={styles.countryCodeText}>{state.countryCode}</Text>
          </TouchableOpacity>
          <TextInput
            style={styles.phoneInput}
            value={state.phoneNumber}
            onChangeText={(value) => setState(prev => ({ ...prev, phoneNumber: value }))}
            placeholder="Enter your phone number"
            keyboardType="phone-pad"
            accessibilityLabel="Phone number input"
            accessibilityHint="Enter your 10-digit phone number"
          />
        </View>

        {!state.otpSent ? (
          <Button
            onPress={handleSendOTP}
            title="Send OTP"
            accessibilityLabel="Send OTP button"
            accessibilityHint="Sends a one-time password to your phone number"
          />
        ) : (
          <>
            <View style={styles.otpContainer}>
              {state.otp.map((digit, index) => (
                <TextInput
                  key={index}
                  style={styles.otpInput}
                  value={digit}
                  onChangeText={(value) => handleOtpChange(index, value)}
                  keyboardType="number-pad"
                  maxLength={1}
                  accessibilityLabel={`OTP digit ${index + 1}`}
                />
              ))}
            </View>
            <Button
              onPress={handleVerifyOTP}
              title="Verify OTP"
              accessibilityLabel="Verify OTP button"
              accessibilityHint="Verifies the entered one-time password"
            />
            <TouchableOpacity
              onPress={handleSendOTP}
              disabled={resendTimer > 0}
              accessibilityLabel={`Resend OTP button. ${resendTimer > 0 ? `Available in ${resendTimer} seconds` : 'Available now'}`}
              accessibilityHint="Resends the one-time password to your phone number"
            >
              <Text style={[styles.resendText, resendTimer > 0 && styles.resendTextDisabled]}>
                {resendTimer > 0 ? `Resend in ${resendTimer}s` : 'Resend OTP'}
              </Text>
            </TouchableOpacity>
          </>
        )}
      </View>

      <CountryPicker
        show={state.showCountryPicker}
        lang="en" 
        pickerButtonOnPress={(item) => handleCountryCodeSelect(item.dial_code)}
        style={{
          modal: {
            height: 500,
            backgroundColor: styles.container.backgroundColor,
          },
          textInput: {
            color: styles.phoneInput.color,
            backgroundColor: styles.phoneInput.backgroundColor,
          },
          countryButtonStyles: {
            backgroundColor: styles.container.backgroundColor,
          },
          countryName: {
            color: styles.phoneInput.color,
          },
          dialCode: {
            color: styles.phoneInput.color,
          },
        }}
        onBackdropPress={() => setState(prev => ({ ...prev, showCountryPicker: false }))}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a365d', // Dark blue background
    padding: 20,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
    textAlign: 'center',
  },
  subheader: {
    fontSize: 16,
    color: '#ffffff',
    marginBottom: 30,
    textAlign: 'center',
  },
  phoneInputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    width: '100%',
  },
  countryCodePicker: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 80,
  },
  countryCodeText: {
    fontSize: 16,
    color: '#1a365d',
  },
  phoneInput: {
    flex: 1,
    backgroundColor: '#ffffff',
    color: '#1a365d',
    padding: 15,
    fontSize: 16,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    width: '100%',
  },
  otpInput: {
    width: 50,
    height: 50,
    borderWidth: 2,
    borderColor: '#ffffff',
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 20,
    color: '#ffffff',
  },
  resendText: {
    color: '#ffffff',
    marginTop: 15,
    fontSize: 16,
  },
  resendTextDisabled: {
    opacity: 0.5,
  },
});