import {StyleSheet} from 'react-native';
import { blue } from 'react-native-reanimated/lib/typescript/Colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F0E5',
  },

  scrollViewContent: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  profileContainer: {
    width: '90%',
    padding: 20,
    backgroundColor: '#EADBC8',
    borderRadius: 10,
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  infoContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  label: {
    fontFamily: 'Gantari-Regular',
    fontSize: 18,
    color: '#102C57',
  },
  value: {
    fontFamily: 'Gantari-Regular',
    fontSize: 18,
    color: '#102C57',
  },
  input: {
    fontFamily: 'Gantari-Regular',
    borderBottomWidth: 1,
    borderBottomColor: '#102C57',
    fontSize: 18,
    color: '#102C57',
    width: '60%',
    textAlign: 'right',
  },
  button: {
    width: 250,
    padding: 15,
    backgroundColor: '#102C57',
    borderRadius: 50,
    alignItems: 'center',
    marginTop: 10,
  },
  saveButton: {
    width: 150,
    padding: 15,
    backgroundColor: '#102C57',
    borderRadius: 50,
    alignItems: 'center',
    marginTop: 10,
    marginRight: 10,
  },
  cancelButton: {
    width: 150,
    padding: 15,
    backgroundColor: '#102C57',
    borderRadius: 50,
    alignItems: 'center',
    marginTop: 10,
    marginLeft: 10,
  },
  buttonText: {
    fontFamily: 'Gantari-Regular',
    fontSize: 18,
    color: '#F8F0E5',
  },
  logoutButton: {
    backgroundColor: '#E57373', // Red accent for logout
  },
  logInButton: {
    backgroundColor: '#0000FF', 
  },
  signUpButton: {
    backgroundColor: '#0000FF', 
  },
  optionsContainer: {
    width: '90%',
    marginTop: 20,
  },
  optionButton: {
    width: '100%',
    padding: 15,
    backgroundColor: '#102C57',
    borderRadius: 50,
    alignItems: 'center',
    marginBottom: 10,
  },
  optionText: {
    fontFamily: 'Gantari-Regular',
    fontSize: 18,
    color: '#F8F0E5',
  },

  title:{
    fontFamily: 'Gantari-Bold',
    fontSize: 28,
    textAlign: 'center',
    color: '#102C57',
    marginTop: 20,
  },

  subtitle:{
    fontFamily: 'Gantari-Bold',
    marginTop:10,
    marginBottom:30,
    color:'#000000',
    textAlign:'center',
  },

  box: {
    fontFamily: 'Gantari-Bold',
    width: 100,
    height: 50,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 4,
    borderRadius: 20,
  },

  selectedBox: {
    fontFamily: 'Gantari-Bold',
    backgroundColor: '#102C57',
  },

  text: {
    fontFamily: 'Gantari-Bold',
    color: '#000',
  },

  selectedText: {
    fontFamily: 'Gantari-Bold',
    color: '#F8F0E5',
 },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 3,
    marginHorizontal: 18,
    margin: 30,
  },

  comments:{
    fontFamily: 'Gantari-Regular',
    marginTop:20,
    color:'#000000',
    textAlign: 'left',
    marginLeft:20,
  },

  inputs:{
    fontFamily: 'Gantari-Regular',
    height: 150,
    margin: 14,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },

  subbutton: {
    backgroundColor: '#102C57',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
    alignItems: 'center',
    alignSelf: 'center',
    width: 200,
  },

  logo:{
    width: 180,
    height: 180,
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 10,
  },

  cafeImage:{
    width: 300,
    height: 180,
    alignSelf: 'center',
    borderRadius: 20,
  },

  description:{
    fontFamily: 'Gantari-Regular',
    textAlign: 'center',
    justifyContent: 'center',
    padding: 20,
    fontSize: 16,
  },

});
