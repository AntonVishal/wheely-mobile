// import { Text, View } from "@/components/Themed";
// import { StyleSheet } from "react-native";
// import { IconButton } from "@/components/IconButtons";
// import { useExpoRouter } from "expo-router/build/global-state/router-store";

// export default function choose() {
//   const router = useExpoRouter();
//   const handleSubmit = (chosen:string) => {
//     if (chosen == "Passenger") {
//       router.push("/onboarding/passenger");
//     } else if (chosen == "Conductor") {
//       router.push("/onboarding/conductor");
//     }
//   };
//   return (
//     <View style={styles.container}>
//       <View style={styles.options_container}>
//         <Text style={styles.options_question}>Who Are You?</Text>
//         <View style={styles.options}>
//           <IconButton
//             title={"Passenger"}
//             onPress={() => {
//               handleSubmit("Passenger")
//             }}
//             iconSource={require("../../../assets/images/passenger-icon.png")}
//           />
//           <IconButton
//             title={"Conductor"}
//             onPress={() => {
//               handleSubmit("Conductor");
//             }}
//             iconSource={require("../../../assets/images/conductor-icon.png")}
//           />
//         </View>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "space-between",
//     paddingBottom: 16,
//     paddingTop: 10,
//     paddingHorizontal: 8,
//   },
//   options_container: {
//     width: "100%",
//   },
//   options_question: {
//     fontSize: 21,
//     fontWeight: "700",
//     marginBottom: 16,
//   },
//   options: {
//     flex: 1,
//     alignItems: "center",
//     gap: 16,
//   },
// });

// import { Text, View, Button } from "@/components/Themed";
// import { StyleSheet, TextInput } from "react-native";
// import { useState } from "react";
// import { useExpoRouter } from "expo-router/build/global-state/router-store";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// export default function passenger() {
//   const [number, setNumber] = useState("");
//   const re = new RegExp("^[0-9]{10}$");
//   const router = useExpoRouter();

//   const handleSubmit = async () => {
//     await AsyncStorage.setItem("userToken", "yes");
//     router.push("/onboarding/passenger/step2");
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.for_spacing}>
//         <Text style={styles.question_text}>Enter your number</Text>
//         <TextInput
//           autoFocus={true}
//           onChangeText={(text) => setNumber(text)}
//           placeholder={"e.g. 978XXXX012"}
//           keyboardType={"number-pad"}
//           style={styles.number_input}
//         />
//       </View>
//       <View>
//         <Button
//           title={"Continue"}
//           onPress={handleSubmit}
//           disabled={!re.test(number)}
//         />
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     paddingBottom: 16,
//     paddingTop: 10,
//     paddingHorizontal: 20,
//     flex: 1,
//     justifyContent: "space-between",
//   },
//   for_spacing: {
//     gap: 16
//   },
//   question_text: {
//     fontSize: 21,
//     fontWeight: 700,
//   },
//   number_input: {
//     borderStyle: "solid",
//     borderWidth: 1,
//     borderColor: "#34518d",
//     borderRadius: 16,
//     padding: 16,
//     height: 50,
//   },
// });
import React, { useState } from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity, Platform } from 'react-native';
import { Text, Button } from '@/components/Themed';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CountryPicker } from 'react-native-country-codes-picker';
import { StatusBar } from 'expo-status-bar';

export default function PhoneVerification() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [resendTimer, setResendTimer] = useState(30);
  const router = useRouter();

  const handleSendOTP = () => {
    // Implement OTP sending logic here
    setOtpSent(true);
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
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
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
            onPress={() => setShowCountryPicker(true)}
            accessibilityLabel="Select country code"
            accessibilityHint="Opens a list of country codes to choose from"
          >
            <Text style={styles.countryCodeText}>{countryCode}</Text>
          </TouchableOpacity>
          <TextInput
            style={styles.phoneInput}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            placeholder="Enter your phone number"
            keyboardType="phone-pad"
            accessibilityLabel="Phone number input"
            accessibilityHint="Enter your 10-digit phone number"
          />
        </View>

        {!otpSent ? (
          <Button
            onPress={handleSendOTP}
            title="Send OTP"
            accessibilityLabel="Send OTP button"
            accessibilityHint="Sends a one-time password to your phone number"
          />
        ) : (
          <>
            <View style={styles.otpContainer}>
              {otp.map((digit, index) => (
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
        show={showCountryPicker}
        lang="en" 
        pickerButtonOnPress={(item) => {
          setCountryCode(item.dial_code);
          setShowCountryPicker(false);
        }}
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
        onBackdropPress={() => setShowCountryPicker(false)}
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