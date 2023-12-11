import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';

const Login = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await fetch('https://api.example.com/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                // Login successful, navigate to another page
                navigation.navigate('Home');
            } else {
                Alert.alert('Login Failed', 'Invalid username or password');
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'An error occurred while logging in');
        }
    };

    const handleCreateAccount = () => {
        navigation.navigate('CreateAccount');
    };

    return (
        <View>
            <TextInput
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <Button title="Login" onPress={handleLogin} />
            <Button title="Create Account" onPress={handleCreateAccount} />
        </View>
    );
};

export default Login;
