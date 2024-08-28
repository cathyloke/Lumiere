import React from 'react';
import { View, Text, Image, StyleSheet, TextInput, Button, TouchableOpacity } from 'react-native';
import logo from '../img/lumiere_logo.png';
import { useNavigation } from '@react-navigation/native';

const LogInScreen = () => {

    return (
        <View style={styles.container}>
            <Image
                source={logo}
                style={styles.logo} 
            />
            <View>
                <Text style={styles.title}>{"\n"}Phone Number</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your phone number"
                    keyboardType="default"
                />
            </View>

            <View>
                <Text style={styles.title}>{"\n"}{"\n"}Password</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your password"
                    keyboardType="default"
                />
            </View>

            <View style={styles.button}>
                <Button
                    title="Log In"
                    color="#102C57"
                />
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                <Text style={styles.last}>
                    Don't have an account? Sign Up
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,                  // Takes up the full height of the screen
        justifyContent: 'center', // Centers content vertically
        alignItems: 'center',     // Centers content horizontally
    },
    logo: {
        width: 170, 
        height: 170,
    },
    input: {
        fontFamily: 'Gantari-Bold',
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 15,
        width: 300,
        alignSelf: 'center', // Centers the input boxes horizontally
    },
    title: {
        fontFamily: 'Gantari-Bold',
        textAlign: "left",
        marginLeft: 17,
    },
    button: {
        backgroundColor: '#102C57',  
        paddingVertical: 10,
        paddingHorizontal: 30,  
        borderRadius: 20, 
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 30,
        width: 250,
    },
    last:{
        marginTop: 10,
        textAlign:'center'
    }
});

export default LogInScreen;
