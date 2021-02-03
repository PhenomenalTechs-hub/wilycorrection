import React from 'react'
import {View, Text, TouchableOpacity, TextInput,KeyboardAvoidingView, Image, StyleSheet, Alert} from 'react-native'
import * as firebase  from 'firebase'

export default class LoginScreen extends React.Component {
    constructor(){
        super()
        this.state={
            emailId:"",
            password:""
        }
    }
    login = async(emailId, password) => {
        console.log(emailId)
        if(emailId && password){
            console.log("Hello")
            try{
                console.log("I am try")
                const response = await firebase.auth().signInWithEmailAndPassword(emailId,password)
                console.log(response)
                if(response){
                    this.props.navigation.navigate('Transaction')
                }
            }
            catch(error){
                console.log(error)
                switch(error.code){
                    case 'auth/user-not-found':Alert.alert("User doesn't exist")
                    console.log("User doesn't Exist")
                    break;
                    case 'auth/invalid-email':Alert.alert("Icorrect Email or Password")
                    console.log("Incorrect Email and Password")
                    break;
                }
            }
        }
        else{
            Alert.alert("Enter Email & Password")
        }
    }
    render(){
    return (
        <KeyboardAvoidingView style={{alignItems:"center", marginTop:20}}>
            <View>
                <Image style={{width:200, height:200}} source={require('../assets/booklogo.jpg')}/>
                <Text style={{textAlign:"center", fontSize:30}}>
                    Wily
                </Text>
            </View>
            <View>
                <TextInput keyboardType="email-address" onChangeText={(text)=>{
                    this.setState({
                        emailId:text
                    })
                }} style={styles.loginBox} placeholder="abc@example.com" />
                <TextInput secureTextEntry={true} onChangeText={(text)=>{
                    this.setState({
                        password:text
                    })
                }} style={styles.loginBox} placeholder="Enter the Password" />
            </View>
            <View>
                <TouchableOpacity style={styles.submitButton} onPress={()=>{
                    this.login(this.state.emailId,this.state.password)
                }}>
                    <Text style={{textAlign:"center", marginTop:10}}>Login</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
    }
}
const styles = StyleSheet.create({
    loginBox:{
        marginTop:10,
        padding:20,
        width:300,
        height:40,
        borderWidth:1.5,
    },
    submitButton:{
        height:30, 
        width:90,
        borderRadius:7,
        borderWidth:1,
        backgroundColor:"aqua"
    }
})
